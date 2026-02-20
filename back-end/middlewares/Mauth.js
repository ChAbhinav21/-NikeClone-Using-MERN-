// back-end/middlewares/Mauth.js
const { getUser } = require('../service/auth')

async function  currentUserExist(req, res, next) {
    const tokencookie = req.cookies?.token;
    if (!tokencookie) { return next() }
    const user = await getUser(tokencookie);
    if (!user) {
        res.clearCookie("token");//If token is invalid, you may want to clear cookie:
    }
    req.user = user;
    return next();

}

module.exports = {  currentUserExist, }
