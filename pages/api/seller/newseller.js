import { getSession } from "next-auth/react";
import Seller from "../../../models/Seller";
import db from "../../../utils/db";

const handler = async (req,res) =>{
    const session = await getSession({req});
    if(!session){
        res.status(401).send('Unauthorized');
        return;
    }
    await db.connect();
    const newseller = await Seller({
        ...req.body,
        user:session.user._id,

    })
    const seller = await newseller.save();
    res.status(201).send(seller);
}
export default handler