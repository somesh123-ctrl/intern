const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config();
const User = require('./model/user.js')
app.use(express.json())
app.use(cors());
const mongoose = require('mongoose')
const path = require('path');



const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    
    useUnifiedTopology: true
 })
 .then(()=>{
    console.log('con to db established')
 })


 if(process.env.NODE_ENV ==='production') {

  app.use(express.static('client/build'));

  app.get('*', (req,res) => {
   
    res.sendFile(path.join(__dirname+'/client/build/index.html'));

  });
}



app.post('/login' , async (req , res) => {
    
      const user =   await User.findOne({
            email: req.body.email,
            password: req.body.password
        }) 

        if(user){
         return res.json({status:"success", user:true})
        } 
        else{
            return res.json({status:"eror", user:false})
           } 
   
    })


    const itemSchema = {
        username: String,
        mobile_number: Number,
        email: String,
        address: String,



      };
      
      //data model
      const Item = mongoose.model("Item", itemSchema);
      
      //read route
      app.get("/items", (req, res) => {
        Item.find()
          .then((items) => res.json(items))
          .catch((err) => res.status(400).json("Error: " + err));
      });
      
      //create route
      app.post("/newitem", (req, res) => {
        const newItem = new Item({
          username: req.body.username,
          mobile_number: req.body.mobile_number,
          email: req.body.email,
          address: req.body.address,

        });
      
        newItem
          .save()
          .then((item) => console.log(item))
          .catch((err) => res.status(400).json("Error " + err));
      });
      
      //delete route
      app.delete("/delete/:id", (req, res) => {
        const id = req.params.id;
      
        Item.findByIdAndDelete({ _id: id }, (req, res, err) => {
          if (!err) {
            console.log("Item deleted");
          } else {
            console.log(err);
          }
        });
      });
      
      //update route
     
      const PORT = process.env.PORT || 5000;

app.listen(PORT , ()=> {
    console.log('Server statrted on 5000')
})