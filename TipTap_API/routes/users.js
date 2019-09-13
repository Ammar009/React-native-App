const { User, validate } = require('../models/user');
const mongoose = require('mongoose');
const express = require('express');
const nodemailer = require("nodemailer");
const crypto = require('crypto');
var randomize = require('randomatic');
const bcrypt = require('bcryptjs');
const router = express.Router();
const { Token, validateToken } = require('../models/token')


//User Signup
router.post('/signup', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.send(error.details[0].message);
    let user = await User.findOne({ email: req.body.email });

    if (user) return res.json({
        message : false
    })
    user = new User(req.body);

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    await user.save();

    const token = user.generateAuthToken();
    console.log('=========>>', user._id);
    return res.json([user]);
})
//user Login
router.post('/login', async(req,res)=>{
    const user = await User.findOne({email : req.body.email}); 

    if(!user){
        return res.send('User Not Found')
    }

    if(user){
        const verifyPassword = await bcrypt.compare(req.body.password, user.password);
        if(verifyPassword){
            const Token = user.generateAuthToken();
            return res.send({token: Token});
        }
        else{
            return res.status(404).send('Invalid Password');
        }        
    }
})
//user email verification
router.post('/emailverification', async (req, res) => {
    console.log('III Ammm hpppyyy to be called', req.body.id);
    const transporter = nodemailer.createTransport({
    service: 'Sendgrid',
    auth: {
    user: 'TipForTap',
    pass: 'tiptap123!'
    }
    });
    const token = new Token({
    userId: req.body.id,
    token: crypto.randomBytes(16).toString('hex')
    })
    
    const result = await token.save();
    if (!result) return res.status(400).send({
        message: 'Unable to save token...'
    });
    
    const info = await transporter.sendMail({
    from: 'verify@tiptap.com', // sender address
    to: req.body.email, // list of receivers
    subject: 'Account Verification Token', // Subject line
    text: `Hello, Please verify your account by clicking the link: http://${req.headers.host}/api/users/confirmation/${token.token} .`, // plain text body
    });
    
    if (info) return res.send({
        message: 'Email Sent Successfully'
    });
    
    return res.send({
        message: 'Unable to send verification email.'
    });
   })

   //user verication with url
   router.get('/confirmation/:token', async (req, res) => {
    const token = await Token.findOne({ token: req.params.token });
    if (!token) return res.status(400).send('We were unable to find a valid token. Your token my have expired.');
    
    const user = await User.findOne({ _id: token.userId })
    if (!user) return res.status(400).send('We were unable to find a user for this token.');
    if (user.isVerified) return res.status(400).send('This user has already been verified.');
    
    user.isVerified = true;
    const result = await user.save()
    if (!result) return res.status(400).send(err.message);
    
    res.status(200).send("The account has been verified. Please log in.");
   })

   //if user forgotPassword
   router.post('/forgotPassword',async(req,res) => {
       if(req.body.email === ''){
           console.log('Email Required!!!');
           //res.json('Email Required!!!');
       }
       console.log('===>Forgot Email==>', req.body.email);
       const user = await User.findOne({email : req.body.email}); 
       
        if(!user){
            return res.send('User Not Found')
        } else {
            const token = randomize('*', 6);
            //const token = crypto.randomBytes(20).toString('hex');
            console.log(token);
            user.updateOne({
                resetPasswordToken : token,
                resetPasswordExpires : Date.now() + 1800000,
            }, function(err, res){
                if(err){
                    console.log('User is not updated!!!');
                }else{
                    console.log('Response', res);
                    user.save();
                }
            });
            const transporter = nodemailer.createTransport({
                service: 'Sendgrid',
                auth: {
                user: 'TipForTap',
                pass: 'tiptap123!'
                }
            });

            const info = await transporter.sendMail({
                from: 'verify@tiptap.com', // sender address
                to: req.body.email, // list of receivers
                subject: 'Password Reset Link', // Subject line 
                text: `Hello, Please Enter This code to reset your password.. It will expire in 30 minutes. \n ${token}.`, // plain text body
            });
            
            console.log('sending email');
            transporter.sendMail(info, (err, response) => {
                if(err){
                    console.error('ERROR', err);
                } else {
                    console.log('Recovery Code sent to your email');
                    res.json({
                      message: 'Recovery code sent',
                    });
                }
            });

        }
   });
   //verify Token
   router.post('/verifyToken', async (req, res) => {
    const user = await User.findOne({email : req.body.email});
    if(user){
      if(user.resetPasswordToken === req.body.token && user.resetPasswordExpires >= Date.now()) {
        return res.json({
            message: 'Password reset request accepted!!!!',
            newScreen: true
        });
        }
        else {
            return res.json({
                message: 'Token mismatch or may be expire!!',
                newScreen: false
            });
        }
    }
    else {
        res.json({
            message: 'Email is Invalid!!!!!'
        });
    }
   });

   //changePassword of existing user
   router.post('/changePassword', async (req, res) => {
    const user = await User.findOne({email : req.body.email});

    const salt = await bcrypt.genSalt(10);
    newPassword = await bcrypt.hash(req.body.newPassword, salt);
    const passwordUpdate = await user.updateOne({password : newPassword});
    if(passwordUpdate.nModified === 1){
        return res.json({
            message: 'Your password is updated'
        }) 
    }
    else {
        return res.json({
            message: 'Your password is not updated'
        }) 
        
    }
    // return res.json({
    //     message: 'Password is upodated'
    // })
   });

   //reset
//    router.get('/reset/:token', function(req, res) {
//     User.findOne({ resetPasswordToken: req.params.token, resetPasswordExpires: { $gt: Date.now() } }, function(err, user) {
//       if (!user) {
//         //req.flash('error', 'Password reset token is invalid or has expired.');
//         return res.json({
//             message: 'User not find or token may expire!!',
//             newScreen: false
//         });
//       }else{
//       res.json({
//          message: 'Password reset request accepted!!!!',
//          newScreen: true
//       });
//       }
//     });
//   });


module.exports = router;