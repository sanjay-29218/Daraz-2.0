import Order from "../../../../models/Order"
import db from "../../../../utils/db";

const handler = async(req,res) =>{
    await db.connect();
    const order = await Order.findById(req.query.id);
    if(order){
        if(order.isPaid){
            return res.status(400).send({message:"Product is already paid"})
        }
        order.isPaid=true;
        order.paidAt=Date.now();
        order.paymentResult=req.body;
        const paidOrder = await order.save();
        await db.disconnect();
        res.send({message:"order paid Successfully",order:paidOrder});


    }else{
        await db.disconnect();
    }

}