import { Router } from "express";
import items_controller from "../controllers/items_controller.js";
import { body, param} from "express-validator";
import user_controller from "../controllers/user_controller.js";
import authorize_manager from "../middlewares/authorize_manager.js";

const user_router = Router();

//login  query parameter manager for manager login
user_router.post('/login',[
    body("username").trim().escape().notEmpty(),
    body("password").trim().notEmpty().escape()
],user_controller.login);


//add user / sign up
user_router.post('/sign_up',[
    body("username").notEmpty().trim().escape(),
    body("password").trim().notEmpty().escape()
] , authorize_manager ,user_controller.sign_up )

//show users - manager
user_router.get('/', authorize_manager , user_controller.get_users)

//delete user -manager
user_router.delete('/:id' , param('id').escape().notEmpty() ,authorize_manager ,user_controller.delete_user)


export default user_router;