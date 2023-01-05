import { getSession } from 'next-auth/react'
import Order from '../../../models/Order';
import User from '../../../models/User';
import db from '../../../utils/db';

const handler = async(req,res) => {
    console.log(req);
    const session = await getSession({ req });
    if (!session) {
        res.status(401).send('Unauthorized');
        return;
    }
    const user = await User.findOne({email:session.user.email});
    console.log(user);
    await db.connect();
    const newOrder = new Order({
        ...req.body,
        user:user._id,
        // user: user.email,
    });
    const order = await newOrder.save();
    res.status(201).send(order);

}
export default handler