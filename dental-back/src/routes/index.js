const express = require('express');
const router = express.Router();
const Controller = require('../controllers/Controller');

const validate = require('../validators/validator');
const { createUserValidator, updateUserValidator } = require('../validators/UserValidator');
const { createDoctorValidator, updateDoctorValidator } = require('../validators/DoctorValidator');
const { createAppointmentValidator, updateAppointmentValidator } = require('../validators/AppointmentValidator');
const { createServiceValidator, updateServiceValidator } = require('../validators/ServiceValidator');

router.get('/allData', Controller.getAllData);

//Middlewares
const { checkAuth } = require('../middlewares/checkAuth');
const checkAdmin = require('../middlewares/checkAdmin');
const UserController = require('../controllers/UserController');
const DoctorController = require('../controllers/DoctorController');
const AppointmentController = require('../controllers/AppointmentController');
const ServiceController = require('../controllers/ourServicesController');
console.log(checkAuth)
console.log(checkAdmin)

// User routes
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getUserById);
router.post('/users/create', createUserValidator(), validate, UserController.createUser);
router.patch('/users/update/:id', [checkAuth, checkAdmin], updateUserValidator(), validate, UserController.updateUser);
router.delete('/users/delete/:id', [checkAuth, checkAdmin], UserController.deleteUser);
router.post('/login', UserController.loginUser);

// Doctor routes
router.get('/doctor', DoctorController.getAllDoctors);
router.get('/doctor/:id', DoctorController.getDoctorById);
router.post('/doctor/create', createDoctorValidator(), DoctorController.createDoctor);
router.patch('/doctor/update/:id', updateDoctorValidator(), DoctorController.updateDoctor);
router.delete('/doctor/delete/:id', DoctorController.deleteDoctor);

// Appointment routes
// router.get('/appointment', AppointmentController.getAllAppointments);
// router.get('/appointment/:id', AppointmentController.getAppointmentById);
// router.post('/appointment/create', createAppointmentValidator(), validate, AppointmentController.createAppointment);
// router.patch('/appointment/update/:id', [checkAuth, checkAdmin], updateAppointmentValidator(), validate, AppointmentController.updateAppointment);
// router.delete('/appointment/delete/:id', [checkAuth, checkAdmin], AppointmentController.deleteAppointment);


router.get('/appointment', AppointmentController.getAllAppointments);
router.get('/appointment/:id', AppointmentController.getAppointmentById);
router.post('/appointment/create', checkAuth, AppointmentController.createAppointment);
router.patch('/appointment/update/:id', [checkAuth, checkAdmin], updateAppointmentValidator(), validate, AppointmentController.updateAppointment);
router.delete('/appointment/delete/:id', [checkAuth, checkAdmin], AppointmentController.deleteAppointment);


// Service routes
router.get('/services', ServiceController.getAllServices);
router.get('/services/:id', ServiceController.getServiceById);
router.post('/services/create', ServiceController.createService);
router.patch('/services/update/:id', ServiceController.updateService);
router.delete('/services/delete/:id', [checkAuth, checkAdmin], ServiceController.deleteService);

module.exports = router;
