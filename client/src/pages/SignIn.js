// import React from 'react'

// const SignIn = () => {
//     return (
//         <>
//             <form>
//                 <div className='mb-3'>
//                     <label for="exampleInputEmail1" className="form-label"> Email Address </label>
//                     <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"></input>
//                     <div class="mb-3">
//                         <label for="exampleInputPassword1" className="form-label">Password</label>
//                         <input type="password" className="form-control" id="exampleInputPassword1" />
//                     </div>
//                     <div class="mb-3 form-check">
//                         <input type="checkbox" className="form-check-input" id="exampleCheck1" />
//                         <label className="form-check-label" for="exampleCheck1">Check me out</label>
//                     </div>
//                     <button type="submit" className="btn btn-primary">Submit</button>
//                 </div>
//             </form>
//         </>
//     )
// }

// export default SignIn

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignIn = () => { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate()
 
    const handleSubmit = (event) => {
        event.preventDefault(); 
        const data={
            email:email,
            password:password
        }
        console.log(data) 
        axios.post('http://localhost:8000/api/signIn',data) 
        .then((res)=>{ 
            // console.log(res)
            localStorage.setItem('user',JSON.stringify(res.data.user))
            navigate('/')
        })
        .catch((err)=>console.log(err))
    };
    useEffect(()=>{
        if (localStorage.getItem('user')){
            navigate('/')
        }
    },[])

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="exampleInputEmail1" className="form-label"> Email Address </label>
                    <input type="email" className="form-control" id="exampleInputEmail1"  value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                
            </form>
            <div className="mb-3">
                <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </div>
        </>
    );
};

export default SignIn;
