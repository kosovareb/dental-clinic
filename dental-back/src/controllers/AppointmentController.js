const AppointmentService = require('../services/AppointmentService');

class AppointmentController {
  async getAllAppointments(req, res) {
    try {
      const appointments = await AppointmentService.getAllAppointments();
      res.json(appointments);
    } catch (error) {
      console.error('Error getting all appointments:', error.message);
      res.status(500).json({ error: 'Error getting all appointments' });
    }
  }

  async getAppointmentById(req, res) {
    try {
      const id = req.params.id;
      const appointment = await AppointmentService.getAppointmentById(id);
      res.json(appointment);
    } catch (error) {
      console.error('Error getting appointment by ID:', error.message);
      res.status(500).json({ error: 'Error getting appointment by ID' });
    }
  }

  async createAppointment(req, res) {
    try {
        const userId = req.user.id;  // Get userId from req.user
        console.log("User ID from req.user:", userId);  // Add this line to log userId
        const result = await AppointmentService.createAppointment(req.body, userId);
        res.json(result);
    } catch (error) {
        console.error('Error creating appointment:', error.message);
        res.status(500).json({ error: 'Error creating appointment' });
    }
}

  async updateAppointment(req, res) {
    try {
      const result = await AppointmentService.updateAppointment(req.body);
      res.json(result);
    } catch (error) {
      console.error('Error updating appointment:', error.message);
      res.status(500).json({ error: 'Error updating appointment' });
    }
  }
  
  async deleteAppointment(req, res) {
    try {
      const id = req.params.id;
      const result = await AppointmentService.deleteAppointment(id);
      res.json(result);
    } catch (error) {
      console.error('Error deleting appointment:', error.message);
      res.status(500).json({ error: 'Error deleting appointment' });
    }
  }
}

module.exports = new AppointmentController();
