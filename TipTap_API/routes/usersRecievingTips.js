const { UserTipReciever } = require('../models/userTipReciever');
const express = require('express');
const router = express.Router();
const nodemailer = require("nodemailer");
const Moment = require('moment');
const { extendMoment } = require('moment-range');
const moment = extendMoment(Moment);
const { filter } = require('underscore');
const GMAIL_SERVICE = 'Gmail';
const EMAIL = 'tfortiptfortap@gmail.com';
const GMAIL_USER = 'Tip Tap';
const GMAIL_PASSWORD = 'tiptap123!';


//User that recieve Tips
router.post('/tipRecieverUser', async (req, res) => {
    try {
        let tipRecieverUser = new UserTipReciever(req.body);
        console.log('=================>>>>', req.body)
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
                        message: true
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
})

//get data of all tip givers given by only one person
router.get('/getAllTipGiverUser/:email', async (req, res) => {
    try {
        let tipGiverUser = await UserTipReciever.find({ reciever_email: req.params.email });
        res.json({tipGiverUser})
    } catch (err) {
        res.status(400).send({err})
    }
})

//get the data of tips between the range of dates
router.get('/getTipsBetweenRange/:startDate/:endDate', async (req, res) => {
    console.log('HELLLO', req.params)
    try {
        let specificTipRecieverUser = await UserTipReciever.find({
        recievingDate: {
            $gte: moment(req.params.startDate),
            $lte: moment(req.params.endDate)
        }
        })
        res.json({specificTipRecieverUser})
    } catch (err) {
        console.log("ERROR", err)
    }
   })

module.exports = router;