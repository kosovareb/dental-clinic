
// const {verify} = require("jsonwebtoken")

// const verifyToken = (token) => {
//     const {APP_SECRET} = process.env
//     return verify(token, APP_SECRET)
// }

// module.exports = verifyToken;

const { verify } = require("jsonwebtoken");
const { Unauthorized } = require("http-errors");

const verifyToken = (token) => {
    try {
        const { APP_SECRET } = process.env;
        return verify(token, APP_SECRET);
    } catch (err) {
        console.error('Invalid token:', err);
        throw new Unauthorized('Invalid token');
    }
};

module.exports = verifyToken;

