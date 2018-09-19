import api from "./api";

export default {
  getAll() {
    return api.get("/calendars");
  },
  getCalendar(id, filter = {}) {
    return api.get(`/calendars/${id}`, {
      params: filter
    });
  },
  createReservation(id, reservationData) {
    return api.post(`/calendars/${id}/appointments`, reservationData);
  }
};
