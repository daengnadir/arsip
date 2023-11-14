const router = require("express").Router();
const adminControllers  = require("../controllers/authControllers")
const userControllers  = require("../controllers/authControllers")
const upload = require("../middleware/multer")

router.post('/login', adminControllers.login)
router.post('/login/user', userControllers.loginUsers)
router.post('/register', userControllers.register)
router.post('/updateAdmin/:id', upload.single("image"), adminControllers.updateAdminById)
router.get('/delete/users/:id', adminControllers.deleteUsers)


module.exports = router