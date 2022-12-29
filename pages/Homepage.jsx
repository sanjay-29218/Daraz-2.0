import Main from '../components/Main'
import Head from 'next/head'
import React from 'react'
import Footer from '../components/Footer'
import Sidebar from '../components/Sidebar'
import Navbardetail from '../components/Navbardetail'
import Navbar from '../components/Navbar'
import "react-toastify/dist/ReactToastify.css";
const Homepage = (props) => {
  
  return (
    <>
      <Head>
        <title>Daraz</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    <div className=' w-screen  bg-[#F5F5F5]'>
      <Navbardetail/>
      
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