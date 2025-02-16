import { Router } from "express";
import categories_controller from "../controllers/categories_controller.js";
const category_router = Router();

//query parameters int limit ,enum sort = {"most_saled" , "most_ordered" , "price"} , enum sort_type ={"asc" , "dsc"}

//get all categories
category_router.get('' , categories_controller.get_categories)


export default category_router;