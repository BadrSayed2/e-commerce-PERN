import { Router } from "express";
import orders_controller from "../controllers/order_controller.js";
import { body} from "express-validator";

const order_router = Router();

// make an order
order_router.post('',[
    body('username').notEmpty().escape(),
    body('location').notEmpty().escape(),
    body('items').isArray().notEmpty()
] , orders_controller.make_order);


export default order_router;