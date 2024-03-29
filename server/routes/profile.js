const router = require('express').Router()
const auth = require('./verifyToken')
const {profileValidation} = require('../validation/profile.validation')

const Profile = require('../models/profile.model')
const User = require('../models/user.model')

// @route  GET api/profile/me
// @desc   Get current users profile
// @access Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile
            .findOne({user: req.user.id})
            .populate('user', ['name', 'avatar'])

        // Profile doesn't exist?
        if(!profile) return res
            .status(400)
            .json('There is no profile for this user')

        res.json(profile)
    } catch (e) {
        res.status(500).json(e)
    }
})

// @route  POST api/profile
// @desc   Create or update user profile
// @access Private
router.post('/', auth, async (req, res) => {
    // Validation
    const {error, value} = profileValidation(req.body)
    if (error) return res.status(400).json(error)

    const {
        company,
        website,
        location,
        bio,
        status,
        githubusername,
        skills,
        youtube,
        facebook,
        twitter,
        instagram,
        linkedin
    } = value

    // Profile object
    const profileFields = {}
    profileFields.user = req.user.id

    if(company) profileFields.company = company
    if(website) profileFields.website = website
    if(location) profileFields.location = location
    if(bio) profileFields.bio = bio
    if(status) profileFields.status = status
    if(githubusername) profileFields.githubusername = githubusername
    if(skills) profileFields.skills = skills.split(',')
        .map(el => el.trim())

    // Build social object
    profileFields.social = {}
    if(youtube) profileFields.social.youtube = youtube
    if(twitter) profileFields.social.twitter = twitter
    if(facebook) profileFields.social.facebook = facebook
    if(linkedin) profileFields.social.linkedin = linkedin
    if(instagram) profileFields.social.instagram = instagram

    try {
        let profile = await Profile
            .findOne({user: req.user.id})

        // Update
        if(profile) {
            profile = await Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profileFields},
                {new: true}
            )
            return res.json(profile)
        }

        // Create
        profile = new Profile(profileFields)

        await profile.save()
        res.json(profile)
    } catch (e) {
        console.log(e)
        res.status(500).send('Server Error')
    }
})

// @route  GET api/profile/
// @desc   Get all profiles
// @access Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile
            .find()
            .populate('user', [
                'name',
                'avatar'
            ])
        res.json(profiles)
    } catch (e) {
        console.log(e)
        res.status(500).json('Server Error')
    }
})

// @route  GET api/profile/user/:user_id
// @desc   Get profile by user ID
// @access Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile
            .findOne({
                user: req.params.user_id
            })
            .populate('user', [
                'name',
                'avatar'
            ])

        if(!profile) return res
            .status(400)
            .json('Profile not found')

        res.json(profile)
    } catch (e) {
        // If id was wrong
        if(e.kind === 'ObjectId') return res
            .status(400)
            .json('Profile not found')

        res.status(500)
            .json('Server Error')
    }
})

// @route  DELETE api/profile/
// @desc   Delete profile, user & posts
// @access Private
router.delete('/', auth, async (req, res) => {
    try {
        // @todo - remove users posts

        // Remove profile
        await Profile
            .findOneAndRemove({
                user: req.user.id
            })

        // Remove user
        await User
            .findOneAndRemove({
                _id: req.user.id
            })

        res.json("User deleted!")
    } catch (e) {
        console.log(e)
        res.status(500).json('Server Error')
    }
})

// @route  PUT api/profile/
// @desc   Delete profile, user & posts
// @access Private

module.exports = router;
