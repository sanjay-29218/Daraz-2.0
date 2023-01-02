import User from '../../../models/User';
import db from '../../../utils/db';
import bycryptjs from 'bcryptjs';
async function handler(req,res){

    if(req.method!=='POST'){
        return
    }
    const {email,name,password}=req.body;
    if(!email||!email.includes('@')||!name||name.trim()===''||!password||password.trim().length<7){
        res.status(422).json({message:'Invalid input.'});
        return;
    }
    await db.connect();
    const existingUser = await User.findOne({email:email
    });
    if(existingUser){
        res.status(422).json({message:'User exists already!'});
        await db.disconnect();
        return;
    }
    const hashedPassword = await bycryptjs.hash(password,12);
    const user = new User({
        email:email,
        name:name,
        password:hashedPassword,
        isAdmin:false,
    });
    const result = await user.save();
    await db.disconnect();
    res.status(201).json({message:'Created user!'});

}
export default handler;