const express = require('express');
const contactUs = require('../controllers/mailing');

const router = express.Router();


router
    .route('/')
    .post(contactUs);

    module.exports = router;