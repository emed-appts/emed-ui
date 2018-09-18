import CalendarService from "@/services/calendar-service";
import { GET_ALL_CALENDARS } from "./action-types";
import { RECEIVE_CALENDARS } from "./mutation-types";

export default {
  [GET_ALL_CALENDARS]({ commit }) {
    return CalendarService.getAll().then(response => {
      commit(RECEIVE_CALENDARS, response.data);
    });
  }
};
