import api from "./api";

export default {
  getAll(insuranceNumber) {
    return api.get(`/appointments?insuranceNumber=${insuranceNumber}`);
  },
  deleteAppointment(cancellationData) {
    return api.post("/appointments", cancellationData);
  }
};
