import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Registered = () => {
    const navigate=useNavigate();
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();
        const data={
            name:name,
            email:email,
            password:password
        }
        console.log(data);
        axios.post('http://localhost:8000/api/register',data)
        .then(res=>{
            console.log(res.Message)
            navigate('/signIn')
        })
        .catch(err=>console.log(err));
    };
    useEffect(()=>{
        if (localStorage.getItem('user')){
            navigate('/')
        }
    },[])

  return (
    <div>
        <form onSubmit={handleSubmit}>
        <div className='mb-3'>
                    <label htmlFor="name" className="form-label"> Name </label>
                    <input type="text" className="form-control" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                <div className='mb-3'>
                    <label htmlFor="exampleInputEmail1" className="form-label"> Email Address </label>
                    <input type="email" className="form-control" id="exampleInputEmail1" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <div className="mb-3">
                {/* <p>Already have an account? <a href="/login">Sign In</a></p> */}
                <p>Don't have an account? <a href="/signup">Sign Up</a></p>
            </div>
    </div>
  )
}

export default Registered