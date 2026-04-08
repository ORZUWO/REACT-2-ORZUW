import React, { createContext, useState } from 'react'
import Card1 from './Card1'

export const Mycontext=createContext(0)

const App = () => {


  let [state,setstate]=useState(0)


  return (
    <>
    <Mycontext value={state}>

      <button onClick={()=>setstate(state+1)}>+</button> 
          
      <Card1 />

      </Mycontext>  

    </>
  )
}

export default App
  