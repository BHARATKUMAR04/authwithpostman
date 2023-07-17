import mongoose from "mongoose";
import userModal from "../modals/user.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const signup = async (req, res) => {
    const { fullname, email, password, role } = req.body;
    const hashpass = await bcrypt.hashSync(password, 8);
    console.log("hashpass:", hashpass);
    const user = new userModal({ fullname, email, password: hashpass, role });
    console.log("user:", user);


    const ruser = await user.save();
    console.log(ruser);


    console.log("register routes exequted")
    res.status(201).json(ruser);
}
export const signin = async (req, res) => {
    const secretKey = process.env.SECRET_KEY;
    const { email, password } = req.body;
    const user = await userModal.findOne({ email });
    if (!user) {
        res.status(403).json("Email is invalid");
    }
    const authpass = await bcrypt.compareSync(password, user.password);
    if (!authpass) {
        res.status(403).json("password is invalid");
    }
    console.log("authpass", authpass);
    console.log("user:", user);
    var token = await JWT.sign({ id: user._id }, secretKey, { expiresIn: 86400 });
    res.status(201).json({
        user: {
            id: user._id,
            email: user.email,
            name: user.fullname,
        },
        message: "Login succesfully:",
        accesstoken: token
    });

    console.log("signin routes exequted")
}