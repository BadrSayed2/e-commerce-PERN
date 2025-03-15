import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'
import fs from 'fs'
const db = new PrismaClient();

const authorize = async (req,res,next)=>{
    const {authorization} = req.headers;
    const token =authorization.split(' ')[1];
    try{

        const publicKey = fs.readFileSync("public.pem", "utf8");
        const user = jwt.verify(token, publicKey , { algorithm: "RS256" })
        await db.user.findFirstOrThrow({where: {id : user.id }});
        next();
    }catch(e){
        // next(e);
        res.status(403).json({error : e.message});

    }

}

export default authorize;