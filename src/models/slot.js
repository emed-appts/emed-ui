export default class Slot {
  constructor(time, calendar) {
    this.time = time;
    this.calendar = calendar;
  }

  equals(slot) {
    return this.time.getTime() === slot.time.getTime();
  }

  compare(slot) {
    if (this.time > slot.time) return 1;
    if (this.time < slot.time) return -1;
    return 0;
  }
}
