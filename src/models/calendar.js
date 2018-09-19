export default class Calendar {
  slots = undefined;

  constructor(id, title, subtitle, description, isOnlyInformative) {
    this.id = id;
    this.title = title;
    this.subtitle = subtitle;
    this.description = description;
    this.isOnlyInformative = isOnlyInformative;
  }
}
