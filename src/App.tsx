import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {type RootState } from './store/store'
import { adduser, deleteuser, edituser } from './store/counterSlice'
import { useFormik } from 'formik';

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"





const App = () => {
  const {data}=useSelector((store:RootState)=>store.todo)
  const Dispatch=useDispatch()
  const [idx,setidx]=useState(null)
  const [open,setopen]=useState(false)

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
         setopen(false)
       }
       else{

      Dispatch(edituser(values))
      setopen(false)


       }
     },
   });



  return (
    <>



<Dialog open={open} >
  <DialogContent className="sm:max-w-sm">
    <DialogHeader>
      <DialogTitle>ADD USER</DialogTitle>
      <DialogDescription>
        Add new user here
      </DialogDescription>
    </DialogHeader>

    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <FieldGroup>
        <Field>
          <Label htmlFor="name-1">Name</Label>
          <Input
            id="name-1"
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Name..."
          />
        </Field>

        <Field>
          <Label htmlFor="age-1">Age</Label>
          <Input
            id="age-1"
            type="number"
            name="age"
            value={values.age}
            onChange={handleChange}
            placeholder="Age..."
          />
        </Field>
      </FieldGroup>

      <DialogFooter>
        <DialogClose asChild>
          <Button onClick={()=>setopen(false)} type="button" variant="outline">
            Cancel
          </Button>
        </DialogClose>

        <Button type="submit">
          Save
        </Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>




<button onClick={()=>setopen(true)} className='p-[14px] bg-gray-500 text-white rounded-2xl ml-38 mt-6'>ADD NEW USER</button>
    


      <table className="w-[80%] mt-[20px] m-auto border border-collapse">
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
                <button onClick={()=>{
                  setValues(e)
                  setidx(e.id)
                  setopen(true)

                }} className="bg-blue-500 text-white px-3 py-1 rounded">
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
