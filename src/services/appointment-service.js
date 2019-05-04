import APIClient from "./api";

const AppointmentService = {
  async getAll(insuranceNumber) {
    return await APIClient.get("/appointments", {
      params: { insuranceNumber }
    });
  },
  async deleteAppointment(cancellationData) {
    return await APIClient.post("/appointments", cancellationData);
  }
};

export default AppointmentService;
