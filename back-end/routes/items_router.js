import { Router } from "express";
import items_controller from "../controllers/items_controller.js";
import { body, param} from "express-validator";
import authorize from "../middlewares/authorization.js";

const items_router = Router();

//for all routers
//query parameters int limit ,offset,enum sort = {"most_saled" , "most_ordered" , "price"} 

//get all products
items_router.get('/',items_controller.get_items); // done

//get discounted items only
items_router.get('/discount', items_controller.get_discounted_items);//done

//get a specific item 
items_router.get('/id/:item', param('item').notEmpty().escape(),items_controller.get_item);//done

//get search for items 
//query parameter search (reg exp)
items_router.get('/search',items_controller.search_item)//done

//get products for a category
items_router.get('/category/:category' , param('category').notEmpty().escape() ,items_controller.get_categorized_items);//done

//user api
// add product
items_router.post('/add', authorize, [body(['name', 'description'
    ,'picture_url',]).notEmpty().trim().escape(),
     body(['price','quantity' , 'category']).isNumeric().escape().notEmpty()] , items_controller.add_product);
// update product
items_router.patch('/:id' , authorize ,param('id').notEmpty().escape() ,[body(['name', 'description'
    ,'picture_url',]).notEmpty().trim().escape(),
     body(['price','quantity' , 'category']).isNumeric().escape().notEmpty()] ,
     items_controller.update_product);
// delete product
items_router.delete('/:id', param('id').notEmpty().escape() , authorize ,items_controller.delete_item )

export default items_router;