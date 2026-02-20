// back-end/router/userRouter.js
const {Router} = require('express')
const {createUser,handelUserLogin}  = require('../controllers/user')
const {currentUserExist} = require('../middlewares/Mauth')
const router = Router();

router.post('/',createUser)
.post('/login',handelUserLogin)
.get('/currentUser', currentUserExist, (req, res) => {
    if (!req.user) return res.json({ user: null });
    return res.json({ user: req.user });
})
module.exports = router