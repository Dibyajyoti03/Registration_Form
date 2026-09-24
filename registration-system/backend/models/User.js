const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type:     String,
            required: true,
            trim:     true,
        },

        lastName: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            trim:true,
            lowercase: true,
        },
        password: {
            type: String,
            required: true,
        },

        gender: {
            type:String,
            required: true,
            enum:["Male", "Female", "Other"],
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

module.exports = User;