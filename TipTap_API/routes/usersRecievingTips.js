const { UserTipReciever } = require('../models/userTipReciever');
const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const GMAIL_SERVICE = 'Gmail';
const EMAIL = 'tfortiptfortap@gmail.com';
const GMAIL_USER = 'Tip Tap';
const GMAIL_PASSWORD = 'tiptap123!';


//User that recieve Tips
router.post('/tipRecieverUser', async (req, res) => {
    try {
        let tipRecieverUser = new UserTipReciever(req.body);
    await tipRecieverUser.save();

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { 
        user: 'tfortiptfortap@gmail.com',
        pass: 'tiptap123!'
        }
        });
        //sending Email to reciever
        const info = await transporter.sendMail({
        from: 'tfortiptfortap@gmail.com', // sender address
        to: req.body.reciever_email, // list of receivers
        subject: 'Tip Recieve', // Subject line
        text: `Congratulations, you have recieved an amount of $ ${req.body.tipAmount} from ${req.body.tipGiver_name}. Contact the support to claim your Tip. Thanks`, 
        });
        
        if (info) {
            const tipGivermail = await transporter.sendMail({
                from: 'tfortiptfortap@gmail.com', // sender address
                to: req.body.tipGiver_email, // list of receivers
                subject: 'Tip Delivered Confirmation', // Subject line
                text: `You have successfully delivered $ ${req.body.tipAmount} to ${req.body.reciever_name} to card No. ${req.body.reciever_cardNo}`, // plain text body
                });
                if(tipGivermail) {
                    return res.send({
                        message: 'Your tip has been delivered'
                    });
                }
        }

    } catch (err) {
        return res.status(400).send(err)
    }
})

//get data of all tip recievers given by only one person
router.get('/getAllTipRecieverUser/:email', async (req, res) => {
    try {
        let tipRecieverUser = await UserTipReciever.find({ tipGiver_email: req.params.email });
        res.json({tipRecieverUser})
    } catch (err) {
        res.status(400).send({err})
    }
    
    
    // if (!token) return res.status(400).send('We were unable to find a valid token. Your token my have expired.');
    
    // const user = await User.findOne({ _id: token.userId })
    // if (!user) return res.status(400).send('We were unable to find a user for this token.');
    // if (user.isVerified) return res.status(400).send('This user has already been verified.');
    
    // user.isVerified = true;
    // const result = await user.save()
    // if (!result) return res.status(400).send(err.message);
    
    // res.status(200).send("The account has been verified. Please log in.");
   })

module.exports = router;