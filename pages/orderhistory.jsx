import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Navbardetail from "../components/Navbardetail";

const orderhistory = () => {
  const [stores, setStores] = useState([]);
  const [orders, setOrders] = useState([]);

  function handleStore(data) {
    let storeCount = {};
    let uniqueStore = [];
    data.orderItems.filter((item) =>
      uniqueStore.includes(item.store)
        ? storeCount[item.store]++
        : ((storeCount[item.store] = 1), uniqueStore.push(item.store))
    );
    return storeCount;
  }

  const getOrder = async () => {
    const res = await axios.get("/api/orders/history");
    const { data } = res;
    console.log(data);
    setOrders(data);
  };
  useEffect(() => {
    getOrder();
  }, []);

  return (
    <div>
      <Navbardetail/>
      {orders.length > 0 ? (
        <div>
            <table className="min-w-full">
          <thead className="border-b">
              <tr>
                <th className="px-5 text-left">ID</th>
                <th className="p-5 text-left">DATE</th>
                <th className="p-5 text-left">TOTAL</th>
                <th className="p-5 text-left">PAID</th>
                <th className="p-5 text-left">DELIVERED</th>
                <th className="p-5 text-left">ACTION</th>
              </tr>
            </thead>
            <tbody>
            {orders.map((order) => (
                
                <tr key={order._id} className="border-b">
                <td className=" p-5 ">{order._id.substring(20, 24)}</td>
                <td className=" p-5 ">{order.createdAt.substring(0, 10)}</td>
                <td className=" p-5 ">${order.totalPrice}</td>
                <td className=" p-5 ">
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
                  <Link href={`/order/${order._id}`} passHref>
                    <div>Details</div>
                  </Link>
                </td>
              </tr>
                
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>No orders</div>
      )}
    </div>
  );
};

export default orderhistory;
