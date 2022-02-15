const express = require("express");
const { products } = require("./../../data/data");
const router = express.Router();

router.get("/", (req, res) => {
  res.json(products);
});

router.get("/:productId", (req, res) => {
  const { productId } = req.params;
  const product = products.find((product) => product.id === +productId); // el + lo convierte a numero
  if (!product) {
    return res.status(404).json({
      success: false,
      error: `El producto con id: ${productId} no existe`,
    });
  }
});

router.post("/", (req, res) => {
  const { name, description, price, image } = req.body;
  if (!name || !description || !price || !image) {
    return res.status(400).json({ succes: false, error: "error en la carga" });
  }
  const newProduct = {
    id: products.length + 1,
    name,
    description,
    price,
    image,
  };
  products.push(newProduct);
  return res.json({ success: true, result: newProduct });
});

router.put("/:productId", (req, res) => {
  const {
    params: { productId },
    body: { name, description, price, image },
  } = req;
  if (!name || !description || !price || !image) {
    return res.status(400).json({ success: false, error: "error en la carga" });
  }
  const productIndex = products.findIndex(
    (product) => product.id === +productId
  );
  if (productIndex < 0)
    return res.status(404).json({
      success: false,
      error: `El producot con el idid: ${productId} no existe`,
    });
  const newProduct = {
    ...products[productIndex],
    name,
    description,
    price,
    image,
  };
  products[productIndex] = newProduct;
  return res.json({ success: true, result: newProduct });
});

router.delete("/:productId", (req, res) => {
  const { productId } = req.params;
  const productIndex = products.findIndex(
    (product) => product.id === +productId
  );
  if (productIndex < 0)
    return res.status(404).json({
      success: false,
      error: `El producto con ID ${productId} no existe!`,
    });
  products.splice(productIndex, 1);
  return res.json({
    success: true,
    result: "Producto eliminado correctamente.",
  });
});

module.exports = router;
