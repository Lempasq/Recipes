const router = require('express').Router()
const Clicks = require('../models/clicks.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { clicksValidation } = require('../validation/clicks.validation')

// GET INFO
router.get('/get', async (req, res) => {

    try {
        const clicks = await Clicks.find()
        res.json(clicks)
    } catch (e) {
        res.status(400).json('Error: ' + e)
    }
})

// ADD COUNTER
router.post('/add/', async (req, res) => {

    // VALIDATION
    const {error, value} = clicksValidation(req.body)
    if (error) return res.status(400).json(error)

    // REGISTER USER
    const newClicks = new Clicks({
        ...value
    });

    try {
        await newClicks.save()
        res.json('Clicks registered!')
    } catch (error) {
        res.status(400).json(error)
    }
})

// UPDATE COUNTER
router.patch('/update/:id', async (req, res) => {

    try {
        let clicks = await Clicks.findById(req.params.id)
            clicks.clicks = req.body.newClicks

        try {
            await clicks.save()
            res.json('Clicks updated!')
        } catch (e) {
            res.status(400).json(e)
        }
    } catch (e) {
        res.status(400).json(e)
    }
})


module.exports = router;