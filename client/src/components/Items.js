import React, {  useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { add, remove } from '../store/cardSlice'

const Items = ({ item }) => {
  const dispatch = useDispatch()
  const cartList = useSelector(state => state.cartState.cartList)
  // console.log("cartlist",cartList)
  const [isinCart, setisinCart] = useState(false)
  const { _id, name, image, price } = item
  useEffect(() => {
    const productInCart = cartList.find(product => product._id === _id)
    // console.log(productInCart)
    if (productInCart) {
      setisinCart(true)
    }
    else {
      setisinCart(false)
    }
  }, [_id, cartList])

  return (
    <>
      <div className='col-md-3 mb-3'>
        <div className="card p-3">
          <img src={image} className="card-img-top" alt="..." style={{ height: '5rem', width: '5rem' }} />
          <div className="card-body">
            <h5 className="card-title"> {name} </h5>
            <h6> Price:{price} </h6>
            {
              isinCart ? (
                <button className='btn btn-danger' onClick={() => dispatch(remove(item))}>Remove</button>
              ) : (
                <button className='btn btn-primary' onClick={() => dispatch(add(item))}>Add</button>)}

            {/* <button className="btn btn-primary"> Add to Cart </button> */}
          </div>
        </div>
      </div>
    </>
  )
}

export default Items