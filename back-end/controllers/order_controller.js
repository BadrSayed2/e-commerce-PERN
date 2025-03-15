
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
const orders_controller = {};

orders_controller.make_order = async (req , res)=>{
    try{
    const order = req.body;
    const type = (req.headers?.type)? 'INCOMING' : 'OUTGOING';
        //make all transactions or do not make nothing
        await prisma.$transaction(async (db)=>{
            
            //make order
            const {id} = await db.order.create({data : {
                username : order.username,
                location : order.location,
                type : type
            }})
            
            //make order
            await db.order_Item.createMany({data : [
                ...order.items.map((item)=>{
                    return {order_id : id , item_id : item.id , quantity : item.quantity}
                })
            ]})

            //update item quantity
            await Promise.all(order.items.map((item) =>
                db.item.update({
                    where: { id: item.id },
                    data: { quantity: (type == 'OUTGOING')? { decrement: item.quantity } : {increment : item.quantity}}
                })
            ));
            
        })
        
        res.status(200).json({});
    }catch(e){
        console.error("Error fetching products and categories:", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

orders_controller.get_orders = async (req , res) =>{
    try{
    const {offset , limit , start_date , end_date, location , type} = req.query;
        const orders = await prisma.order_Item.findMany({
        where:{order : {date : 
                (start_date && end_date )?
                {gte : new Date(start_date) , lte : new Date(end_date) } : undefined 
                , location : {contains : (location)? location : ""},
                type : {contains : type}
            }
        },
            include : {item : {select : {
                category : true , name : true 
                , picture_url: true ,discounts : true , id: true  } } , order : true },
            take : (limit)? parseInt(limit) : 10,
            skip : (offset)? parseInt(offset) : 0,
            omit : {order_id : true , item_id : true}
        })
        res.json(orders);
    }catch(e){
        res.status(500).json({error : e.message});
    }
    
}

export default orders_controller;