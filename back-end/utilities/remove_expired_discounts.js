import { PrismaClient } from '@prisma/client';
import cron from 'node-cron';

const db = new PrismaClient();
const remove_expired_discounts = async()=>{

    cron.schedule('0 0,12 * * *', async () => {
        // console.log('Running cron job to delete expired discounts...');

        try {
            await db.discount.deleteMany({
                where: {
                    end_date: { lte: new Date() } 
                }
            });

        } catch (error) {

        }
    });

}

const remove_old_orders = async()=>{
    
    cron.schedule('0 0,12 * * *', async () => {
        // console.log('Running cron job to delete expired discounts...');

        try {
            const twoMonthsAgo = new Date();
            twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

            await db.order_Item.deleteMany({
                where: {
                    order_id: {
                        in: (await db.order.findMany({
                            where: { date: { lte: twoMonthsAgo } },
                            select: { id: true }
                        })).map(order => order.id)
                    }
                }
            });

            await db.order.deleteMany({
                where: { date: { lte: twoMonthsAgo } }
            });

        } catch (error) {
            
        }
    });
}

export {remove_expired_discounts , remove_old_orders};
