import { Router } from "express";
import items_controller from "../controllers/items_controller.js";
import { param} from "express-validator";
const items_router = Router();

//for all routers
//query parameters int limit ,enum sort = {"most_saled" , "most_ordered" , "price"} , enum sort_type ={"asc" , "dsc"}

//get all products
items_router.get('/',items_controller.get_items); // done

//get discounted items only
items_router.get('/discount', items_controller.get_discounted_items);//done

//get a specific item
items_router.get('/id/:item', param('item').notEmpty().escape(),items_controller.get_item);//done

//get search for items 
//query parameter search (reg exp)
items_router.get('/search',items_controller.search_item)

//get products for a category
items_router.get('/category/:category' , param('category').notEmpty().escape() ,items_controller.get_categorized_items);//done

export default items_router;