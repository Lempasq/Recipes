const router = require('express').Router()
const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { registerValidation, loginValidation } = require('../validation/user.validation')

// GET USERS INFO
router.get('/get', async (req, res) => {

    try {
        const users = await User.find()
        res.json(users)
    } catch (e) {
        res.status(400).json('Error: ' + e)
    }
})

// GET CERTAIN USER
router.get('/get/:id', async (req, res) => {

    try {
        const result = await User.findById(req.params.id)
        res.json(result)
    } catch (e) {
        res.status(400).json('Error: ' + e)
    }
})

// REGISTER NEW USER
router.post('/register/', async (req, res) => {

    // VALIDATION
    const {error, value} = registerValidation(req.body)
    if (error) return res.status(400).json(error)

    // iS UNIQUE?
    const usernameRegistered = await User
        .findOne({username: req.body.username})
    if (usernameRegistered)
        return res.status(400).json('User with this nickname is already registered')

    const emailRegistered = await User
        .findOne({email: req.body.email})
    if (emailRegistered)
        return res.status(400).json('User with this email is already registered')

    // HASH PASSWORD
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // REGISTER USER
    const newUser = new User({
        ...value,
        password: hashedPassword
    });

    try {
        await newUser.save()
        res.json('User registered!')
    } catch (error) {
        res.status(400).json(error)
    }
})

// LOGIN
router.post('/login', async (req, res) => {

    // VALIDATION
    const {error, value} = loginValidation(req.body)
    if (error) return res.status(400).json(error)

    // USER EXIST ?
    const usernameRegistered = await User
        .findOne({username: req.body.username})
    const emailRegistered = await User
        .findOne({email: req.body.email})

    const getUserData = {...usernameRegistered, ...emailRegistered}
    user = {...getUserData._doc}
        if (!user) return res.status(400).json('Login is wrong')

    // PASSWORD IS CORRECT ?
    const validPass = await bcrypt.compare(req.body.password, user.password)
        if (!validPass) return res.status(400).json('Invalid password')

    // CREATE && ASSIGN A TOKEN
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header('auth-token', token).send(token)

})

// UPDATE USER DATA
router.patch('/update/:id', async (req, res) => {

    try {
        const user = await User.findById(req.params.id)
        user.username = req.body.username
        user.email = req.body.email
        user.password = req.body.password

        try {
            await user.save()
            res.json('User updated!')
        } catch (e) {
            res.status(400).json(e)
        }
    } catch (e) {
        res.status(400).json(e)
    }
})

// DELETE USER
router.delete('/delete/:id', async (req, res) => {

    try {
        await User.findByIdAndDelete(req.params.id)
        res.json('User deleted!')
    } catch (e) {
        res.status(400).json('Error: ' + e)
    }
})


module.exports = router;
