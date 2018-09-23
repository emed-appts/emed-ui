import utils from "@/utils";

export default class Slot {
  constructor(time, calendar) {
    this.time = time;
    this.calendar = calendar;
  }

  compare(slot) {
    return utils.dateCompareFn(this.time, slot.time);
  }
}
