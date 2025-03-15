import { PrismaClient } from "@prisma/client";

const categories_controller = {}
const db = new PrismaClient();

categories_controller.get_categories = async (req , res)=>{
    let { offset , limit , sort} = req.query;
    let categories = [];
    // console.log({offset , limit})
    offset = parseInt(offset);
    limit = parseInt(limit);

    try{
        categories = await db.category.findMany({
            orderBy : [( (sort == "most_saled") ? {sales_number : "desc"} : 
                ( (sort == "most_ordered")? {order_number : "desc"} : 
                ( (sort == "price")? {price : "asc"} : {id : "asc" })) )], 
            skip : (offset? offset :  0) ,
            take : (limit? limit : 10) ,
        })

        res.json(categories);
    }catch(e){
            console.error("Error fetching products and categories:", e);
            res.status(500).json({ error: "Internal Server Error" });   
    }
}

categories_controller.add_category = async (req, res)=>{
    const name = req.body.name;
    try{
        await db.category.create({data : {name }});
        res.json({added : true});
    }catch(e){
        res.status(500).json({added : false , error :e });
    }
}

categories_controller.update_category = async(req, res)=>{
    const id = parseInt(req.params.id);
    const name = req.body.name;
    try{
        await db.category.update({where : {id} , data : { name}});
        res.json({update : true });
    }catch(e){
        res.status(500).json({update : false , error : e});
    }
}

categories_controller.delete_category = async (req , res) =>{
    const id = req.params.id;
    try{
        await db.category.delete({where : {id}});
        res.json({deleted : true});
    }catch(e){
        res.status(500).json({deleted : false , error : e});
    }
}
export default categories_controller;