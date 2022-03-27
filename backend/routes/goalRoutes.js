const express = require('express')
const router = express.Router()
const {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
} = require('../controllers/goalController')
const auth = require('../middlewares/auth')
router.route('/').get(auth, getGoals).post(auth, setGoals)
router.route('/:id').put(auth, updateGoals).delete(auth, deleteGoals)

module.exports = router