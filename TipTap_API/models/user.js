const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const PasswordComplexity = require('joi-password-complexity');
const { privateKey } = require('../config/default');

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 50,
        required: true
    },
    last_name: {
        type: String,
        trim: true,
        minLength: 3,
        maxLength: 50,
        required: true
    },
    email: {
        type: String,
        trim: true,
        minLength: 5,
        maxLength: 255,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minLength: 5,
        maxLength: 1024,
        required: true
    },
    zipcode: {
        type: Number,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    userType: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false        
    },
    resetPasswordToken: {
        type: String,
        default: ''
    },
    resetPasswordExpires: {
        type: String,
        default: ''
    }
})

const complexityOptions = {
    min: 6,
    max: 30,
    lowerCase: 1,
    numeric: 1,
    requirementCount: 2,
}

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ id: this._id }, privateKey);
    return token;
}

function validateUser(user) {
    const schema = {
        first_name: Joi.string().min(3).max(50).required(),
        last_name: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(5).max(50).required().email().trim(),
        password: Joi.string().required().min(5).max(1024),
        zipcode: Joi.number().required(),
        country: Joi.string().required(),
        address: Joi.string().required(),
        isVerified : Joi.boolean()
    }

    return Joi.validate(user, schema);
}

function validateUserPassword(password) {
    return Joi.validate(password, new PasswordComplexity(complexityOptions));
}

const User = mongoose.model('User', userSchema, 'users');


exports.User = User;
exports.validate = validateUser;
exports.validateUserPassword = validateUserPassword;