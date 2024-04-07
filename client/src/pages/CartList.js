import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; 
import Carts from '../components/Carts';
import { Link } from 'react-router-dom';

const CartList = () => {
    const products = useSelector(state => state.cartState.cartList);
    // const total = products.reduce((tot, product) => tot + (product.price * product.quantity), 0);

    const [subTotal,setSubTotal]=useState(0)
    useEffect(()=>{
        let temp=0
        products.forEach((item)=>{
            temp=temp+(item.price*item.quantity)
        })
        setSubTotal(temp)
    },[products])
    console.log(subTotal)

    return (
        <div className='table-responsive'>
            <table className='table table-bordered'>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, idx) => (
                        <Carts key={product._id} idx={idx} product={product} />
                    ))}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="5" className="text-right">Total Price:</td>
                        <td> ${subTotal}</td>
                    </tr>
                </tfoot>
            </table>
           {
            products && products.length>0 &&
            <Link to='/chargebill' className='btn btn-warning'> Charge Bill </Link>
           }
        </div>
    );
}

export default CartList;
