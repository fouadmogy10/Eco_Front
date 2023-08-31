import React, { useEffect, useState } from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import Spinner from './Spinner';

function PrivateRoutes() {
  const user = JSON.parse(localStorage.getItem("user"))
      const [LoggedIn, setLoggedIn] = useState(false)
      const [checkStatus, setcheckStatus] = useState(true)

        useEffect(() => {
            if (user) {
                setLoggedIn(true)
                
              }else{
              setLoggedIn(false)
            }
            setcheckStatus(false)
          }, [user])    

    if (checkStatus) {
        return <Spinner/>
    }
  return LoggedIn ? <Outlet/> : <Navigate to={"/login"} />
}

export default PrivateRoutes
