const Doctor = require('../models/DoctorModel');

class DoctorService {
  async getAllDoctors() {
    return await Doctor.findAll();
  }

  async getDoctorById(id) {
    return await Doctor.findByPk(id);
  }

  async createDoctor(doctorData) {
    try {
      const newDoctor = await Doctor.create(doctorData);
      return newDoctor;
    } catch (error) {
      console.error('Error creating doctor:', error);
      throw error;
    }
  }

  async updateDoctor(updateDoctorData) {
    try {
      const doctor = await Doctor.findByPk(updateDoctorData.id);
      if (!doctor) {
        return 'Doctor not found';
      }

      await doctor.update(updateDoctorData);
      return doctor;
    } catch (error) {
      console.error('Error updating doctor:', error);
      throw error;
    }
  }

  async deleteDoctor(id) {
    try {
      const doctor = await Doctor.findByPk(id);
      if (!doctor) {
        return 'Doctor not found';
      }

      await doctor.destroy();
      return 'Doctor deleted successfully!';
    } catch (error) {
      console.error('Error deleting doctor:', error);
      throw error;
    }
  }
}

module.exports = new DoctorService();
