import { Router } from "express";
import items_router from "./routes/items_router.js";
import category_router from "./routes/category_router.js";
import order_router from "./routes/order_router.js";

const router = Router();

router.use('/items' , items_router);
router.use('/category',category_router);
router.use('/order',order_router)

export default router;