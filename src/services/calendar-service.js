import APIClient from "./api";

const CalendarService = {
  async getAll() {
    return await APIClient.get("/calendars");
  },
  async getCalendar(id, filter = {}) {
    return await APIClient.get(`/calendars/${id}`, {
      params: filter
    });
  },
  async createReservation(id, reservationData) {
    return await APIClient.post(
      `/calendars/${id}/appointments`,
      reservationData
    );
  }
};

export default CalendarService;
