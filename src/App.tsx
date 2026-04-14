import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState } from './store/store'
import { useFormik } from 'formik'
import { adduser, che, deleteuser, edituser, getdata, img } from './store/counterSlice'

const App = () => {
  const { data, error, isloading } = useSelector((store: RootState) => store.todo)
  const Dispatch = useDispatch()

  const [idx, setidx] = useState<number | null>(null)
  const [open, setopen] = useState(false)
  const [openInfo, setopenInfo] = useState(false)
  const [info, setinfo] = useState<any>(null)

  const { handleChange, handleSubmit, values, setValues, resetForm, setFieldValue } = useFormik({
    initialValues: {
      name: '',
      description: '',
      isCompleted: true,
      images: null as File | null
    },
    onSubmit: (values) => {
      let formdata = new FormData()
      formdata.append("name", values.name)
      formdata.append("description", values.description)
      formdata.append("isCompleted", String(values.isCompleted))

      if (values.images) {
        formdata.append("images", values.images)
      }

      if (idx == null) {
        Dispatch(adduser(formdata) as any)
      } else {
        Dispatch(
          edituser({
            id: idx,
            name: values.name,
            description: values.description,
          }) as any
        )
      }

      resetForm()
      setidx(null)
      setopen(false)
    },
  })

  useEffect(() => {
    Dispatch(getdata() as any)
  }, [])

  if (isloading) {
    return <div className="text-center text-2xl mt-10">...Loading</div>
  }

  if (error) {
    return <div className="text-center text-2xl mt-10 text-red-600">...Error</div>
  }

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-slate-800">Todo Table</h1>

          <button
            type="button"
            onClick={() => {
              setidx(null)
              resetForm()
              setValues({
                name: '',
                description: '',
                isCompleted: true,
                images: null,
              })
              setopen(true)
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl shadow"
          >
            + Add User
          </button>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-900 text-white">
                <tr>
                  <th className="p-4 text-left">Checkbox</th>
                  <th className="p-4 text-left">ID</th>
                  <th className="p-4 text-left">Name</th>
                  <th className="p-4 text-left">Description</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Action</th>
                </tr>
              </thead>

              <tbody>
                {data.map((e) => {
                  return (
                    <tr key={e.id} className="border-b hover:bg-slate-50 transition">
                      <td className="p-4">
                        <input
                          onChange={() => Dispatch(che(e) as any)}
                          checked={e.isCompleted}
                          type="checkbox"
                          className="w-4 h-4"
                        />
                      </td>

                      <td className="p-4 font-semibold text-slate-700">{e.id}</td>

                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          {e.images.map((el) => {
                            return (
                              <img
                                key={el.id}
                                className="w-[38px] h-[38px] rounded-full object-cover border"
                                src={`${img}/${el.imageName}`}
                                alt=""
                              />
                            )
                          })}
                          <p className="font-medium text-slate-800">{e.name}</p>
                        </div>
                      </td>

                      <td className="p-4 text-slate-600">{e.description}</td>

                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            e.isCompleted
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {e.isCompleted ? 'ACTIVE' : 'INACTIVE'}
                        </span>
                      </td>

                      <td className="p-4">
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => Dispatch(deleteuser(e.id) as any)}
                            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl"
                          >
                            Delete
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setidx(e.id)
                              setValues({
                                name: e.name,
                                description: e.description,
                                isCompleted: e.isCompleted,
                                images: null,
                              })
                              setopen(true)
                            }}
                            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl"
                          >
                            Edit
                          </button>

                          <button
                            type="button"
                            onClick={() => {
                              setinfo(e)
                              setopenInfo(true)
                            }}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl"
                          >
                            Info
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 relative">
            <h2 className="text-2xl font-bold mb-5 text-slate-800">
              {idx == null ? 'Add User' : 'Edit User'}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                className="border border-slate-300 focus:border-blue-500 outline-none py-4 rounded-2xl px-4"
                value={values.name}
                type="text"
                onChange={handleChange}
                name="name"
                placeholder="Name..."
              />

              <input
                className="border border-slate-300 focus:border-blue-500 outline-none py-4 rounded-2xl px-4"
                value={values.description}
                type="text"
                name="description"
                onChange={handleChange}
                placeholder="Description..."
              />

              {idx == null && (
                <input
                  className="border border-slate-300 focus:border-blue-500 outline-none py-4 rounded-2xl px-4"
                  type="file"
                  name="images"
                  onChange={(e) => setFieldValue("images", e.target.files?.[0] || null)}
                />
              )}

              <div className="flex gap-3 mt-2">
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-5 rounded-2xl"
                >
                  {idx == null ? 'Save' : 'Update'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setopen(false)
                    setidx(null)
                    resetForm()
                  }}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-800 py-3 px-5 rounded-2xl"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {openInfo && info && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-6">
            <h2 className="text-2xl font-bold text-slate-800 mb-5">User Info</h2>

            <div className="flex flex-col gap-4">
              <div className="flex gap-3 items-center">
                {info.images?.map((el: any) => {
                  return (
                    <img
                      key={el.id}
                      className="w-[60px] h-[60px] rounded-full object-cover border"
                      src={`${img}/${el.imageName}`}
                      alt=""
                    />
                  )
                })}
              </div>

              <p className="text-slate-700">
                <span className="font-bold">ID:</span> {info.id}
              </p>

              <p className="text-slate-700">
                <span className="font-bold">Name:</span> {info.name}
              </p>

              <p className="text-slate-700">
                <span className="font-bold">Description:</span> {info.description}
              </p>

              <p className="text-slate-700">
                <span className="font-bold">Status:</span>{" "}
                {info.isCompleted ? 'ACTIVE' : 'INACTIVE'}
              </p>

              <button
                type="button"
                onClick={() => {
                  setopenInfo(false)
                  setinfo(null)
                }}
                className="bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-2xl mt-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App