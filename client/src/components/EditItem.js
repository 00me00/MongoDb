import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const EditItem = () => {
  const [name,setName]=useState('');
  const [price,setPrice]=useState('');
  const [image,setImage]=useState('');
  const [category,setCategory]=useState('');
  const {_id}=useParams()
  const navigate=useNavigate()
  useEffect(()=>{
    if(_id){
       axios.get(`http://localhost:8000/api/items/edit/${_id}`)
      .then(res => {
          setName(res.data.name)
          setPrice(res.data.price)
          setImage(res.data.image)
          setCategory(res.data.category)
      })
      .catch(error => {
          console.log(error)
      })
}
    }
  ,[_id])

  const updateForm=async(e)=>{
    e.preventDefault()
    const data={
      id:_id,
      name:name,
      price:Number(price),
      image:image,
      category:category
    }
    await axios.post(`http://localhost:8000/api/items/update`,data)
    .then(res=>{
      console.log(res.data)
      navigate('/items')
    })
    .catch(err=>console.log(err))
  }

  return (
    <>
    <form className='w-50 m-auto border mt-2' onSubmit={updateForm}>
      <h4 className='text-center'>edit form</h4>
      <div className='mb-3 form-floating w-75 m-auto'>
        <input type='text' className='form-control' placeholder='' onChange={(e)=>setName(e.target.value)} value={name||""}/>
        <label>Name</label>
      </div>
      <div className='mb-3 form-floating  w-75 m-auto'>
        <input type='text' className='form-control' placeholder='' onChange={(e)=>setPrice(e.target.value)} value={price||""}/>
        <label>Price</label>
      </div>
      <div className='mb-3 form-floating  w-75 m-auto'>
        <input type='text' className='form-control' placeholder='' onChange={(e)=>setImage(e.target.value)} value={image||""}/>
        <label>Image</label>
      </div>
      <div className='mb-3 input-group w-75 m-auto'>
         <label className='input-group-text'> Category : </label>
         <select className='form-select' onChange={(e)=>setCategory(e.target.value)} value={category||""}>
          <option>Fruits</option>
          <option>Vegetables</option>
          <option>Meat</option>
         </select>
      </div>
      <input type='submit' className='btn btn-primary m-2' value='Update'/>
    </form>
    </>
  )
}

export default EditItem