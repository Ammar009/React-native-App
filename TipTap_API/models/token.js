const mongoose = require('mongoose');
const Joi = require('joi');
 
const tokenSchema = {
 userId: {
 type: String,
 required: true
 },
 token: {
 type: String,
 required: true
 },
 createdAt: {
 type: Date,
 required: true,
 default: Date.now,
 expires: 43200
 }
}
 
function validateToken(token) {
 const schema = {
 userId: Joi.string().required(),
 token: Joi.string().required(),
 createdAt: Joi.date().required()
 }
 return Joi.validate(token, schema);
}
 
const Token = mongoose.model('Token', tokenSchema, 'token');
 
exports.Token = Token;
exports.validateToken = validateToken;