import { getSession } from "next-auth/react";
import Product from "../../../../../models/Product";
import db from "../../../../../utils/db";

const handler = async (req, res) => {
    const session = await getSession({ req });
    if (!session) {
        res.status(401).send("Unauthorized");
        return;
    }
    await db.connect();
    const product = await Product.deleteOne({ _id:req.query.id });
    await db.disconnect();
    res.send(product);
    }
export default handler;
