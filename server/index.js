const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
//Importin Database
const User = require('./users');
const Product = require('./product')
const app = express();

app.use(cors())
app.use(express.json())
const Jwt=require('jsonwebtoken')
const jwtkey="e-com"

app.post("/signup", async (req, res) => {
  try {
    const { email, firstname, lastname, password } = req.body;

    let newUser = new User({ email, firstname, lastname, password });
    await newUser.save();
    //hidding password
    newUser = newUser.toObject();
    delete newUser.password;

    // res.json(newUser);

    //JWT Token
    Jwt.sign({newUser},jwtkey,{expiresIn:"1hr"},(err,token)=>{
          res.send({newUser,auth:token})
        })

  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.post("/login", async (req, res) => {
  // console.log(req.body);

  if (req.body.email && req.body.password) {
    try {

      const user = await User.findOne(req.body).select("-password");
      if (user) {
        // res.send(user);
        //JWT AUTH
        Jwt.sign({user},jwtkey,{expiresIn:"1hr"},(err,token)=>{
          res.send({user,auth:token})
        })
      } else {
        res.send({ result: "No User Found" })
      }
    } catch (err) {
      res.status(500).json({ error: "Something went wrong" })
    }
  }
});

app.post('/AddProduct',verifyToken, async (req, resp) => {
  try {
    const { name, price, company, desc, rating, userId } = req.body;
    let newProduct = new Product({ name, price, company, desc, rating, userId })
    await newProduct.save();
    resp.json(newProduct)
  } catch (err) {
    console.log(err);
  }
})

app.get('/products',verifyToken, async (req, resp) => {
  let products = await Product.find();

  if (products.length == 0) {
    resp.send("No Product Found")
  } else {
    resp.send(products)
  }
});

app.delete('/products/:id',verifyToken, async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id })
  resp.send(result);
  // resp.send("working .....")
});

app.get('/product/:id',verifyToken, async (req, resp) => {
  let result = await Product.findOne({ _id: req.params.id });
  if (result) {
    resp.send(result);
  } else {
    resp.send({ result: "No Record Found" })
  }
});

app.put('/product/:id',verifyToken, async (req, resp) => {
  let result = await Product.updateOne(
    { _id: req.params.id }, 
    { $set: req.body }
  );
  resp.send(result);
});


app.get('/search/:key', verifyToken,async (req, resp) => {  
  let result = await Product.find({
    "$or": [
      {name:{$regex:req.params.key}},
      {company:{$regex:req.params.key}}
    ]
  });
  resp.send(result);
})

function verifyToken(req,res,next){
  let token=req.headers['authorization'];
  if(token){
    token=token.split(' ')[1];
    Jwt.verify(token,jwtkey,(err,valid)=>{
      if(err){
        res.send({result:"Please provide valid token"})
      }
      else{
        next();
      }
    })
  }else{
    res.send({result:"please add token with header"})
  }
}

app.listen(5000, () => console.log(`Server running on port 5000`));