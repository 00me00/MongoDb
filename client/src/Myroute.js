import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CartList from './pages/CartList'
import EditItem from './components/EditItem'
import Items from './pages/Items'
import SignIn from './pages/SignIn'
import Registered from './pages/Registered'
import ChargeBill from './pages/ChargeBill'
import Bills from './pages/Bills'
import Customers from './pages/Customers'

const Myroute = () => {
  return (
   <>
   <Routes>
        <Route path='/' element={<ProtectedRoute> <HomePage/> </ProtectedRoute> } />
        <Route path='/cart' element={<ProtectedRoute> <CartList/> </ProtectedRoute>}/>
        <Route path='/EditItem/:_id' element={<ProtectedRoute> <EditItem/> </ProtectedRoute>}/>
        <Route path='/items' element={<ProtectedRoute> <Items/> </ProtectedRoute>}/>
        <Route path='/signIn' element={<SignIn/>}/>
        <Route path='/signUp' element={<Registered/>}/>
        <Route path='/chargebill' element={<ProtectedRoute> <ChargeBill/> </ProtectedRoute>}/>
        <Route path='/bill' element={<ProtectedRoute> <Bills/> </ProtectedRoute>}/>
        <Route path='/customer' element={<ProtectedRoute> <Customers/> </ProtectedRoute>}/>
    </Routes>
   </>
    
  
  )
}

export default Myroute

export function ProtectedRoute ({children}){
  if(localStorage.getItem('user')){
    return children
  }
  else return <Navigate to='/signIn'/>
}