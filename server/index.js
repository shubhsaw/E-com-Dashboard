const express=require('express');
const mongoose=require('mongoose')
const cors=require('cors')
//Importin Database
const User=require('./users');

const app=express();

app.use(cors())
app.use(express.json())

app.post("/signup", async (req, res) => {
  try {
    const { email, firstname, lastname, password } = req.body;

    const newUser = new User({ email, firstname, lastname, password });
    await newUser.save();
    //hidding password
    newUser=newUser.toObject();
    delete newUser.password;  
    
    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/login", async (req, res) => {
  // console.log(req.body);
  
  if(req.body.email && req.body.password){
  try{
    
    const user=await User.findOne(req.body).select("-password");
    if(user){
      res.send(user);
    }else{
      res.send({result:"No User Found"})
    }
  }catch(err){  
    res.status(500).json({error:"Something went wrong"})    
  }
  }
});

app.listen(5000, () => console.log(`Server running on port 5000`));