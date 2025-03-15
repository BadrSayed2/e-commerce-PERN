
import { PrismaClient } from '@prisma/client'

const db = new PrismaClient();
const items_controller = {};

items_controller.get_items = async (req , res)=>{
    let { offset , limit , sort} = req.query;
    let items = [];
    // console.log({offset , limit})
    offset = parseInt(offset);
    limit = parseInt(limit);
    try{
        // console.log("we reached here")
        items = await db.item.findMany({ 
            orderBy : [( (sort == "most_saled") ? {sales_number : "desc"} : 
                ( (sort == "most_ordered")? {order_number : "desc"} : 
                ( (sort == "price")? {price : "asc"} : {id : "asc" })) )], 
            take : (limit? limit : 10) ,
            skip : (offset? limit :  0) ,
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
    let { offset , limit , sort} = req.query;
    let items = [];
    // console.log({offset , limit})
    offset = parseInt(offset);
    limit = parseInt(limit);
    try{
        
        items = await db.item.findMany({ 
            where : {discounts : {isNot : null} } ,
            orderBy : [( (sort == "most_saled") ? {sales_number : "desc"} : 
                ( (sort == "most_ordered")? {order_number : "desc"} : 
                ( (sort == "price")? {price : "asc"} : {id : "asc" })) )], 
            take : (limit? limit : 10) ,
            skip : (offset? limit :  0) ,
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
    const item = parseInt(req.params.item);
    // console.log(item);
    try{
        const fetched_item = await  db.item.findFirstOrThrow({
        where : {id : item} ,
        omit : {sales_number : true , order_number : true } ,
        include :  {category : true , discounts : true} });

        res.json(fetched_item);
    }catch (e){
        console.error("Error fetching one item", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

items_controller.get_categorized_items = async (req , res)=>{
    let { offset , limit , sort} = req.query;
    let items = [];
    let category_id = parseInt(req.params.category);
    // console.log({offset , limit})
    offset = parseInt(offset);
    limit = parseInt(limit);

    try{

        items = await db.item.findMany({ 
            where : {category_id } ,
            orderBy : [( (sort == "most_saled") ? {sales_number : "desc"} : 
                ( (sort == "most_ordered")? {order_number : "desc"} : 
                ( (sort == "price")? {price : "asc"} : {id : "asc" })) )], 
            take : (limit? limit : 10) ,
            skip : (offset? limit :  0) ,
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
        // console.log({offset , limit})
        offset = parseInt(offset);
        limit = parseInt(limit);

        if (!search_text) {
            return res.status(400).json({ error: "Search text is required" });
        }

        const items = await db.item.findMany({
            where: {
                OR: [
                    { name: { contains: search_text, mode: "insensitive" } },
                    { description: { contains: search_text, mode: "insensitive" } },
                    { category: {name : { contains: search_text, mode: "insensitive" }}  }
                ]
            },
            take : (limit? limit : 10) ,
            skip : (offset? limit :  0) ,
        });

        res.json(items);
    } catch (error) {
        console.error("Search error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

items_controller.add_product = async (req,res) => {
    const user = req.body;
    try{
        await db.item.create({
            data:{name : user.name , description : user.description 
                , price : parseInt(user.price) , picture_url : user.picture_url 
                , quantity : parseInt(user.quantity ) , category_id: user.category}
        })
        res.json({added : true})
    }catch(e){
        res.status(500).json({add: false , error : e});
    }
}

items_controller.update_product = async (req,res) => {
    const user = req.body;
    const id = parseInt(req.params.id);
    try{
        await db.item.update({where : {id },data : {
            name : user.name , description : user.description 
                , price : parseInt(user.price) , picture_url : user.picture_url 
                , quantity : parseInt(user.quantity ) , category_id: user.category
        }} )
        res.json({update : true});
    }catch(e){
        res.status(500).json({update : false , error : e});
    }
}

items_controller.delete_item = async(req,res) =>{
    const id = parseInt(req.params.id);
    try{
        await db.item.delete({where:{id}});
        res.json({deleted : true});
    }catch(e){
        res.status(500).json({deleted : false , error : e});
    }
}


export default items_controller;