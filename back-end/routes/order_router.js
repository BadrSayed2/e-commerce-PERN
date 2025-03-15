import { Router } from "express";
import orders_controller from "../controllers/order_controller.js";
import { body} from "express-validator";
import authorize from "../middlewares/authorization.js"

const order_router = Router();

// make an order with type enum = [INCOMING , OUTGOING] query
order_router.post('/outgoing',[
    body('username').notEmpty().escape(),
    body('location').notEmpty().escape(),
    body('items').isArray().notEmpty()
] , orders_controller.make_order);

order_router.post('/incoming',[
    body('username').notEmpty().escape(),
    body('location').notEmpty().escape(),
    body('items').isArray().notEmpty()
] , authorize , (req,res,next)=>{
    req.headers.type = true;
    next();
},orders_controller.make_order);

//show orders 
//offset  , limit ,start_date , end_date, location
order_router.get('/' , authorize , orders_controller.get_orders)

export default order_router;