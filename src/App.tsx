import React, { useEffect } from "react";
import { image, usecrad, type IData } from "./store/Crad";
import { useFormik } from "formik";

const App = () => {
  let get = usecrad((state) => state.getdata);
  let data = usecrad((state) => state.data);
  let adduser = usecrad((state) => state.adduser);

  useEffect(() => {
    get();
  }, []);

  const { handleChange, handleSubmit, values, setFieldValue, resetForm } =
    useFormik({
      initialValues: {
        name: "",
        description: "",
        image: null as File | null,
      },

      onSubmit: async (values) => {
        let formData = new FormData();
        formData.append("Name", values.name);
        formData.append("Description", values.description);
        formData.append("Images", values.image);
        adduser(formData);
        resetForm();
      },
    });

  return (
    <>
      <div className="w-[90%] m-auto mt-4">
        <form
          onSubmit={handleSubmit}
          className="w-[30%] my-[40px] flex flex-col gap-[20px] border rounded-3xl bg-gray-500 p-[10px]"
        >
          <input
            type="text"
            className="bg-gray-300 p-[10px] rounded-2xl"
            placeholder="Name..."
            name="name"
            value={values.name}
            onChange={handleChange}
          />

          <input
            type="text"
            className="bg-gray-300 p-[10px] rounded-2xl"
            placeholder="Description..."
            name="description"
            value={values.description}
            onChange={handleChange}
          />

          <input
            type="file"
            className="bg-gray-300 p-[10px] rounded-2xl"
            name="image"
            onChange={(event)=>setFieldValue("image",event.target.files[0])}
          />

          <button
            className="bg-blue-500 text-white p-[10px] rounded-2xl"
            type="submit"
          >
            Save
          </button>
        </form>

        <table className="w-full border border-gray-300 text-center">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">
                <input type="checkbox" />
              </th>
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Description</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Images</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((e: IData) => (
              <tr key={e.id} className="hover:bg-gray-50">
                <td className="border p-2">
                  <input type="checkbox" checked={e.isCompleted} readOnly />
                </td>

                <td className="border p-2">{e.id}</td>
                <td className="border p-2">{e.name}</td>
                <td className="border p-2">{e.description}</td>

                <td className="border p-2">
                  {e.isCompleted ? (
                    <div className="bg-green-500 text-white rounded-xl px-2 py-1">
                      Completed
                    </div>
                  ) : (
                    <div className="bg-red-500 text-white rounded-xl px-2 py-1">
                      Not Completed
                    </div>
                  )}
                </td>

                <td className="border p-2">
                  <div className="flex justify-center gap-2">
                    {e.images?.map((img) => {
                      return (
                        <img
                          key={img.id}
                          src={`${image}/${img.imageName}`}
                          alt=""
                          className="w-[40px] h-[40px] object-cover rounded"
                        />
                      );
                    })}
                  </div>
                </td>

                <td className="border p-2 space-x-2">
                  <button className="bg-yellow-400 px-3 py-1 rounded text-white">
                    Edit
                  </button>
                  <button className="bg-red-500 px-3 py-1 rounded text-white">
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
  );
};

export default App;
