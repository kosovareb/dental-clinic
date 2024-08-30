const expressValidator = require('express-validator')
const validatorResult = expressValidator.validationResult;

const validate = (req, res, next) => {
    const errors = validatorResult(req);

    if(errors.isEmpty()) return next();

    const extractErrors = {}

    errors.array().forEach(error => {
        extractErrors[error.path] = error.msg
    })

    return res.status(400).json(extractErrors)
}

module.exports = validate;