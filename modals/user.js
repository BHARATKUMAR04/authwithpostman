import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    fullname: { type: String, required: [true, "fullname not provided"] },
    email: {
        type: String,
        unique: [true, "email already exists"],
        trim: true,
        lowercase: true,
        validate: {
            validator: function (v) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: `email is not a valid email `
        }
    },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        required: [true, "Please specify the user role"]
    },
    password: { type: String, required: [true, "please provide password"] },
    created: { type: Date, default: Date.now() }
});
const userModal = mongoose.model("user", userSchema);

export default userModal;