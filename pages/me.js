import React from 'react'
import Navbardetail from '../components/Navbardetail'
import User from '../models/User'
import db from '../utils/db'
import { getSession } from 'next-auth/react'
import Link from 'next/link'
import Footer from '../components/Footer'
const Me = ({user}) => {
  return (
    <div className='h-screen bg-slate-50'>
        <Navbardetail isTrue/>
       <div className='p-3 flex gap-3 flex-col items-center  justify-center'>
        <img src={user?.image} className="rounded-full w-[5rem]" alt="" />
        <p>{user?.name}</p>
        <p>{user?.email}</p>
        <p><Link className='btn' href={'/orderhistory'}>Order history</Link> </p>
       </div>
       <Footer/>
    </div> 

  )
}


export default Me
export async function getServerSideProps(context)  {
  const session = await getSession(context);
  await db.connect();
  const user = await User.findOne({ email: session.user.email }).lean();
  await db.disconnect()
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return {
    props:{
        user:user?db.convertDocToObj(user):null,
    }
  };
}