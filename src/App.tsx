import React, { useState } from 'react'
import { usecrad, type IUser } from './store/Crad'
import { useFormik } from 'formik';

const App = () => {
const [idx,setidx]=useState<null | number>(null)

  let data=usecrad((state:any)=>state.data)
  let adduser=usecrad((state:any)=>state.adduser)
  let edituser=usecrad((state:any)=>state.edituser)
  let deleteuser=usecrad((state:any)=>state.deleteuser)

const {handleChange,handleSubmit,values,setValues,resetForm} = useFormik({
     initialValues: {
       name: "",
       age:0,
       status:true,
       id:Date.now()
     },
     onSubmit: values => {
        if(idx){
         edituser({
          name:values.name,
          age:values.age,
          status:false,
          id:idx
         })
         resetForm()
        }
        else{
          adduser({...values})
          resetForm()
        }
     },
   });



  return (
    <>


<div className='w-[80%] m-auto mt-5'>

<form onSubmit={handleSubmit} action="" className='w-[30%] my-[40px] flex flex-col gap-[20px]  border rounded-3xl bg-gray-500 p-[10px]'>
<input  type="text"  className='bg-gray-300 p-[10px] rounded-2xl' placeholder='Name...' name='name' value={values.name} onChange={handleChange} />
<input type="text" className='bg-gray-300 p-[10px] rounded-2xl' placeholder='Age...' name='age' value={values.age} onChange={handleChange} />
<button  className='bg-blue-500 text-white p-[10px] rounded-2xl' type='submit'>Save</button>
</form>




<table className="w-full border border-gray-300 text-center">
  <thead className="bg-gray-100">
    <tr>
      <th className="border w-[100px] p-2"><input type="checkbox" /></th>
      <th className="border p-2">ID</th>
      <th className="border p-2">Name</th>
      <th className="border p-2">Age</th>
      <th className="border p-2">Status</th>
      <th className="border p-2">Actions</th>
    </tr>
  </thead>

  <tbody>
    {data.map((e: IUser) => (
      <tr key={e.id} className="hover:bg-gray-50">
        <td className="border p-2">
          <input onChange={()=> edituser({...e,status:!e.status})} checked={e.status} type="checkbox" />
        </td>

        <td className="border p-2">{e.id}</td>
        <td className="border p-2">{e.name}</td>
        <td className="border p-2">{e.age}</td>
        <td className="border p-2">
          {e.status ? <div className='bg-[#7ce37c] rounded-2xl w-[100px] m-auto text-white'>Active</div> : <div className='bg-[#f47a7a] m-auto rounded-2xl w-[100px] text-white'>Inactive</div>}
        </td>

        <td className="border p-2  w-[300px] space-x-2">
          <button onClick={()=>{
            setidx(e.id)
            setValues(e)
          }} className="bg-yellow-400 px-3 py-1 rounded text-white">
            Edit
          </button>
          <button onClick={()=>deleteuser(e.id)} className="bg-red-500 px-3 py-1 rounded text-white">
            Delete
          </button>
          <button className="bg-blue-500 px-3 py-1 rounded text-white">
            Info
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>



</div>



    </>
  )
}

export default App
