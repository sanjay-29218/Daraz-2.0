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
  
    const rating = await Rating.findById(req.body.ratingid);

    if (rating) {
      rating.rating = req.body.rating;
      const updatedrating = await rating.save();
      await db.disconnect();
      res.status(201).send(updatedrating);
      return;
    }
};
export default handler;
