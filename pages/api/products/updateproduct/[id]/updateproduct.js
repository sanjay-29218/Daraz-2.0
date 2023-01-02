import { getSession } from "next-auth/react";
import Product from "../../../../../models/Product";
import db from "../../../../../utils/db";

const handler = async(req,res) =>{
    const session = await getSession({req});
    
    if(!session){
        res.status(401).send('Unauthorized');
        return;
    }
    await db.connect();
    const product = await Product.findById(req.query.id);
    if(product){
        product.name = req.body.name;
        product.price = req.body.price;
        product.image = req.body.image;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.countInStock = req.body.countInStock;
        product.description = req.body.description;
        const updatedProduct = await product.save();
        await db.disconnect();
        res.status(201).send(updatedProduct);
        return;
    }
}
export default handler