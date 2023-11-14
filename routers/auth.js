const router = require("express").Router();
const adminControllers  = require("../controllers/authControllers")
const userControllers  = require("../controllers/authControllers")
const upload = require("../middleware/multer")
const user = require("../middleware/user")


router.post('/login', adminControllers.login)
router.post('/login/user', userControllers.loginUsers, user)
router.post('/register', userControllers.register)
router.post('/updateAdmin/:id', upload.single("image"), adminControllers.updateAdminById)
router.get('/active/:id', adminControllers.activeUserById)
router.get('/nonActive/:id', adminControllers.nonActiveUserById)
router.get('/delete/users/:id', adminControllers.deleteUsers)


module.exports = router