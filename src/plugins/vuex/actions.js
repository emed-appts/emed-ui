import Calendar from "@/models/calendar";
import Slot from "@/models/slot";
import CalendarService from "@/services/calendar-service";
import utils from "@/utils";
import {
  GET_ALL_CALENDARS,
  GET_CALENDAR,
  CREATE_APPOINTMENT
} from "./action-types";
import { RECEIVE_CALENDARS } from "./mutation-types";

export default {
  async [GET_ALL_CALENDARS]({ commit }) {
    const response = await CalendarService.getAll();
    let calendars = [];
    for (let item of response.data.items) {
      calendars.push(mapCalendar(item));
    }

    commit(RECEIVE_CALENDARS, calendars);
    return calendars;
  },
  async [GET_CALENDAR](_, { calendar, filter }) {
    const response = await CalendarService.getCalendar(calendar, filter);
    return mapCalendar(response.data);
  },
  async [CREATE_APPOINTMENT](_, { slot }) {
    return await CalendarService.createReservation(slot);
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
