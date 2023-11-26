const product = require('../models/product');

const insertProduct = async (req, res) => {
    const { name, price, description, image} = req.body;

    try{
        const response = await product.create({
            name: name,
            price: price,
            description: description,
            image: image
        });
        return res.status(201).json(response);
        
    } catch (err) {
        console.error(err);
        return res
        .status(500)
        .json({ message: "Não foi possível adicionar o produto..." });

    }
}
const getAllProducts = async (req, res) => {
  try {
    const products = await product.find();

    return res.status(302).json(products);
  } catch (err) {

    return res.status(404).json({ message: "Nenhum produto encontrado" });
  }
}
  
  const getProduct = async (req, res) => {
    const { productId } = req.body;

    try {
      const gettedProduct = await product.findById({ _id: productId })

      return res.status(302).json(gettedProduct);
    } catch (err) {
      
      return res.status(204).json({ message: "Produto não encontrado "});
    }
  }
module.exports = { insertProduct, getAllProducts, getProduct };
