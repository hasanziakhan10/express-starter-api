const products = require("../models/productModel");

const getProducts = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Products retrieved successfully",
        data: products
    });
};

const getProductById = (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find(product => product.id === id);

    if (!product) {
        return res.status(404).json({
            success: false,
            message: "Product not found",
            data: null
        });
    }

    res.status(200).json({
        success: true,
        message: "Product retrieved successfully",
        data: product
    });
};

const createProduct = (req, res) => {
    const { name, price } = req.body;

    if (!name || price === undefined) {
        return res.status(400).json({
            success: false,
            message: "Name and price are required",
            data: null
        });
    }

    const newProduct = {
        id: products.length + 1,
        name,
        price
    };

    products.push(newProduct);

    res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: newProduct
    });
};

module.exports = {
    getProducts,
    getProductById,
    createProduct
};