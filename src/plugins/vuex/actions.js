import Appointment from "@/models/appointment";
import Calendar from "@/models/calendar";
import CalendarService from "@/services/calendar-service";
import utils from "@/utils";
import { GET_ALL_CALENDARS, GET_CALENDAR } from "./action-types";
import { RECEIVE_CALENDARS } from "./mutation-types";

export default {
  [GET_ALL_CALENDARS]({ commit }) {
    return CalendarService.getAll().then(response => {
      const calendars = [];
      for (let item of response.data.items) {
        calendars.push(mapCalendar(item));
      }

      commit(RECEIVE_CALENDARS, calendars);
      return calendars;
    });
  },
  [GET_CALENDAR](_, { calendar, filter }) {
    return CalendarService.getCalendar(calendar, filter).then(response => {
      return mapCalendar(response.data);
    });
  }
};

function mapCalendar(data) {
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
    slots.push(new Appointment(utils.parseISOLocal(slot), calendar));
  }
  calendar.slots = slots;

  return calendar;
}
