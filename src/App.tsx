import React from 'react'
import { useAtom } from 'jotai'
import { datauser, img, type Idata } from './store/counterSlice'
import { useFormik } from 'formik'

const App = () => {
  const [data] = useAtom(datauser)

  const { handleChange, handleSubmit, values, setValues, setFieldValue } = useFormik({
    initialValues: {
      name: '',
      isCompleted: true,
      images: null,
      description: '',
    },
    onSubmit: (values) => {
      console.log(values)
    },
  })

  if (data.state === "loading") {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white text-2xl">
        Loading...
      </div>
    )
  }

  if (data.state === "hasError") {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-red-400 text-2xl">
        Error
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-white text-3xl font-bold">Todo Table</h1>
          <p className="text-slate-400 mt-2">Beautiful table with Jotai and Tailwind</p>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="flex gap-3 mb-5">
            <input
              onChange={handleChange}
              value={values.name}
              type="text"
              name="name"
              placeholder="Name..."
              className="px-4 py-2 rounded-xl"
            />
            <input
              onChange={handleChange}
              value={values.description}
              type="text"
              name="description"
              placeholder="Description..."
              className="px-4 py-2 rounded-xl"
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-xl">
              SAVE
            </button>
          </form>
        </div>

        <div className="overflow-x-auto rounded-3xl border border-slate-700 bg-slate-900/70 shadow-2xl backdrop-blur-sm">
          <table className="w-full text-sm text-left text-slate-200">
            <thead className="bg-slate-800 text-slate-300 uppercase text-xs">
              <tr>
                <th className="px-6 py-4">Completed</th>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Images</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {data.data.map((e: Idata) => (
                <tr
                  key={e.id}
                  className="border-t border-slate-800 hover:bg-slate-800/60 transition duration-200"
                >
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                        e.isCompleted
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30'
                      }`}
                    >
                      {e.isCompleted ? 'Completed' : 'Not Completed'}
                    </span>
                  </td>

                  <td className="px-6 py-4 font-medium text-sky-400">#{e.id}</td>

                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 flex-wrap">
                      {e.images.map((el) => (
                        <img
                          key={el.id}
                          src={`${img}/${el.imageName}`}
                          alt={e.name}
                          className="w-[52px] h-[52px] rounded-2xl object-cover border border-slate-700 shadow-md hover:scale-105 transition"
                        />
                      ))}
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="font-semibold text-white">{e.name}</div>
                  </td>

                  <td className="px-6 py-4 text-slate-300 max-w-[260px]">
                    {e.description}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2 flex-wrap">
                      <button className="rounded-xl bg-blue-500 px-4 py-2 text-white font-medium shadow hover:bg-blue-600 active:scale-95 transition">
                        Edit
                      </button>
                      <button className="rounded-xl bg-red-500 px-4 py-2 text-white font-medium shadow hover:bg-red-600 active:scale-95 transition">
                        Delete
                      </button>
                      <button className="rounded-xl bg-emerald-500 px-4 py-2 text-white font-medium shadow hover:bg-emerald-600 active:scale-95 transition">
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
  )
}

export default App