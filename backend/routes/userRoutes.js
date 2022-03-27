const express = require('express')
const router = express.Router()
const {
    generateUser,
    getMe,
    loginUser

} = require('../controllers/userController')
const auth = require('../middlewares/auth')

router.post('/', generateUser)
router.get('/me', auth, getMe)
router.post('/login', loginUser)
module.exports = router