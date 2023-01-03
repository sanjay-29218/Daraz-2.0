import Rating from "../../../../models/Rating";
import db from "../../../../utils/db";
import { getSession } from "next-auth/react";
import Product from "../../../../models/Product";

const handler = async (req, res) => {
  const session = await getSession({ req });
 
  if (!session) {
    return res.status(401).send({ message: "signin Required" });
  }
  await db.connect();
  const product = await Product.findById(req.body.productid);
    if (product) {
        // product.rating = req.body.rating;
        // const updatedproduct = await product.save();
        await db.disconnect();
        res.status(201).send(product);
        return;
        }


};
export default handler;
