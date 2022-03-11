const asyncHandler = require('express-async-handler')

const getGoals = asyncHandler(async (req, res) => {
    res.status(201).json({
        message: 'Get goals'
    })
})

const setGoals = asyncHandler(async (req, res) => {
    if (!req.body.text) {
        res.status(400)
        throw new Error('Please enter text')
    }
    res.status(200).send({
        message: req.body.text
    })
})

const updateGoals = asyncHandler(async (req, res) => {
    res.status(201).json({
        message: 'Get goals'
    })
})
const deleteGoals = asyncHandler(async (req, res) => {
    res.status(201).json({
        message: 'Get goals'
    })
})
module.exports = {
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}