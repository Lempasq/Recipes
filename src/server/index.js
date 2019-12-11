// MODULES
const express = require('express'),
      path = require('path'),
      cors = require('cors'),

    // mongoDB
      connectDB = require('../config/db');
      connectDB()

require('dotenv').config()

// EXPRESS SERVER
const app = express();
const PORT = process.env.PORT || 5000;

const DIST_DIR = path.join(__dirname, './');
const HTML_FILE = path.join(DIST_DIR, 'index.html');

// AVAILABLE URL's
app.get('/', (req, res) => {
    res.sendFile(HTML_FILE);
});

// LAUNCH SERVER ON PORT
app.listen(PORT, function () {
    console.log(`Server started on port: ${PORT}`);
});

// API
const mockResponse = {
  apo: `yammy yammy, i love api'es`
};

app.get('/api', (req, res) => {
    res.send(mockResponse);
});

// MIDDLEWARE
app.use(cors());
app.use(express.static(DIST_DIR));
app.use(express.json()); // sending post req
app.use(express.urlencoded({ extended: true }));


