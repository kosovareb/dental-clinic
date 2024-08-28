const { check } = require('express-validator');

const createDoctorValidator = () => {
  return [
    check('fullname').trim().not().isEmpty().withMessage('Please provide a fullname'),
    check('specialized').trim().not().isEmpty().withMessage('Please provide a specialization'),
    check('university').trim().not().isEmpty().withMessage('Please provide a university name'),
    check('imgSrc').trim().not().isEmpty().withMessage('Please provide an image URL'),
  ];
};

const updateDoctorValidator = () => {
  return [
    check('id').trim().not().isEmpty().withMessage('Please provide a doctor Id'),
    check('fullname').trim().not().isEmpty().withMessage('Please provide a fullname'),
    check('specialized').trim().not().isEmpty().withMessage('Please provide a specialization'),
    check('university').trim().not().isEmpty().withMessage('Please provide a university name'),
    check('imgSrc').trim().not().isEmpty().withMessage('Please provide an image URL'),
  ];
};

module.exports = { createDoctorValidator, updateDoctorValidator };
