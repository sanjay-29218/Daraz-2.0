import { getSession } from "next-auth/react";
import Order from "../../../../models/Order"
import db from "../../../../utils/db";

const handler = async(req,res) =>{
    const session = await getSession({req});
    if(!session){
        res.status(401).send("Unauthorized");
        return;
    }

    await db.connect();
    const order = await Order.findById(req.query.id);
    console.log(order)
    if(order){
        if(order.isPaid){
            return res.status(400).send({message:"Product is already paid"})
        }
        order.isPaid=true;
        order.paidAt=Date.now();
        order.paymentResult={
            id:req.body.id,
            mobile:req.body.mobile,
            token:req.body.token,
            amount:req.body.amount,
            widget_id:req.body.widget_id,
        };
        const paidOrder = await order.save();
        await db.disconnect();
        try{
            res.send({message:"order paid Successfully",order:paidOrder});
        }catch(err){
            console.log(err)
        }
    }else{
        await db.disconnect();
    }

}
export default handler;