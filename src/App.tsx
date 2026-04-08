import { useFormik } from 'formik';
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
const App = () => {
  const [open, setOpen] = useState(false)
  const [idx,setidx]=useState(null)
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    }

const [data, setData] = useState([
  { id: 1, name: "Ali", age: 20, status: true },
  { id: 2, name: "Vali", age: 25, status: false },
  { id: 3, name: "Said", age: 18, status: true },
  { id: 4, name: "Jamshed", age: 30, status: false },
  { id: 5, name: "Farhod", age: 22, status: true },
  { id: 6, name: "Rustam", age: 28, status: false },
  { id: 7, name: "Dilshod", age: 19, status: true },
  { id: 8, name: "Kamol", age: 35, status: false }
]);


const {handleChange,handleSubmit,values,setValues,resetForm} = useFormik({
     initialValues: {
      name:"",
      age:"",
      status:true,
     },
     onSubmit: values => {
      if(idx==null){
        setData([...data,{id:Date.now(),...values}])
        handleClose()
      }
      else{
        setData(
          data.map((e)=>e.id==idx?{...e,...values}:e)
        )
        handleClose()
      }
      resetForm()
     },
   });

  return (
    <>





<div className="min-h-screen bg-gray-100 p-6">
  <div className="mx-auto max-w-7xl rounded-3xl bg-white shadow-xl border border-gray-200 overflow-hidden">
    
    <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-slate-900 to-slate-700">
      <div>
        <h2 className="text-2xl font-bold text-white">Users Table</h2>
      </div>





<Button variant="contained" onClick={() => handleClickOpen()}>
        Add User
      </Button>

    </div>

    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50">
          <tr className="text-left text-sm text-gray-500">
            <th className="px-6 py-4">
              <input type="checkbox" className="w-4 h-4 accent-slate-700" />
            </th>
            <th className="px-6 py-4 font-semibold">ID</th>
            <th className="px-6 py-4 font-semibold">Name</th>
            <th className="px-6 py-4 font-semibold">Age</th>
            <th className="px-6 py-4 font-semibold">Status</th>
            <th className="px-6 py-4 font-semibold text-center">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-100">
          {data.map((e) => (
            <tr key={e.id} className="hover:bg-slate-50 transition duration-200">
              <td className="px-6 py-4">
                <input type="checkbox" className="w-4 h-4 accent-slate-700" />
              </td>

              <td className="px-6 py-4">
                <span className="text-sm font-semibold text-gray-700">{e.id}</span>
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-700">
                    {e.name[0]}
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-800">{e.name}</h3>
                    <p className="text-xs text-gray-500">user{e.id}@gmail.com</p>
                  </div>
                </div>
              </td>

              <td className="px-6 py-4 text-sm font-medium text-gray-700">
                {e.age} years
              </td>

              <td className="px-6 py-4">
                {e.status ? (
                  <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                    Active
                  </span>
                ) : (
                  <span className="inline-flex items-center rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                    Inactive
                  </span>
                )}
              </td>

              <td className="px-6 py-4">
                <div className="flex items-center justify-center gap-2">
                  <button className="rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-600 transition">
                    Delete
                  </button>

                  <button onClick={()=>{
                    setValues(e)
                    setidx(e.id)
                    setOpen(true)
                  }
                  } className="rounded-xl bg-blue-500 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-600 transition">
                    Edit
                  </button>

                  <button className="rounded-xl bg-slate-700 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-slate-800 transition">
                    Info
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
</div>


<Dialog open={open} onClose={handleClose}>
      <form onSubmit={handleSubmit} action="">
<input type="text" name='name' value={values.name} onChange={handleChange} placeholder='Name...' />
<input type="text" name='age' value={values.age} onChange={handleChange} placeholder='Age...' />
<button type='submit'>Add</button>
      </form>
      </Dialog>

    


    </>
  )
}

export default App
