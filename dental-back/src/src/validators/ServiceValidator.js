const { check } = require('express-validator');

const createServiceValidator = () => {
  return [
    check('icon').trim().not().isEmpty().withMessage('Please provide an icon'),
    check('title').trim().not().isEmpty().withMessage('Please provide a title'),
    check('description').trim().not().isEmpty().withMessage('Please provide a description'),
  ];
};

const updateServiceValidator = () => {
  return [
    // check('id').trim().not().isEmpty().withMessage('Please provide a service Id'),
    // check('title').trim().not().isEmpty().withMessage('Please provide a title'),
    // check('description').trim().not().isEmpty().withMessage('Please provide a description'),
    // // check('icon').optional().trim().not().isEmpty().withMessage('Please provide an icon'),
    // check('icon').optional()
  ];
};


module.exports = { createServiceValidator, updateServiceValidator };
