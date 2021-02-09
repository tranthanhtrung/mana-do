import React from 'react'
import { Redirect } from "react-router-dom";

const PrivateComponent = ({children} : {children: JSX.Element}) => {
  const token = localStorage.getItem('token')
  return (
    <>
      {token && token.length > 0 ?
        children :
        <Redirect to="/"/>
      }
    </>
  )
}

export default PrivateComponent