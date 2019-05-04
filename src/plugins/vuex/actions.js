import Calendar from "@/models/calendar";
import Slot from "@/models/slot";
import CalendarService from "@/services/calendar-service";
import utils from "@/utils";
import { store } from "./index";
import {
  GET_ALL_CALENDARS,
  GET_CALENDAR,
  CREATE_APPOINTMENT
} from "./action-types";
import {
  RECEIVE_CALENDARS,
  ENABLE_MAINTENANCEMODE,
  ADD_WARNING,
  ADD_ERROR
} from "./mutation-types";

export default {
  async [GET_ALL_CALENDARS]({ commit }) {
    const response = await handleErrors(CalendarService.getAll)();
    // there was an error that has already been handled
    if (!response) return;
    let calendars = [];
    for (let item of response.data.items) {
      calendars.push(mapCalendar(item));
    }

    commit(RECEIVE_CALENDARS, calendars);
    return calendars;
  },
  async [GET_CALENDAR](_, { calendar, filter }) {
    const response = await handleErrors(CalendarService.getCalendar)(
      calendar,
      filter
    );
    // there was an error that has already been handled
    if (!response) return;
    return mapCalendar(response.data);
  },
  async [CREATE_APPOINTMENT](_, { slot }) {
    return await handleErrors(CalendarService.createReservation)(slot);
  }
};

const handleErrors = fn => async (...params) => {
  try {
    return await fn(...params);
  } catch (error) {
    if (error.response) {
      // the request was made and the server responded with an error status code
      switch (error.response.status) {
        case 503:
          store.commit(ENABLE_MAINTENANCEMODE);
          store.commit(ADD_WARNING, {
            message:
              "Es werden zurzeit Wartungsarbeiten durchgeführt bzw. ist das Ärztenetzwerk nicht erreichbar. Daher ist eine Online-Terminreservierung momentan nicht möglich, bitte versuchen Sie es später erneut."
          });
          break;
        case 500:
          store.commit(ADD_ERROR, {
            message:
              "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut."
          });
          break;
        case 429:
          store.commit(ADD_WARNING, {
            message:
              "Um Missbrauch zu verhindern gibt es eine Limitierung der Anfragen an das System. Dieses Limit wurde nun überschritten, bitte versuchen Sie es später erneut."
          });
          break;
        default:
          throw error;
      }
      return;
    }

    // the request was made but no response was received (error.request != null)
    // or something happened before the request was made
    store.commit(ADD_ERROR, {
      message:
        "Ein unerwarteter Fehler ist aufgetreten. Bitte versuchen Sie es später erneut."
    });
  }
};

const mapCalendar = data => {
  const calendar = new Calendar(
    data.id,
    data.title,
    data.subtitle,
    data.description,
    data.isOnlyInformative
  );

  if (!data.slots) return calendar;

  const slots = [];
  for (let slot of data.slots) {
    slots.push(new Slot(utils.parseISOLocal(slot), calendar));
  }
  calendar.slots = slots;

  return calendar;
};
