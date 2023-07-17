import express from "express";
const useRouter = express.Router();
import { signin, signup } from '../controllers/userC.js'
import verifyAuth from "../middleware/authentication.js";

useRouter.post("/register", signup);
useRouter.post("/signin", signin);
useRouter.get("/welcome", verifyAuth, (req, res) => {
    if (!req.user) {
        res.status(401).json({ message: 'JWT token is not valid' })
    }
    if (req.user.role == "admin") {
        res.status(200).json({ message: "You  are authorised to admin dashbord !!" });
    }
    else {
        res.status(200).json({ message: "your welcome to the authorised page!!!!!" });

    }
})

export default useRouter;