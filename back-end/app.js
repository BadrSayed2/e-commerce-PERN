
import express from "express";
import cors from "cors";
import router from "./route.js";
const app = express();

app.use(express.urlencoded({extended : true }));

app.use(express.json());

app.use(cors({
    origin : [process.env.FRONT_END , process.env.MANAGER] ,
    optionsSuccessStatus: 200,
}))

app.use(router);


app.listen(process.env.PORT || 8000 , ()=>{console.log(`the server is listening on port ${process.env.PORT || 8000}`)})