import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {type RootState } from './store/store'
import { useFormik } from 'formik';

const App = () => {
  const {data}=useSelector((store:RootState)=>store.todo)
  const Dispatch=useDispatch()
  const [idx,setidx]=useState(null)



const {handleChange,handleSubmit,values,setValues,resetForm} = useFormik({
     initialValues: {
       name:"",
       age:0,
       status:true,
       id:Date.now()
     },
     onSubmit: values=> {
       if(idx==null){
        
       }
       else{

       }
     },
   });


  return (
    <>







    </>
  )
}

export default App
