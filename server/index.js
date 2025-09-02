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
    
    res.json({ message: `User saved successfully! ${newUser}`});
  } catch (err) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(5000, () => console.log(`Server running on port 5000`));