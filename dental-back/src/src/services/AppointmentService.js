const Appointment = require('../models/AppointmentModel');
const Doctor = require('../models/DoctorModel');

class AppointmentService {
  async getAllAppointments() {
    try {
      const appointments = await Appointment.findAll();
      return appointments;
    } catch (error) {
      console.error('Error fetching all appointments:', error);
      throw new Error('Error fetching all appointments');
    }
  }

  async getAppointmentById(id) {
    try {
      const appointment = await Appointment.findByPk(id);
      return appointment;
    } catch (error) {
      console.error('Error fetching appointment by ID:', error);
      throw new Error('Error fetching appointment by ID');
    }
  }


  async createAppointment(appointmentData, userId) {
    const doctor = await Doctor.findByPk(appointmentData.doctorId);
    if (!doctor) {
        throw new Error('Doctor not found');
    }

    const existingAppointments = await Appointment.count({
        where: {
            doctorId: appointmentData.doctorId,
            date: appointmentData.date,
        },
    });

    if (existingAppointments >= 12) {
        throw new Error('Maximum appointments for this doctor on this date reached');
    }

    const newAppointmentData = { ...appointmentData, userId };
    return await Appointment.create(newAppointmentData);
}


  async updateAppointment(updateAppointmentData) {
    try {
      const appointment = await Appointment.findByPk(updateAppointmentData.id);
      if (!appointment) {
        throw new Error('Appointment not found');
      }

      await appointment.update(updateAppointmentData);

      return appointment;
    } catch (error) {
      console.error('Error updating appointment:', error);
      throw new Error('Error updating appointment');
    }
  }
  
  async deleteAppointment(id) {
    try {
      const appointment = await Appointment.findByPk(id);
      if (!appointment) {
        throw new Error('Appointment not found');
      }

      await appointment.destroy();
      return 'Appointment deleted successfully!';
    } catch (error) {
      console.error('Error deleting appointment:', error);
      throw new Error('Error deleting appointment');
    }
  }
}

module.exports = new AppointmentService();
