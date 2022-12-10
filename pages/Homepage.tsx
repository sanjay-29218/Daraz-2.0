import Main from '../components/Main'
import Head from 'next/head'
import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
type Props = {}

const Homepage = (props: Props) => {
  

  return (
    <>
      <Head>
        <title>Daraz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className=' w-screen  bg-[#F5F5F5]'>
      <header>
      <Navbar/>
      </header>
      <main>
        <Main/>
      </main>
      <section>
        <Sidebar/>
      </section>
      <footer className=' '>
        <Footer/>
      </footer>
      </div>    
    </>
  )
}
export default Homepage