const router = require("express").Router();
const adminControllers  = require("../controllers/authControllers")
const userControllers  = require("../controllers/authControllers")

router.post('/login', adminControllers.login)
router.post('/login/user', userControllers.loginUsers)
router.post('/login/user', userControllers.loginUsers)
router.get('/delete/users/:id', adminControllers.deleteUsers)


module.exports = router