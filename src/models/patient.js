export default class Patient {
  slots = undefined;

  constructor(
    firstName,
    lastName,
    birthday,
    insuranceNumber,
    email,
    phoneNumber,
    acceptsPrivacyPolicy
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthday = birthday;
    this.insuranceNumber = insuranceNumber;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.acceptsPrivacyPolicy = acceptsPrivacyPolicy;
  }
}
