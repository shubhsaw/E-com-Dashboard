const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
//Importin Database
const User = require('./users');
const Product = require('./product')
const app = express();

app.use(cors())
app.use(express.json())

app.post("/signup", async (req, res) => {
  try {
    const { email, firstname, lastname, password } = req.body;

    let newUser = new User({ email, firstname, lastname, password });
    await newUser.save();
    //hidding password
    newUser = newUser.toObject();
    delete newUser.password;

    res.json(newUser);
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
        res.send(user);
      } else {
        res.send({ result: "No User Found" })
      }
    } catch (err) {
      res.status(500).json({ error: "Something went wrong" })
    }
  }
});

app.post('/AddProduct', async (req, resp) => {
  try {
    const { name, price, company, desc, rating, userId } = req.body;
    let newProduct = new Product({ name, price, company, desc, rating, userId })
    await newProduct.save();
    resp.json(newProduct)
  } catch (err) {
    console.log(err);
  }
})

app.get('/products', async (req, resp) => {
  let products = await Product.find();

  if (products.length == 0) {
    resp.send("No Product Found")
  } else {
    resp.send(products)
  }
});

app.delete('/products/:id', async (req, resp) => {
  const result = await Product.deleteOne({ _id: req.params.id })
  resp.send(result);
  // resp.send("working .....")
});

app.listen(5000, () => console.log(`Server running on port 5000`));