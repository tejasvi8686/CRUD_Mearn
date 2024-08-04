import Product from "../models/product.model.js";

export const getProduct = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json({ sucess: true, data: products });
  } catch (error) {
    console.log("error in fetching products:", error.message);
    res.status(500).json({ sucess: false, message: "sever Error" });
  }
};

export const createProduct = async (req, res) => {
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
};

export const updateProduct = async (req, res) => {
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
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(404)
      .json({ sucess: false, message: "Invalid Product id" });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({ sucess: true, message: "product deleted" });
  } catch (error) {
    console.log("error in deleting products: ", error.message);
    res.status(500).json({ sucess: false, message: "server Error" });
  }
};
