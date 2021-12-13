const express=require("express");
const router=express.Router();
const Booking = require('../Models/bookingModel');
const Car = require('../Models/carModel')
const { v4: uuidv4 } = require('uuid');
const stripe = require('stripe')('sk_test_51JycHiSBk5MF6NaZMHQDCf5eEEm8bbB0fy98YPhEVCkgxg47nRcwbXQvbk3r3yFhEXChnUppsVT2m2bMpypadlo3000QUvRWa6')

router.post("/bookcar",async(req,res)=>{
    
        const {token}=req.body
    try {
        const customer=await stripe.customers.create({
            email:token.email,
            source:token.id
        })

        const payment = await stripe.charges.create({
            amount:req.body.totalAmount * 100 ,
            currency:'inr',
            customer:customer.id,
            receipt_email:token.email

        },
        {
            idempotencyKey : uuidv4()
        }
        )

        if(payment){
            req.body.transectionId=payment.source.id
            const newbooking = new Booking(req.body)
            await newbooking.save()
            const car = await Car.findOne({ _id : req.body.car})
            console.log(req.body.bookedTimeSlots);
            car.bookedTimeSlot.push(req.body.bookedTimeSlots)
    
            await car.save()
            res.send('Your Booking is Successful') 
        }
        else{
            return res.status(400).json(error);
        }




        
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
        
    }
})

router.get("/getallbookings",async(req,res)=>{

        try {
            const bookings = await Booking.find().populate('car')
            
            res.send(bookings)
        } catch (error) {
            return res.status(400).json(error);
        }
})

module.exports=router

