const { User } = require('../models/user');
const express = require('express');
const nodemailer = require("nodemailer");
const crypto = require('crypto');
var randomize = require('randomatic');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { Token, validateToken } = require('../models/token');
const GMAIL_SERVICE = 'Gmail';
const EMAIL = 'tfortiptfortap@gmail.com';
const GMAIL_USER = 'Tip Tap';
const GMAIL_PASSWORD = 'tiptap123!';


//User Signup
router.get('/getAllTipReciever', async (req, res) => {
    const user = await User.find({ userType : "tipreciever" });
    return res.json(user);
   })

module.exports = router;