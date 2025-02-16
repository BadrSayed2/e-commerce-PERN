
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient();
const items_controller = {};

items_controller.get_items = async (req , res)=>{
    const { offset , limit , sort} = req.query;
    const items = [];

    try{

        items = await db.item.findMany({ 
            orderBy : [( (sort == "most_saled") ? {sales_number : "desc"} : 
                ( (sort == "most_ordered")? {order_number : "desc"} : 
                ( (sort == "price")? {price : "asc"} : {id : "asc" })) )], 
            skip : (offset??  0) ,
            take : (limit?? 10) ,
            omit : {sales_number : true , order_number : true , description : true ,quantity : true , category_id : true},
            include : {discounts : true , category : true }    
        });
        
        res.json(items);
    
    }catch(e){
        console.error("Error fetching products and categories:", e);
        res.status(500).json({ error: "Internal Server Error" });
    }

}

items_controller.get_discounted_items = async (req , res) =>{
    const { offset ,limit , sort} = req.query;
    const items = [];
    try{
        items = await db.item.findMany({ 
            where : {discounts : {isNot : null} } ,
            orderBy : [( (sort == "most_saled") ? {sales_number : "desc"} : 
                ( (sort == "most_ordered")? {order_number : "desc"} : 
                ( (sort == "price")? {price : "asc"} : {id : "asc" })) )], 
            skip : (offset??  0) ,
            take : (limit?? 10) ,
            omit : {sales_number : true , order_number : true , description : true ,quantity : true , category_id : true},
            include : {discounts : true , category : true }    
        });
                
        res.json(items);
    }catch(e){
        console.error("Error fetching products and categories:", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

items_controller.get_item = async (req , res)=>{
    const {item} = req.params;
    
    try{
        const fetched_item = await  db.item.findFirstOrThrow({
        where : {id : +item} ,
        omit : {sales_number : true , order_number : true } ,
        include :  {category : true , discounts : true} });

        res.json(fetched_item);
    }catch (e){
        console.error("Error fetching one item", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

items_controller.get_categorized_items = async (req , res)=>{
    const { offset ,limit , sort} = req.query;
    const {category} = req.params;
    const items = [];

    try{

        items = await db.item.findMany({ 
            where : {category_id : +category } ,
            orderBy : [( (sort == "most_saled") ? {sales_number : "desc"} : 
                ( (sort == "most_ordered")? {order_number : "desc"} : 
                ( (sort == "price")? {price : "asc"} : {id : "asc" })) )], 
            skip : (offset??  0) ,
            take : (limit?? 10) ,
            omit : {sales_number : true , order_number : true , description : true ,quantity : true , category_id : true},
            include : {discounts : true , category : true }    
        });
        res.json(items);
    
    }catch(e){
        console.error("Error fetching products and categories:", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

items_controller.search_item = async (req, res) => {
    try {
        const { search_text , offset ,limit } = req.query;
        if (!search_text) {
            return res.status(400).json({ error: "Search text is required" });
        }

        const items = await db.item.findMany({
            where: {
                OR: [
                    { name: { contains: search_text, mode: "insensitive" } },
                    { description: { contains: search_text, mode: "insensitive" } },
                    { category: { contains: search_text, mode: "insensitive" } }
                ]
            },
            take: limit??10 , 
            skip: offset??0, 
        });

        res.json(items);
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export default items_controller;