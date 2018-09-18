import api from "./api";

export default {
  getAll() {
    return api.get("/calendars");
  },
  getCalendar(id) {
    return api.get(`/calendars/${id}`);
  },
  createReservation(id, reservationData) {
    return api.post(`/calendars/${id}/appointments`, reservationData);
  }
};
