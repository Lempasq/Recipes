const mongoose = require('mongoose')

const clicksSchema = new mongoose.Schema({
    clicks: 0,
});

const Clicks = mongoose.model('User', clicksSchema);
module.exports = Clicks;