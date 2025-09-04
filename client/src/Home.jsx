import React from 'react'
// import Link from 'react-router-dom'
import {BrowserRouter, Route, Routes, Link, useNavigate} from 'react-router-dom'
import './App.css'
const Home = () => {
  const auth=localStorage.getItem('user')

  function logout(){
    let log=confirm("Are you sure you want to logout?");
    if(log){
    localStorage.clear();
    window.location.reload();
  }
  }
  return (
    <>

        <div id='dashboard'>
        <Link to="/Product">Product</Link>
        <Link to="/AddProduct">Add Product</Link>
        <Link to="/UpdateProduct">Update Product</Link>
        
        <Link to="/Profile">Profile</Link>
        {auth?<Link onClick={logout} to="/signup">Log out</Link>: <Link to="/Signup">Sign-Up</Link>}
        </div>
      <h1>Landing Page / Home </h1>
    </>
  )
}

export default Home
