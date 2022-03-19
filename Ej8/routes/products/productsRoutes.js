const express = require("express");
const productController = require("../../controller/productcontroller");

const router = express.Router();

router.get(`/`, productController.getQuery);

router.get(`/:id`, productController.Params);

router.post(`/`, productController.postProducts);

router.put(`/:id`, productController.put);

router.delete(`/:id`, productController.delete);

module.exports = router;
