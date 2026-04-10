import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {type RootState } from './store/store'
import { adduser, deleteuser } from './store/counterSlice'
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
         Dispatch(adduser(values))
         resetForm()
       }
       else{



       }
     },
   });




  return (
    <>





<form onSubmit={handleSubmit} className="w-[80%] m-auto mt-[30px] flex gap-[20px]">
        <input
          className="border p-2"
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          placeholder="Name..."
        />
        <input
          className="border p-2"
          type="number"
          name="age"
          value={values.age}
          onChange={handleChange}
          placeholder="Age..."
        />
        <button type="submit" className="bg-black text-white px-4 py-2 rounded">
          Save
        </button>
      </form>



    


      <table className="w-[80%] mt-[40px] m-auto border border-collapse">
        <thead>
          <tr>
            <th className="border w-[100px] p-2">Checkbox</th>
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Age</th>
            <th className="border p-2">Status</th>
            <th className="border w-[300px] p-2">Action</th>
          </tr>
        </thead>

        <tbody>
          {data.map((e) => (
            <tr key={e.id}>
              <td className="border p-2 text-center">
                <input type="checkbox" />
              </td>
              <td className="border p-2 text-center">{e.id}</td>
              <td className="border p-2 text-center">{e.name}</td>
              <td className="border p-2 text-center">{e.age}</td>
              <td className="border p-2 text-center">
                {e.status ? "Active" : "Inactive"}
              </td>
              <td className="border p-2 flex gap-[30px] justify-center text-center w-[300px]">
                <button className="bg-blue-500 text-white px-3 py-1 rounded">
                  Edit
                </button>
                <button className="bg-green-500 text-white px-3 py-1 rounded">
                  Info
                </button>
                <button onClick={()=>Dispatch(deleteuser(e.id))} className="bg-red-500 text-white px-3 py-1 rounded">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>





    </>
  )
}

export default App
