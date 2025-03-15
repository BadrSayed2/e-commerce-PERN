import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client'
import fs from 'fs';

const db = new PrismaClient();

const authorize_manager = async (req,res,next)=>{
    const {authorize_manager} = req.headers;
    
    try{
        const token =authorize_manager.split(' ')[1];
        const publicKey = fs.readFileSync("public.pem", "utf8");
        const user = jwt.verify(token, publicKey , { algorithm: "RS256" })
        if(user.id != process.env.manager_id){throw new Error("login is required")}
        next();
    }catch(e){
        // next(e);
        res.status(403).json({error : "you are not aurhorized"})
    }

}

export default authorize_manager;