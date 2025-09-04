import React from 'react'
// import Link from 'react-router-dom'
import {BrowserRouter, Route, Routes, Link} from 'react-router-dom'
import './App.css'
const Home = () => {
  const auth=localStorage.getItem('user')
  return (
    <>

        <div id='dashboard'>
        <Link to="/Product">Product</Link>
        <Link to="/AddProduct">Add Product</Link>
        <Link to="/UpdateProduct">Update Product</Link>
        
        <Link to="/Profile">Profile</Link>
        {auth?<Link to="/Logout">Log out</Link>: <Link to="/Signup">Sign-Up</Link>}
        </div>
      <h1>Landing Page / Home </h1>
    </>
  )
}

export default Home
