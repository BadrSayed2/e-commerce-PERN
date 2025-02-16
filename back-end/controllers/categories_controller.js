import { PrismaClient } from "@prisma/client";

const categories_controller = {}
const db = new PrismaClient();

categories_controller.get_categories = async (req , res)=>{
    const categories = [];
    const { offset ,limit , sort} = req.query;

    try{
        categories = await db.category.findMany({
            orderBy : [( (sort == "most_saled") ? {sales_number : "desc"} : 
                ( (sort == "most_ordered")? {order_number : "desc"} : 
                ( (sort == "price")? {price : "asc"} : {id : "asc" })) )], 
            skip : (offset??  0) ,
            take : (limit?? 10) ,
        })

        res.json(categories);
    }catch(e){
            console.error("Error fetching products and categories:", e);
            res.status(500).json({ error: "Internal Server Error" });   
    }
}

export default categories_controller;