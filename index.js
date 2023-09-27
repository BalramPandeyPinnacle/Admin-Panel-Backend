const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/user");
const Product = require("./db/product");
const app = express();
app.use(express.json());
app.use(cors()); //to resolve cors error
app.post("/register", async (req, res) => {
  let user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  res.send(result);
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await User.findOne(req.body).select("-password");
    if (user) {
      res.send(user);
    } else {
      res.send({ message: "No user Found on that Id" });
    }
  } else {
    res.send({ message: "No user Found on that Id" });
  }
});

app.post("/add-product",async(req,res)=>{
    let product=new Product(req.body);
    let result= await product.save();
    res.send(result);
    
})

app.get('/product',async(req,res)=>{
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } 
  catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
})

app.listen(5000);
console.log("server is running on 5000");
