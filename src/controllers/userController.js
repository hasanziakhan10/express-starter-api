const users = require("../models/userModel");

const getUsers = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Users retrieved successfully",
        data: users
    });
};

const getUserById = (req, res) => {
    const id = parseInt(req.params.id);

    const user = users.find(user => user.id === id);

    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found",
            data: null
        });
    }

    res.status(200).json({
        success: true,
        message: "User retrieved successfully",
        data: user
    });
};

const createUser = (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            success: false,
            message: "Name and email are required",
            data: null
        });
    }

    const newUser = {
        id: users.length + 1,
        name,
        email
    };

    users.push(newUser);

    res.status(201).json({
        success: true,
        message: "User created successfully",
        data: newUser
    });
};

module.exports = {
    getUsers,
    getUserById,
    createUser
};