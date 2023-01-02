import axios from "axios";
import { getSession } from "next-auth/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Navbardetail from "../components/Navbardetail";
import Seller from "../models/Seller";
import db from "../utils/db";

const sellerorder = ({ store }) => {
  const [stores, setStores] = useState([]);
  const [orders, setOrders] = useState([]);

  const getOrder = async () => {
    const res = await axios.get("/api/orders/sellerorder");
    const { data } = res;
    console.log(data);
    setOrders(data);
  };
  useEffect(() => {
    getOrder();
  }, []);

  return (
    <div>
    <Navbardetail isHome/>
    {orders.length > 0 ? (
      <div className="text-sm">
          <table className="min-w-full">
        <thead className="border-b">
            <tr>
              <th className="md:px-5 text-left">ID</th>
              <th className="md:p-5 text-left">DATE</th>
              <th className="md:p-5 text-left">TOTAL</th>
              <th className="md:p-5 text-left">PAID</th>
              <th className="md:p-5 text-left">DELIVERED</th>
              <th className="md:p-5 text-left">ACTION</th>
            </tr>
          </thead>
          <tbody>
          {orders.map((order) => (
            order.orderItems.map((item) => {
              if (item.store === store.store) {
                return (
                  <tr key={order._id} className="border-b">
                  <td className=" md:p-5 ">{order._id.substring(20, 24)}</td>
                  <td className=" md:p-5 ">{order.createdAt.substring(0, 10)}</td>
                  <td className=" md:p-5 ">${item.price}</td>
                  <td className=" md:p-5 ">
                    {order.isPaid
                      ? `${order.paidAt.substring(0, 10)}`
                      : 'not paid'}
                  </td>
                  <td className=" p-5 ">
                    {order.isDelivered
                      ? `${order.deliveredAt.substring(0, 10)}`
                      : 'not delivered'}
                  </td>
                  <td className=" p-5 ">
                    <Link href={`/sellerorder/${order._id}`}>
                      <div className="text-blue-500">Details</div>
                    </Link>
                  </td>
                </tr>
                )
              } 
             
              
            })))}
          </tbody>
        </table>
      </div>
    ) : (
      <div>No orders</div>
    )}
  </div>
  );
};

export default sellerorder;
sellerorder.auth = true;
export async function getServerSideProps(context) {
  const session = await getSession(context);
  const user = session?.user;
  await db.connect();
  const store = await Seller.findOne({ user: user._id }).lean();

  await db.disconnect();

  return {
    props: {
      store: store ? db.convertDocToObj(store) : null,
    },
  };
}
