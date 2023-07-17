import jwt from "jsonwebtoken";
import userModal from "../modals/user.js";

const verifyAuth = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];
    if (!token) {
        res.status(500).json({ message: "Bad Authentication!!!" });
    }
    jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
        if (err) {
            req.user = undefined;
            console.log("err", err);
        }
        userModal.findOne({ _id: decode.id }).then((user) => {
            req.user = user;
            console.log("user:",user);
            next()
        }).catch((err) => {
            req.user = undefined
            next();
        })
    })
}
export default verifyAuth;