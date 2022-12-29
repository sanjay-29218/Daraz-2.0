import React from 'react'
import {AiOutlineHome} from 'react-icons/ai'
import {BiCategory} from 'react-icons/bi'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import {RiAccountCircleLine} from 'react-icons/ri'
import Link from 'next/link'
type Props = {}

const Footer = (props: Props) => {
  return (
    <div className=' md:hidden  bg-white flex fixed bottom-0 h-[3rem] z-50 shadow-inner  w-screen justify-around text-[2rem]  items-center'>
            <Link href={'/'}><AiOutlineHome className='btn-shadow'/></Link>
            <Link href={'/Category'}><BiCategory className='btn-shadow'/></Link>
            <Link href={'/Cart'}><AiOutlineShoppingCart className='btn-shadow'/></Link>
            <Link href={'/me'}><RiAccountCircleLine className='btn-shadow'/></Link>
    </div>
  )
}
export default Footer