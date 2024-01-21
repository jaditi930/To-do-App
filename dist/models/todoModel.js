"use strict";
const mongose = require("mongoose");
const todoSchema = mongose.Schema({
    username: {
        type: String,
        ref: 'User',
        required: [true, "User is not logged in"],
    },
    desc: {
        type: String,
        unique: true,
        required: [true, "Name is required"],
    },
});
module.exports = mongose.model("Todo", todoSchema);
