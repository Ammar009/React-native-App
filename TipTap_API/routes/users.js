const { User, validate } = require('../models/user');
const express = require('express');
const nodemailer = require("nodemailer");
const crypto = require('crypto');
const atob = require('atob');
const Blob = require('node-blob');
var randomize = require('randomatic');
const bcrypt = require('bcryptjs');
const router = express.Router();
const multer  = require('multer');
const { Token, validateToken } = require('../models/token');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    }
  })
const upload = multer({ storage: storage, limits: { fieldSize: 25 * 1024 * 1024 } });
const GMAIL_SERVICE = 'Gmail';
const EMAIL = 'tfortiptfortap@gmail.com';
const GMAIL_USER = 'Tip Tap';
const GMAIL_PASSWORD = 'tiptap123!';


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
            // const Token = user.generateAuthToken();
            return res.send({user: user});
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
    service: 'gmail',
    auth: { 
    user: 'tfortiptfortap@gmail.com',
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
    from: 'tfortiptfortap@gmail.com', // sender address
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
                service: 'gmail',
                auth: {
                user: 'tfortiptfortap@gmail.com',
                pass: 'tiptap123!'
                }
            });

            const info = await transporter.sendMail({
                from: 'tfortiptfortap@gmail.com', // sender address
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
   });


   router.post('/uploadImage', async (req, res, next) => {
    console.log('===Upload Iamge==>', req.body);
    const user = await User.findOne({ _id : req.body.id}); 
    user.updateOne({
        profileImage : req.body.imageUrl,
    },(err, res) => {
        if(err){
            console.log('User is not updated!!!');
        }else{
            console.log('Response', res);
            user.save();
        }
    });
    console.log('user', user);
    return res.json({
        message: 'Your image is not uploaded'
    }) 
  });

   router.post('/profile', upload.single('profile'), async (req, res, next) => {
    console.log('==============xgdfghdfghdfgh====>>>', req.body);
    //let blob = await dataURItoBlob(req.body.profile);
    // console.log('After Blob', blob);
    // const result = await User.findByIdAndUpdate(req.body.id, { $set: { profileImage: 'http://192.168.18.63:3000/api/users/profile/' + req.body.profile } });
    // console.log('fgdfgdfg', result);
    // if (result) {
    //   const barterResult = await Barter.updateMany({ _id: { $in: req.body.id } }, { userImage: result.profileImage })
    //   console.log(barterResult);
    //   const user = await User.findById(req.body.id)
    //   io.emit('user', _.pick(user, ['_id', 'firstname', 'lastname', 'email', 'profileImage', 'phoneNumber']));
    //   return res.send('http://50.63.12.199:3000/api/file/profile/' + req.file.filename);
    // }
    return res.send('yy');
    // req.file is the `avatar` file
    // req.body will hold the text fields, if there were any
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