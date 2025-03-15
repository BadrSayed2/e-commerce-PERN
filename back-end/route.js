import { Router } from "express";
import items_router from "./routes/items_router.js";
import category_router from "./routes/category_router.js";
import order_router from "./routes/order_router.js";
import user_router from "./routes/user_router.js";
import authorize from "./middlewares/authorization.js";
import authorize_manager from "./middlewares/authorize_manager.js";

const router = Router();

router.use('/items' , items_router);
router.use('/category',category_router);
router.use('/order',order_router);
router.use('/user' , user_router);

// router.get('/test' , authorize , async(req , res)=>{console.log("you are authorized")})
router.get('/manager' , authorize_manager , async(req , res)=>{console.log("you are a manager")})
export default router;