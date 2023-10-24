import React from 'react'
import { useAuth } from './AuthProvider'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {
    let {user}=useAuth()
    if(!user){
        return  <Navigate to='/login' />
    }
  return (
    <div>
        {children}
    </div>
  )
}

export default ProtectedRoute