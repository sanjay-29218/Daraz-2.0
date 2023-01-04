import Rating from "../../../models/Rating";
import db from "../../../utils/db";
import { getSession } from "next-auth/react";
import Product from "../../../models/Product";

const handler = async (req, res) => {
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).send({ message: "signin Required" });
  }
  await db.connect();
  
    const allrating = await Rating.find({product:req.body.productid});
    const product = await Product.findById(req.body.productid);
    if(allrating.length>0){
      let sum = 0;
      allrating.map((item)=>{
        sum = sum + item.rating;
      })
      product.rating = sum/allrating.length;
      product.numReviews = allrating.length;
      const updatedrating = await product.save();
      await db.disconnect();
      res.status(201).send(updatedrating);
      return;
    }
  
};
export default handler;
