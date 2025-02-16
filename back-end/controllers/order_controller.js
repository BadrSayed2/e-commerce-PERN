
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();
const orders_controller = {};

orders_controller.make_order = async (req , res)=>{
    const order = req.body;
    try{
        //make all transactions or do not make nothing
        await prisma.$transaction(async (db)=>{
            
            //make order
            const {id} = await db.order.create({data : {
                username : order.username,
                location : order.location,
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
                    data: { quantity: { decrement: item.quantity } }
                })
            ));
            
        })
        
        res.status(200).send("done");
    }catch(e){
        console.error("Error fetching products and categories:", e);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

export default orders_controller;