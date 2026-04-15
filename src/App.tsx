import React from 'react'
import { useAtom, useAtomValue } from 'jotai'
import { dataatom,  deleteuser, img } from './store/counterSlice'



const App = () => {
  const data = useAtomValue(dataatom)
  const [,setdeleteuser]=useAtom(deleteuser)

  if (data.state === "loading") {
    return <h1 className="p-5 text-xl">Loading...</h1>
  }

  if (data.state === "hasError") {
    return <h1 className="p-5 text-xl text-red-500">Error</h1>
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="overflow-x-auto bg-white rounded-2xl shadow-lg">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-200 text-gray-700">
            <tr>
              <th className="p-4">Completed</th>
              <th className="p-4">ID</th>
              <th className="p-4">Image</th>
              <th className="p-4">Name</th>
              <th className="p-4">Description</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.data.map((e, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-4">
                  <input type="checkbox" checked={e.isCompleted} readOnly />
                </td>

                <td className="p-4">{e.id}</td>

                <td className="p-4">
                  {e.images.map((el)=>{
                    return <img className='w-[50px] rounded-[50%]' src={`${img}/${el.imageName}`} alt="" />
                  })}
                </td>

                <td className="p-4 font-medium">{e.name}</td>

                <td className="p-4">{e.description}</td>

                <td className="p-4">
                  <div className="flex gap-2">
                    <button className="bg-blue-500 text-white px-3 py-1 rounded-lg">
                      Edit
                    </button>
                    <button onClick={()=>setdeleteuser(e.id)} className="bg-red-500 text-white px-3 py-1 rounded-lg">
                      Delete
                    </button>
                    <button className="bg-green-500 text-white px-3 py-1 rounded-lg">
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
  )
}

export default App