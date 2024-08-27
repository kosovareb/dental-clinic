const AppointmentService = require("./AppointmentService");
const DoctorService = require("./DoctorService");
const UserService = require("./UserService");

class Service {
  async getAllData() {
    const users = await UserService.getAllUsers();
    const doctors = await DoctorService.getAllDoctors();
    const appointments = await AppointmentService.getAllAppointments();

    return {
      users,
      doctors,
      appointments,
    };
  }
}

module.exports = new Service();
