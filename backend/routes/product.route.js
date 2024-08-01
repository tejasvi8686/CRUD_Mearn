import express from "express";
const router = express.Router();
import Product from '../models/product.model.js'
import mongoose from "mongoose";

router.get("/", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ sucess: true, data: products });
  } catch (error) {
    console.log("error in fetching products:", error.message);
    res.status(500).json({ sucess: false, message: "sever Error" });
  }
});

router.post("/", async (req, res) => {
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

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ sucess: false, message: "Invalid Product id" });
  }

  try {
    const updateProducts = await Product.findByIdAndUpdate(id, product, {
      new: true,
    });
    res.status(200).json({ sucess: true, data: updateProducts });
  } catch (error) {
    res.status(500).json({ sucess: true, message: "server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ sucess: true, message: "product deleted" });
  } catch (error) {
    console.log("error in deleting products: ", error.message);
    res.status(404).json({ sucess: false, message: "Product not found" });
  }
});

export default router; 
