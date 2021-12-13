const mongoose=require('mongoose');

function connectDB(){
    mongoose.connect('mongodb+srv://manishkumar287:manishkumar287@cluster0.1lsva.mongodb.net/CharterWheels',{useUnifiedTopology: true, useNewUrlParser: true});

    const connection=mongoose.connection

    connection.on('connected',()=>{
        console.log("Mongo DB Connection Successful..");
    })

    connection.on('error',()=>{
        console.log("Error in MongoDB Connection..");
    })
}

connectDB();

module.exports=mongoose