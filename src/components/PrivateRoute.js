import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
  const token = localStorage.getItem("token")

  return (
    <div>
        {token ? <Outlet /> : <Navigate to={"/profile"} />}
    </div>
  )
}

export default PrivateRoute