import React, { useContext } from 'react'
import { Mycontext } from './App'

const Card1 = () => {
    let state=useContext(Mycontext)
  return (
    <>
     {state} 
    </>
  )
}

export default Card1
