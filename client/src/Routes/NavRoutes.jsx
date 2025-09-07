import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Product from './Products'
// import AddProduct from './AddProduct'
import UpdateProduct from './UpdateProduct'

import Profile from './Profile'
import Home from '../Home'
import Signup from './Signup'
import PrivateComponent from './PrivateComponent'
import Login from './Login/Login'
import AddProduct from './Add product/AddProduct'
const NavRoutes = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
        //Private Component
        <Route element={<PrivateComponent/>}>
        <Route path='/'element={<Home/>}/>
        <Route path='/Product' element={<Product/>}/>
        <Route path="/AddProduct" element={<AddProduct/>}/>
        <Route path="/UpdateProduct" element={<UpdateProduct/>}/>
        <Route path="/" element={<Home/>} />
        <Route path="/Profile" element={<Profile/>}/>
        </Route>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>

    </Routes>
    </BrowserRouter>
    </>
  )
}

export default NavRoutes
