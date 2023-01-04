import { useRouter } from 'next/router';
import Link from 'next/link'
import React from 'react'

const Unauthorized = () => {
    const {query} = useRouter();

  return (
    <div className='flex flex-col'>
        <h1>Unauthorized</h1>
        {query.message}
        <Link href={'/Login'}><button className='btn'>Login</button></Link>
    </div>
  )
}

export default Unauthorized