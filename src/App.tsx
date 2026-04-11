import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from './store/store'
import { adduser, deleteuser, edituser } from './store/counterSlice'
import { useFormik } from 'formik'

const App = () => {
  const { data } = useSelector((store: RootState) => store.todo)
  const Dispatch = useDispatch()

  const [idx, setidx] = useState<number | null>(null)
  const [open, setopen] = useState(false)
  const [openInfo, setopenInfo] = useState(false)
  const [info, setinfo] = useState<any>(null)

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
    <>
      <div className="w-[1100px] m-auto mt-[30px] bg-white border border-gray-300 rounded-[18px] p-[25px] shadow-sm">
        <div className="flex justify-between items-center mb-[25px]">
          <h1 className="text-[28px] font-bold text-gray-800">
            User Table
          </h1>

          <button
            onClick={() => {
              setopen(true)
              setidx(null)
              resetForm()
            }}
            className="bg-slate-700 text-white px-[20px] py-[10px] rounded-[10px]"
          >
            Add User
          </button>
        </div>

        <table className="w-full border border-collapse overflow-hidden">
          <thead className="bg-slate-700 text-white">
            <tr>
              <th className="border p-[12px] w-[100px]">Checkbox</th>
              <th className="border p-[12px]">ID</th>
              <th className="border p-[12px]">Name</th>
              <th className="border p-[12px]">Age</th>
              <th className="border p-[12px]">Status</th>
              <th className="border p-[12px] w-[320px]">Action</th>
            </tr>
          </thead>

          <tbody>
            {data.map((e) => (
              <tr key={e.id} className="hover:bg-gray-50">
                <td className="border p-[12px] text-center">
                  <input type="checkbox" checked={e.status} readOnly />
                </td>

                <td className="border p-[12px] text-center">{e.id}</td>
                <td className="border p-[12px] text-center">{e.name}</td>
                <td className="border p-[12px] text-center">{e.age}</td>

                <td className="border p-[12px] text-center">
                  <span
                    className={
                      e.status
                        ? "bg-green-100 text-green-700 px-[12px] py-[5px] rounded-[8px]"
                        : "bg-red-100 text-red-700 px-[12px] py-[5px] rounded-[8px]"
                    }
                  >
                    {e.status ? "Active" : "Inactive"}
                  </span>
                </td>

                <td className="border p-[12px] text-center">
                  <div className="flex justify-center gap-[10px]">
                    <button
                      onClick={() => {
                        setidx(e.id)
                        setValues(e)
                        setopen(true)
                      }}
                      className="bg-blue-500 text-white px-[14px] py-[7px] rounded-[8px]"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => {
                        setinfo(e)
                        setopenInfo(true)
                      }}
                      className="bg-green-500 text-white px-[14px] py-[7px] rounded-[8px]"
                    >
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

      {open && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="w-[400px] bg-white rounded-[16px] p-[20px]">
            <h2 className="text-[26px] font-bold mb-[20px]">
              {idx == null ? "Add User" : "Edit User"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-[15px]">
              <input
                className="border border-gray-300 p-[11px] rounded-[10px] outline-none"
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Name..."
              />

              <input
                className="border border-gray-300 p-[11px] rounded-[10px] outline-none"
                type="number"
                name="age"
                value={values.age}
                onChange={handleChange}
                placeholder="Age..."
              />

              <label className="flex items-center gap-[10px]">
                <input
                  type="checkbox"
                  checked={values.status}
                  onChange={(e) =>
                    setValues({ ...values, status: e.target.checked })
                  }
                />
                Status
              </label>

              <div className="flex justify-end gap-[10px] mt-[10px]">
                <button
                  type="button"
                  onClick={() => {
                    setopen(false)
                    setidx(null)
                    resetForm()
                  }}
                  className="bg-gray-400 text-white px-[16px] py-[8px] rounded-[10px]"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="bg-slate-700 text-white px-[16px] py-[8px] rounded-[10px]"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {openInfo && info && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="w-[400px] bg-white rounded-[16px] p-[20px]">
            <h2 className="text-[26px] font-bold mb-[20px]">User Info</h2>

            <div className="flex flex-col gap-[12px] text-[18px]">
              <p><b>ID:</b> {info.id}</p>
              <p><b>Name:</b> {info.name}</p>
              <p><b>Age:</b> {info.age}</p>
              <p><b>Status:</b> {info.status ? "Active" : "Inactive"}</p>
            </div>

            <div className="flex justify-end mt-[20px]">
              <button
                onClick={() => setopenInfo(false)}
                className="bg-blue-500 text-white px-[16px] py-[8px] rounded-[10px]"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default App