import utils from "@/utils";

export default class Appointment {
  constructor(time, calendar) {
    this.time = time;
    this.calendar = calendar;
  }

  compare(appointment) {
    return utils.dateCompareFn(this.time, appointment.time);
  }
}
