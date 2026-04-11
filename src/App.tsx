import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from './store/store'
import { adduser, chek, deleteuser, edituser } from './store/counterSlice'
import { useFormik } from 'formik'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

const App = () => {
  const { data } = useSelector((store: RootState) => store.todo)
  const Dispatch = useDispatch()

  const [idx, setidx] = useState<number | null>(null)
  const [open, setopen] = useState(false)
  const [sear, setsear] = useState("")
  const [select, setselect] = useState("")
const [openInfo, setopenInfo] = useState(false)
const [infoUser, setinfoUser] = useState<any>(null)


  const { handleChange, handleSubmit, values, setValues, resetForm } = useFormik({
    initialValues: {
      name: "",
      age: 0,
      status: true,
      id: Date.now()
    },
    onSubmit: values => {
      if (idx == null) {
        Dispatch(adduser({ ...values, id: Date.now() }))
      } else {
        Dispatch(edituser(values))
      }

      resetForm()
      setidx(null)
      setopen(false)
    },
  })

  return (
    <div className="bg-slate-100 py-[30px]">
      <div className="w-[1200px] m-auto bg-white rounded-[16px] shadow p-[20px]">
        <h1 className="text-[28px] font-bold mb-[20px]">ORZU Table </h1>

        <div className="flex gap-[15px] items-center mb-[20px]">
          <button
            onClick={() => {
              resetForm()
              setidx(null)
              setopen(true)
            }}
            className="bg-slate-700 text-white px-[18px] py-[10px] rounded-[10px]"
          >
            Add New User
          </button>

          <input
            value={sear}
            onChange={(e) => setsear(e.target.value)}
            type="search"
            placeholder="Search by name..."
            className="border border-slate-300 px-[14px] py-[10px] rounded-[10px] w-[250px] outline-none"
          />

          <select
            value={select}
            onChange={(e) => setselect(e.target.value)}
            className="border border-slate-300 px-[14px] py-[10px] rounded-[10px] w-[170px] outline-none"
          >
            <option value="">All</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
        </div>

        <table className="w-full border border-collapse">
          <thead className="bg-slate-700 text-white">
            <tr>
              <th className="border p-[12px]">Check</th>
              <th className="border p-[12px]">ID</th>
              <th className="border p-[12px]">Name</th>
              <th className="border p-[12px]">Age</th>
              <th className="border p-[12px]">Status</th>
              <th className="border p-[12px]">Action</th>
            </tr>
          </thead>

          <tbody>
            {data
              .filter((e) =>
                select==""?true:select=="true"?e.status:!e.status
              )
              .filter((e) =>
                e.name.toLowerCase().includes(sear.toLowerCase())
              )
              .map((e) => (
                <tr key={e.id} className="text-center hover:bg-slate-50">
                  <td className="border p-[12px]">
                    <input
                      onChange={() => Dispatch(chek(e.id))}
                      checked={e.status}
                      type="checkbox"
                    />
                  </td>

                  <td className="border p-[12px]">{e.id}</td>
                  <td className="border p-[12px]">{e.name}</td>
                  <td className="border p-[12px]">{e.age}</td>

                  <td className="border p-[12px]">
                    <span
                      className={e.status?"bg-green-200 text-green-800 px-[10px] py-[4px] rounded-[8px]":"bg-red-200 text-red-800 px-[10px] py-[4px] rounded-[8px]"}>
                      {e.status ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="border p-[12px]">
                    <div className="flex justify-center gap-[10px]">
                      <button
                        onClick={() => {
                          setValues(e)
                          setidx(e.id)
                          setopen(true)
                        }}
                        className="bg-blue-500 text-white px-[14px] py-[7px] rounded-[8px]"
                      >
                        Edit
                      </button>

                      <button
                   onClick={()=>{setinfoUser(e),setopenInfo(true)}}className="bg-green-500 text-white px-[14px] py-[7px] rounded-[8px]">
  Info
</button>

                      <button
                        onClick={() => Dispatch(deleteuser(e.id))}
                        className="bg-red-500 text-white px-[14px] py-[7px] rounded-[8px]"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      <Dialog open={open}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>{idx === null ? "Add User" : "Edit User"}</DialogTitle>
            <DialogDescription>
              Fill the fields
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
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
                <Button
                  onClick={() => {
                    setopen(false)
                    setidx(null)
                    resetForm()
                  }}
                  type="button"
                  variant="outline"
                >
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


<Dialog open={openInfo}>
  <DialogContent >
    <DialogHeader>
      <DialogTitle>User Info</DialogTitle>
      <DialogDescription>
        About this user
      </DialogDescription>
    </DialogHeader>

    <div className="space-y-3 text-[16px]">
      <p><span className='font-bold text-[15px]'>ID:</span> {infoUser?.id}</p>
      <p><span className='font-bold text-[15px]'>Name:</span> {infoUser?.name}</p>
      <p><span className='font-bold text-[15px]'>Age:</span> {infoUser?.age}</p>
      <p><span className='font-bold text-[15px]'>Status:</span> {infoUser?.status ? "Active" : "Inactive"}</p>
    </div>

    <DialogFooter>
      <DialogClose asChild>
        <Button
          onClick={() => setopenInfo(false)}
          type="button"
          variant="outline"
        >
          Close
        </Button>
      </DialogClose>
    </DialogFooter>
  </DialogContent>
</Dialog>













    </div>
  )
}

export default App