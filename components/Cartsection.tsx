import React from 'react'
import { BsFillChatRightTextFill } from 'react-icons/bs'
import { FaStore } from 'react-icons/fa'
type Props = {}

const Cartsection = (props: Props) => {
  return (
    <div className='flex fixed bottom-0  bg-white  w-screen  h-[3rem]  '>
       <div className='flex items-center text-[#F57224] '>
       <div className='px-4 text-lg '>
        <FaStore/>
        <small>Store</small>
        </div>
        <div className='px-4 text-lg'>
        <BsFillChatRightTextFill/>
        <small>Chat</small>
        </div>
       </div>
        <div className='flex grow'>
        <div className='bg-gradient-to-r font-bold text-white  from-cyan-500 to-blue-500 grow-[2] p-2 -skew-x-12'>Buy Now</div>
        <div className='bg-gradient-to-r font-bold text-white from-[#F57224] to-red-500 p-2 grow-[2] -skew-x-12'>Add to Cart</div>
        </div>
    </div>
  )
}

export default Cartsection