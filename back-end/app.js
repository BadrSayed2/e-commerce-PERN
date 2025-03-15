
import express from "express";
import cors from "cors";
import router from "./route.js";
import { configDotenv } from "dotenv";
import { remove_expired_discounts , remove_old_orders } from "./utilities/remove_expired_discounts.js";

const app = express();

app.use(express.urlencoded({extended : true }));

app.use(express.json());

configDotenv();
app.use(cors({
    origin: [process.env.FRONT_END , process.env.MANAGER],  
    optionsSuccessStatus: 200
}));

app.use(router);
remove_expired_discounts();
remove_old_orders();

app.listen(process.env.PORT || 8000 , ()=>{console.log(`the server is listening on port ${process.env.PORT || 8000}`)})
