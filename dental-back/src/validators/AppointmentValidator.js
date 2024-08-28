const expressValidator = require('express-validator')
const { check } = expressValidator;

const createAppointmentValidator = () => {
    return [
        check('fullName')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Ju lutem jepni një emër të plotë'),
        check('fullName')
            .isLength({ max: 255 })
            .withMessage('Emri i plotë duhet të jetë maksimumi 255 karaktere'),
        check('phone')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Ju lutem jepni një numër telefonit'),
        check('date')
            .not()
            .isEmpty()
            .withMessage('Ju lutem jepni një datë'),
        check('doctorId')
            .not()
            .isEmpty()
            .withMessage('Ju lutem jepni një ID të doktorit'),
        check('message')
            .optional()
            .isLength({ max: 500 })
            .withMessage('Mesazhi duhet të jetë maksimumi 500 karaktere'),
        check('privacyPolicy')
            .not()
            .isEmpty()
            .withMessage('Ju lutem jepni një zgjedhje për politikën e privatësisë'),
    ]
}

const updateAppointmentValidator = () => {
    return [
        check('fullName')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Ju lutem jepni një emër të plotë')
            .isLength({ max: 255 })
            .withMessage('Emri i plotë duhet të jetë maksimumi 255 karaktere'),
        check('phone')
            .trim()
            .not()
            .isEmpty()
            .withMessage('Ju lutem jepni një numër telefonit'),
        check('date')
            .not()
            .isEmpty()
            .withMessage('Ju lutem jepni një datë'),
        check('doctorId')
            .not()
            .isEmpty()
            .withMessage('Ju lutem jepni një ID të doktorit'),
        check('message')
            .optional()
            .isLength({ max: 500 })
            .withMessage('Mesazhi duhet të jetë maksimumi 500 karaktere'),
        check('privacyPolicy')
            .not()
            .isEmpty()
            .withMessage('Ju lutem jepni një zgjedhje për politikën e privatësisë'),
    ]
}

module.exports = { createAppointmentValidator, updateAppointmentValidator }
