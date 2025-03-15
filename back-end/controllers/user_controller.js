
import { PrismaClient } from '@prisma/client'
import isPasswordsEqual from '../utilities/verify_password.js';
import jwt from "jsonwebtoken";
import fs from 'fs';
import crypto from 'crypto';

const db = new PrismaClient();
const user_controller = {};

user_controller.login = async (req,res)=>{
    const user = req.body;
    const {manager} = req.query;
    
    try{
        let id, password, salt;

        if(manager){
            if(user.username != process.env.Manager_username){ throw new Error("username not correct"); }
                id = process.env.manager_id;
                password = process.env.manager_password;
                salt = process.env.manager_salt;
        }else{
            const found =  await db.user.findFirstOrThrow({where:{username : user.username}});
            id = found.id;
            password = found.password;
            salt = found.salt;
        } 
        
        const password_verified = await isPasswordsEqual(user.password , salt , password)
        
        const privateKey = fs.readFileSync("private.pem", "utf8");
        if(password_verified){
            res.status(200).json({token : jwt.sign({id} , privateKey ,  { algorithm: "RS256" })})
        } else{
            res.status(401).json({err : "the password is not correct"});
        }
    }catch(e){
        res.status(401).json({error : e.message });
    }
}

user_controller.sign_up = async (req, res) => {
    try {
        const user = req.body;
        if(!user.username || !user.password){throw new Error("password and username are required")}
        
        const salt = crypto.randomBytes(16).toString('hex');
        
        const hash = await new Promise((resolve, reject) => {
            crypto.pbkdf2(user.password, salt, 31, 64, 'sha256', (err, derivedKey) => {
                if (err) return reject(new Error("A server error happened"));
                resolve(derivedKey.toString('hex'));
            });
        });

        await db.user.create({ data: { username: user.username, password: hash, salt } });
        res.json({ message: "User created successfully" });
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
};

user_controller.get_users = async (req, res) =>{
    try{
        const limit = parseInt(req.query.limit);
        const offset = parseInt(req.query.offset);
        
        const  users= await db.user.findMany({
            take : (limit)? limit : 10 , 
            omit : (offset)? offset : 0,
            select : {id : true , username : true}
        });
        
        res.json(users);
    }catch(e){
        res.status(500).json({error : e.message})
    }
    
}

user_controller.delete_user = async (req, res) =>{
    try{
        const id = req.params.id;
        await db.user.delete({where : {id}})
        
        res.json({message : "user deleted successfully"});
    }catch(e){
        res.status(500).json({error : e.message})
    }
}

export default user_controller;