import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Items = () => {
    const [allItems, setAllItems] = useState([]);

    const getAllItems = async () => {
        await axios.get('http://localhost:8000/api/items/get-all-items')
            .then(res => {
               // console.log('Data', res.data)
                setAllItems(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }
    useEffect(() => {
        getAllItems()
    }, [])
//console.log(allItems)
const deleteItem=async(_id)=>{
  // console.log(_id)
  await axios.post(`http://localhost:8000/api/items/deleteItems/${_id}`)
            .then(res => {
              getAllItems()
                //console.log(res.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

  return (
    <div className='table-responsive'>
      <table className='table table-bordered'>
        <thead>
          <tr>
            <th>SN</th>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {allItems &&
          allItems.map((item,idx)=>(
            <tr key={item._id}>
                <td>{idx+1}</td>
                <td>
                    <img src={item.image} alt='img' height={50}/>
                </td>
                <td>{item.name}</td>
                <td>{item.price}</td>
                <td>
                    <Link to={`/EditItem/${item._id}`}>
                <button className='btn btn-success'>Edit</button>
              </Link>
              <button className='btn btn-danger' onClick={()=>deleteItem(item._id)}>Delete</button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Items