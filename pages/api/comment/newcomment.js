import Rating from "../../../models/Rating";
import db from "../../../utils/db";
import { getSession } from "next-auth/react";
import Product from "../../../models/Product";
import Comment from "../../../models/Comment";
import User from "../../../models/User";
const handler= async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
        return res.status(401).send({ message: "signin Required" });
    }
    await db.connect();
    const user = User.findById(req.body.userid)
    const comment = new Comment({
        user:req.body.userid,
        product:req.body.productid,
        comment:req.body.comment,
      });
    const newcomment = await comment.save();
    await db.disconnect();
    res.status(201).send(newcomment);
    
}
export default handler;