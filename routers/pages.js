const router = require("express").Router();
const userPageControllers  = require("../controllers/pageControllers/userPages")
const AdminPageControllers  = require("../controllers/pageControllers/adminPages")
const admin = require("../middleware/admin")
const user = require("../middleware/user")

// user pages
router.get('/users/dashboard', user, userPageControllers.dashboardUserPage)
// router.get('/about', userPageControllers.aboutPage)
router.get('/', userPageControllers.loginUserPage)
// router.get('/users/register', userPageControllers.registerPage)
// router.get('/users/dashboard', userPageControllers.dashboardUserPage)
router.get('/users/logout', userPageControllers.logoutUserPage)


// admin pages
// router.get('/login/admin', AdminPageControllers.loginAdminPage)
router.get('/admin/login', AdminPageControllers.loginAdminPage)
router.get('/admin/dashboard', admin, AdminPageControllers.dashboardAdminPage)
router.get('/admin/profile', admin ,AdminPageControllers.profileAdminPage)
router.get('/admin/data', admin,AdminPageControllers.UserAdminPage)
router.get('/admin/register/users', admin, AdminPageControllers.RegisterUserAdminPage)
// router.get('/admin/form/trash', admin,AdminPageControllers.uploadTrash)
// router.get('/admin/transaction/', admin,AdminPageControllers.transactionPage)
// router.get('/admin/reward/', admin,AdminPageControllers.rewardPage)
router.get('/logout', AdminPageControllers.logoutAdminPage)






module.exports = router