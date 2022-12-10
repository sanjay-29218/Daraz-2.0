import React from 'react'
import {AiOutlineHome} from 'react-icons/ai'
import {BiCategory} from 'react-icons/bi'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {RiAccountCircleLine} from 'react-icons/ri'
type Props = {}

const Footer = (props: Props) => {
  return (
    <div className=' md:hidden bg-white flex fixed bottom-0 h-[3rem] shadow-inner  w-screen justify-around text-[2rem]  items-center'>
            <AiOutlineHome className='btn-shadow'/>
            <BiCategory className='btn-shadow'/>
            <AiOutlineShoppingCart className='btn-shadow'/>
            <RiAccountCircleLine className='btn-shadow'/>
    </div>
  )
}
export default Footer