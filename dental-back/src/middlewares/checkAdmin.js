const { Unauthorized } = require('http-errors');

const checkAdmin = (req, res, next) => {
    console.log(req.user.role);
    try {
        if (req.user && req.user.role === 'admin') {
            return next(); 
        } else {
            throw new Unauthorized('User does not have admin permissions.'); 
        }
    } catch (err) {
        next(err); 
    }
};

module.exports = checkAdmin;