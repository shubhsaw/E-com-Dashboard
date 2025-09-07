import React from 'react'
import style from './AddProduct.module.css'
import { useState } from 'react'
const AddProduct = () => {
  
  const[pname,setPname]=useState("");
  const[price,setPrice]=useState("");
  const[company,setCompany]=useState("")
  const[desc,setDesc]=useState("");
  const[rating,setRating]=useState("");
  const[addProduct,setAddproduct]=useState({});

  async function handleAddProduct(e){
    e.preventDefault();
    let data={
      name:pname,
      price:price,
      company:company,  
      desc:desc,
      rating:rating
    }
    setAddproduct(data);
    console.log(data);

    try{
      let result=await fetch("http://localhost:5000/AddProduct",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(data)
      });
      result=await result.json();
      console.log(result);
      
    }catch(err){
      console.log(err);
    }
    //reset form
    setPname("");
    setPrice("");
    setCompany("");
    setDesc("");
    setRating("");

  }

  return (
    <div id={style.addproduct}  >
      <div id={style.form_plate}>

        <div className={style.heading}>
          <h1>Add Product</h1>
        </div>

        <form action="" className={style.addproduct_form} onSubmit={handleAddProduct}>

        <label htmlFor="" className={style.label}>Product Name</label>
        <input className={style.inputbox} type="text" placeholder='Enter Product name' value={pname} onChange={(e)=>setPname(e.target.value)} required />    

        <label htmlFor="" className={style.label} >Price</label>
        <input className={style.inputbox} type="number" placeholder='Enter Price' value={price} onChange={(e)=>setPrice(e.target.value)} required />    
         
         <label htmlFor="" className={style.label}>Company Name</label>
        <input className={style.inputbox} type="text" placeholder='Enter Company name' value={company} onChange={(e)=>setCompany(e.target.value)} required />  
        
          <label htmlFor="" className={style.label}>Description</label>
        <textarea className={style.inputbox} style={{"height":"100px"}} type="text" value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder='Enter Description about product'  />  
         

         <label htmlFor="" className={style.label}>Rating</label>
        <select name=""  className={style.inputbox} value={rating} id="rating" onChange={(e)=>setRating(e.target.value)} required>
          <option value="">--Select--</option>
          <option value="1">1</option>
          <option value="2">2 </option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>

        <input className={style.inputbox}  type="submit" value={'Add Product'} />

        </form>
      </div>
      
    </div>
  )
}
//  name:String,
//     price:Number,
//     company:String,
//     desc:String,
//     rating:Number

export default AddProduct
