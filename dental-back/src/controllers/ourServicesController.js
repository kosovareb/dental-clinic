const OurServicesService = require("../services/ourServicesService");
const multer = require("multer");
const path = require("path");
const express = require("express");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single("icon");

class OurServicesController {
  async getAllServices(req, res) {
    try {
      const services = await OurServicesService.getAllServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res
        .status(500)
        .json({
          message: "Internal Server Error - GET ALL Services controller",
        });
    }
  }

  async getServiceById(req, res) {
    try {
      const id = req.params.id;
      const service = await OurServicesService.getServiceById(id);
      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }
      res.json(service);
    } catch (error) {
      console.error("Error fetching service:", error);
      res
        .status(500)
        .json({
          message: "Internal Server Error - GET Service BY ID controller",
        });
    }
  }

  async createService(req, res) {
    upload(req, res, async (err) => {
      if (err) {
        console.error("File upload error:", err);
        return res
          .status(400)
          .json({ message: "Error uploading file", error: err });
      }

      try {
        if (!req.file) {
          return res.status(400).json({ message: "Please provide an icon" });
        }

        const { title, description } = req.body;

        if (!title) {
          return res.status(400).json({ message: "Please provide a title" });
        }

        if (!description) {
          return res
            .status(400)
            .json({ message: "Please provide a description" });
        }

        const iconUrl = `${req.protocol}://${req.get("host")}/uploads/${
          req.file.filename
        }`;

        const newService = await OurServicesService.createService({
          title,
          description,
          icon: iconUrl,
        });

        res.status(201).json(newService);
      } catch (error) {
        console.error("Service creation error:", error);
        res
          .status(500)
          .json({
            message: "Internal Server Error - CREATE Service controller",
          });
      }
    });
  }

  async updateService(req, res) {
    upload(req, res, async (err) => {
      if (err) {
        console.error("File upload error:", err);
        return res.status(400).json({ message: "Error uploading file", error: err });
      }

      // Check for validation errors
      // const errors = validationResult(req);
      // if (!errors.isEmpty()) {
      //   return res.status(400).json({ errors: errors.array() });
      // }

      try {
        const id = req.params.id;
        const { title, description } = req.body;
        let iconUrl;

        if (req.file) {
          iconUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        }

        // Fetch the existing service to preserve the existing icon if not provided
        const existingService = await OurServicesService.getServiceById(id);
        if (!existingService) {
          return res.status(404).json({ message: "Service not found" });
        }

        const updatedServiceData = {
          title,
          description,
          icon: iconUrl || existingService.icon // Preserve existing icon if no new icon is uploaded
        };

        const updatedService = await OurServicesService.updateService(id, updatedServiceData);

        res.json(updatedService);
      } catch (error) {
        console.error("Service update error hejhej:", error);
        res.status(500).json({ message: "Internal Server Error - UPDATE Service controller" });
      }
    });
  }

  async deleteService(req, res) {
    try {
      const id = req.params.id;
      const service = await OurServicesService.getServiceById(id);

      if (!service) {
        return res.status(404).json({ message: "Service not found" });
      }

      const iconPath = path.join(
        __dirname,
        "../uploads",
        path.basename(service.icon)
      );
      await OurServicesService.deleteService(id);

      fs.unlink(iconPath, (err) => {
        if (err) {
          console.error("Error deleting icon file:", err);
        }
      });

      res.json({ message: "Service deleted successfully" });
    } catch (error) {
      console.error("Service deletion error:", error);
      res
        .status(500)
        .json({ message: "Internal Server Error - DELETE Service controller" });
    }
  }
}

module.exports = new OurServicesController();
