const expressValidator = require('express-validator')
const { check } = expressValidator;

const createUserValidator = () => {
    return [
        check('name')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Ju lutem jepni një emër'),
        check('name')
            .isLength({ max: 15 })
            .withMessage('Emri duhet të jetë maksimumi 15 karaktere'),

        check('surname')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Ju lutem jepni një mbiemër'),
        check('surname')
            .isLength({ max: 15 })
            .withMessage('Mbiemri duhet të jetë maksimumi 15 karaktere'),

        check('email')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Ju lutem jepni një email')
            .isEmail()
            .withMessage('Ju lutem jepni një adresë emaili të vlefshme')
            .isLength({ max: 255 })
            .withMessage('Emaili duhet të jetë maksimumi 255 karaktere'),

        check('password')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Ju lutem jepni një fjalëkalim')
            .isLength({ max: 255, min: 8 })
            .withMessage('Fjalëkalimi duhet të jetë midis 8 dhe 255 karaktere'),

        // check('role')
        //     .trim()
        //     .not()
        //     .isEmpty()
        //     .withMessage('Ju lutem jepni një rol')
        //     .isIn(['user', 'admin'])
        //     .withMessage('Roli duhet të jetë "user" ose "admin"'),
    ]
}

const updateUserValidator = () => {
    return [
        check('name')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Ju lutem jepni një emër')
            .isLength({ max: 15 })
            .withMessage('Emri duhet të jetë maksimumi 15 karaktere'),

        check('surname')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Ju lutem jepni një mbiemër')
            .isLength({ max: 15 })
            .withMessage('Mbiemri duhet të jetë maksimumi 15 karaktere'),

        check('email')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Ju lutem jepni një email')
            .isEmail()
            .withMessage('Ju lutem jepni një adresë emaili të vlefshme')
            .isLength({ max: 255 })
            .withMessage('Emaili duhet të jetë maksimumi 255 karaktere'),

        // check('role')
        //     .trim()
        //     .not()
        //     .isEmpty()
        //     .withMessage('Ju lutem jepni një rol')
        //     .isIn(['user', 'admin'])
        //     .withMessage('Roli duhet të jetë "user" ose "admin"'),
    ]
}

module.exports = { createUserValidator, updateUserValidator }
