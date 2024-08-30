const DoctorService = require('../services/DoctorService');

class DoctorController {
  async getAllDoctors(req, res) {
    try {
      const doctors = await DoctorService.getAllDoctors();
      res.json(doctors);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error - GET ALL Doctors controller');
    }
  }

  async getDoctorById(req, res) {
    try {
      const id = req.params.id;
      const doctor = await DoctorService.getDoctorById(id);
      res.json(doctor);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error - GET Doctor BY ID controller');
    }
  }

  async createDoctor(req, res) {
    try {
      const result = await DoctorService.createDoctor(req.body);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error - CREATE Doctor controller');
    }
  }

  async updateDoctor(req, res) {
    try {
      const result = await DoctorService.updateDoctor(req.body);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error - UPDATE Doctor controller');
    }
  }

  async deleteDoctor(req, res) {
    try {
      const id = req.params.id;
      const result = await DoctorService.deleteDoctor(id);
      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).send('Internal Server Error - DELETE Doctor controller');
    }
  }
}

module.exports = new DoctorController();
