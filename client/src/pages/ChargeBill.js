import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const ChargeBill = () => {
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [mode, setMode] = useState('');
    const navigate=useNavigate()

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

    const handleSubmit=(e)=>{
        e.preventDefault();
        console.log(name,phoneNumber,mode)
        if(name&& phoneNumber&& mode){
            let data={
                name, 
                phoneNumber,
                mode,
                subTotal,
                tax:Number((subTotal*0.1).toFixed(2)),
                totalAmount:Number((subTotal+(subTotal*0.1)).toFixed(2)),
                user:JSON.parse(localStorage.getItem('user')).name,
                cartList:products
            }
            console.log(data)
            axios.post('http://localhost:8000/api/bills/charge-bill',data)
            .then((res)=>{
                console.log(res)
                localStorage.removeItem('cart')
                navigate('/')
            })
            .catch(err=>console.log(err))
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="name" className="form-label"> Customer Name </label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className='mb-3'>
                    <label htmlFor="phone" className="form-label"> Phone Number </label>
                    <input type="number" className="form-control" id="phone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
                <select className="form-select" aria-label="Default select example"  value={mode} onChange={(e)=> setMode(e.target.value)}>
                    <option value=""> Choose any Mode</option>
                    <option value="cash"> Cash </option>
                    <option value="card"> Card </option>
                </select>
                {
                    subTotal && subTotal>0 &&
                    <div className=''>
                    <h5>Sub-Total= ${subTotal}</h5>
                    <h5> TAX: ${(subTotal*0.1).toFixed(2)} </h5>
                    <h3> Grand Total: ${(subTotal+(subTotal*0.1)).toFixed(2)} </h3>
                </div>
                }
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default ChargeBill