const router = require("express").Router();
const cors = require("cors")

const auth = require('./auth')
const pages = require('./pages')

router.use(cors())
router.use(auth)
router.use(pages)


module.exports = router