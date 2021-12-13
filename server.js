const express=require("express");
const app=express();
const port=process.env.PORT || 4000;
const dbConnection=require('./db')

app.use(express.json())

app.use("/api/cars/", require("./routes/carRoute"))
app.use("/api/users/", require("./routes/usersRoute"))
app.use("/api/bookings/", require("./routes/bookingsRoute"))
app.get("/",(req,res)=>{
    res.send("Hello World");
})
app.listen(port,()=>console.log(`Server is running ${port}`))