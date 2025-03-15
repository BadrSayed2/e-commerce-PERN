import { Router } from "express";
import categories_controller from "../controllers/categories_controller.js";
import authorize from "../middlewares/authorization.js";
import { body, param } from "express-validator";
import items_controller from "../controllers/items_controller.js";
const category_router = Router();

//query parameters int limit ,enum sort = {"most_saled" , "most_ordered" , "price"} , enum sort_type ={"asc" , "dsc"}

//get all categories
category_router.get('' , categories_controller.get_categories)

category_router.post('/add' , body('name').trim().notEmpty().escape() , 
authorize , categories_controller.add_category)

category_router.patch('/:id' , 
    [param('id').notEmpty().escape() ,
        body('name').trim().notEmpty().escape() ] ,
        authorize , 
        categories_controller.update_category
)

category_router.delete('/:id' , 
    param('id').notEmpty().escape() , authorize , categories_controller.delete_category  )
export default category_router;