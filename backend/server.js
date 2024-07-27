import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config();
const app = express();

app.use(express.json()); // allows us to expcet JSON data in the req.body

app.post("/api/products", async (req, res) => {
  const product = req.body; //  user will send this data

  if (!product.name || !product.price || !product.image) {
    return res
      .status(400)
      .json({ sucess: false, message: "please provide all fields" });
  }

  const newProduct = new Product(product);

  try {
    await newProduct.save();
    res.status(201).json({ sucess: true, data: newProduct });
  } catch (error) {
    console.error("Error in Create Product", error.message);
    res.status(500).json({ sucess: false, message: "server Error" });
  }
});

// postmon 

app.listen(5000, () => {
  connectDB();
  console.log("server started at http://localhost:5000");
});
