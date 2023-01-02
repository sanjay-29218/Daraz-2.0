import { getSession } from "next-auth/react";
import Product from "../../../models/Product";
import db from "../../../utils/db";

const handler = async(req,res) =>{
    const session = await getSession({req});
    
    if(!session){
        res.status(401).send('Unauthorized');
        return;
    }
    await db.connect();
    const product = new Product({
        ...req.body,
        user:session.user._id,

    })
    const newproduct = await product.save();
    db.disconnect();
    res.status(201).send(newproduct);
}
export default handler