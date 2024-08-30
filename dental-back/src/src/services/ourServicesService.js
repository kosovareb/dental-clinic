const Service = require("../models/ServiceModel");

class OurServicesService {
  async getAllServices() {
    return await Service.findAll();
  }

  async getServiceById(id) {
    return await Service.findByPk(id);
  }

  async createService(serviceData) {
    try {
      const newService = await Service.create(serviceData);
      return newService;
    } catch (error) {
      console.error("Error creating service:", error);
      throw error;
    }
  }

  async updateService(serviceID, updatedData) {
    try {
      const service = await Service.findByPk(serviceID);
      if (!service) {
        return "Service not found";
      }

      await service.update(updatedData);
      return service;
    } catch (error) {
      console.error("Error updating service:", error);
      throw error;
    }
  }

  async deleteService(id) {
    try {
      const service = await Service.findByPk(id);
      if (!service) {
        return "Service not found";
      }

      await service.destroy();
      return "Service deleted successfully!";
    } catch (error) {
      console.error("Error deleting service:", error);
      throw error;
    }
  }
}

module.exports = new OurServicesService();
