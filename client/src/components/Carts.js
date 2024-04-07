import React from 'react'
import { remove, updateQuantity } from '../store/cardSlice'
import { useDispatch } from 'react-redux'
// import { Link } from 'react-router-dom'

const Carts = ({product,idx}) => {
    const dispatch=useDispatch()
    const sub=()=>{
        if (product.quantity>1){
          dispatch(updateQuantity({id:product._id,qty:product.quantity-1}))
        }
       }
       const add=()=>{
        dispatch(updateQuantity({id:product._id,qty:product.quantity+1}))
       }
    
  return (
    <>
      <tr >
              <td>{idx+1}</td>
              <td ><img style={{height:"80px"}} src={product.image} alt='i'></img></td>
              <td>{product.name}</td>
              <td>${product.price}</td>
              <td>
                <button onClick={sub}>-</button>
                <span>{product.quantity}</span>
                <button onClick={add}>+</button>
              </td>
              <td>
                <p className='btn btn-danger' onClick={() => dispatch(remove(product))}>Delete</p>
              {/* <Link to={`/EditItem/${product._id}`}>
                <p className='btn btn-success'>Edit</p>
              </Link> */}
              </td>
            </tr>
            
    </>
  )
}

export default Carts