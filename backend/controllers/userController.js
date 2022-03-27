const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const generateUser = asyncHandler(async (req, res) => {
    const {
        name,
        email,
        password
    } = req.body
    if (!name || !email || !password) {
        res.status(400)
        throw new Error('No data,add all fields!')
    }
    //check if user exists
    const existUser = await User.findOne({
        email
    })
    if (existUser) {
        res.status(400)
        throw new Error('User already exists')
    }
    //hash password
    const salt = await bcrypt.genSalt(10)
    const hasedPassword = await bcrypt.hash(password, salt)

    //create user
    const user = await User.create({
        name,
        email,
        password: hasedPassword
    })
    if (user) {
        res.status(200).send({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateWebToken(user._id)
        })
    } else {
        res.status(400)
        throw new Eroor('Invalid credentials')
    }
})


// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
    const {

        email,
        password
    } = req.body

    // Check for user email
    const user = await User.findOne({
        email
    })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.send({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateWebToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Invalid credentials')
    }
})

const getMe = async (req, res) => {
    res.status(200).send(req.user)
}
const generateWebToken = (id) => {
    return jwt.sign({
        id
    }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}
module.exports = {
    generateUser,
    getMe,
    loginUser
}