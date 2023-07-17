import express from "express";
import mongoose from "mongoose";
import useRouter from "./routes/userR.js";
import env from "dotenv";
const app = express();
env.config();
try {
    mongoose.connect(process.env.DBURI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(() => console.log("db connects")).catch((error) => console.log(error.message));

}
catch (error) {
    handleError(error);
}
process.on('unhandledRejection', error => {
    console.log('unhandledRejection', error.message);
});
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

app.use(useRouter);


app.listen(process.env.PORT ||4001, () => { console.log(`live server is running on port :${process.env.PORT}`) });
