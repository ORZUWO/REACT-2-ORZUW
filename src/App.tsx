import React, { useEffect, useState } from "react";
import { image, usecrad, type IData } from "./store/Crad";
import { useFormik } from "formik";

const App = () => {
  let get = usecrad((state:any) => state.getdata);
  let data = usecrad((state:any) => state.data);
  let adduser = usecrad((state:any) => state.adduser);
  let edituser = usecrad((state:any) => state.edituser);
  let deleteuser = usecrad((state:any) => state.deleteuser);
  let chek=usecrad((state:any)=>state.chek)
  const [open, setopen] = useState(false);
  const [openInfo, setopenInfo] = useState(false);
  const [infoUser, setinfoUser] = useState<IData | null>(null);
  const [idx, setidx] = useState<number | null>(null);

  useEffect(() => {
    get();
  }, []);

  const { handleChange, handleSubmit, values, setValues, setFieldValue, resetForm } =
    useFormik({
      initialValues: {
        name: "",
        description: "",
        image: null as File | null,
        isCompleted: false,
      },

      onSubmit: async (values) => {
        if (idx == null) {
          let formData:any = new FormData();
          formData.append("Name", values.name);
          formData.append("Description", values.description);

          if (values.image) {
            formData.append("Images", values.image);
          }

          await adduser(formData);
        } else {
          await edituser({
            id: idx,
            name: values.name,
            description: values.description,
            isCompleted: values.isCompleted,
            images: [],
          });
        }

        resetForm();
        setidx(null);
        setopen(false);
      },
    });

  return (
    <>
      <div className="w-[1200px] m-auto mt-[30px] bg-white border rounded-[20px] p-[20px] shadow">
        <div className="flex justify-between items-center mb-[20px]">
          <h1 className="text-[30px] font-bold">ORZU Table</h1>

          <button
            onClick={() => {
              setopen(true);
              setidx(null);
              resetForm();
            }}
            className="bg-slate-700 text-white px-[18px] py-[10px] rounded-[10px]"
          >
            Add User
          </button>
        </div>

        <table className="w-full border border-collapse text-center">
          <thead className="bg-slate-700 text-white">
            <tr>
              <th className="border p-[12px]">Check</th>
              <th className="border p-[12px]">ID</th>
              <th className="border p-[12px]">Name</th>
              <th className="border p-[12px]">Description</th>
              <th className="border p-[12px]">Status</th>
              <th className="border p-[12px]">Images</th>
              <th className="border p-[12px]">Actions</th>
            </tr>
          </thead>

          <tbody>
            {data.map((e: IData) => (
              <tr key={e.id} className="hover:bg-gray-50">
                <td className="border p-[12px]">
                  <input onChange={()=>chek(e.id)} type="checkbox" checked={e.isCompleted}  />
                </td>

                <td className="border p-[12px]">{e.id}</td>
                <td className="border p-[12px]">{e.name}</td>
                <td className="border p-[12px]">{e.description}</td>

                <td className="border p-[12px]">
                  {e.isCompleted ? (
                    <span className="bg-green-200 text-green-800 px-[12px] py-[5px] rounded-[8px]">
                      Completed
                    </span>
                  ) : (
                    <span className="bg-red-200 text-red-800 px-[12px] py-[5px] rounded-[8px]">
                      Not Completed
                    </span>
                  )}
                </td>

                <td className="border p-[12px]">
                  <div className="flex justify-center gap-[8px]">
                    {e.images?.map((img) => (
                      <img
                        key={img.id}
                        src={`${image}/${img.imageName}`}
                        alt=""
                        className="w-[45px] h-[45px] object-cover rounded-[8px]"
                      />
                    ))}
                  </div>
                </td>

                <td className="border p-[12px]">
                  <div className="flex justify-center gap-[8px]">
                    <button
                      onClick={() => {
                        setidx(e.id);
                        setValues({
                          name: e.name,
                          description: e.description,
                          image: null,
                          isCompleted: e.isCompleted,
                        });
                        setopen(true);
                      }}
                      className="bg-yellow-500 text-white px-[14px] py-[7px] rounded-[8px]"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteuser(e.id)}
                      className="bg-red-500 text-white px-[14px] py-[7px] rounded-[8px]"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => {
                        setinfoUser(e);
                        setopenInfo(true);
                      }}
                      className="bg-blue-500 text-white px-[14px] py-[7px] rounded-[8px]"
                    >
                      Info
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
          <div className="w-[420px] bg-white rounded-[20px] p-[20px]">
            <h2 className="text-[28px] font-bold mb-[20px]">
              {idx == null ? "Add User" : "Edit User"}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-[15px]">
              <input
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                placeholder="Name..."
                className="border border-gray-300 p-[12px] rounded-[10px] outline-none"
              />

              <input
                type="text"
                name="description"
                value={values.description}
                onChange={handleChange}
                placeholder="Description..."
                className="border border-gray-300 p-[12px] rounded-[10px] outline-none"
              />

              {idx == null ? (
                <input
                  type="file"
                  name="image"
                  onChange={(e) => setFieldValue("image", e.target.files?.[0] || null)}
                  className="border border-gray-300 p-[10px] rounded-[10px]"
                />
              ) : (
                <label className="flex items-center gap-[10px] text-[18px]">
                  <input
                    type="checkbox"
                    checked={values.isCompleted}
                    onChange={(e) => setFieldValue("isCompleted", e.target.checked)}
                  />
                  Is Completed
                </label>
              )}

              <div className="flex justify-end gap-[10px] mt-[10px]">
                <button
                  type="button"
                  onClick={() => {
                    setopen(false);
                    setidx(null);
                    resetForm();
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

      {openInfo && infoUser && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="w-[420px] bg-white rounded-[20px] p-[20px]">
            <h2 className="text-[28px] font-bold mb-[20px]">User Info</h2>

            <div className="flex flex-col gap-[12px] text-[18px]">
              <p><span className="text-[16px] font-bold ">ID:</span> {infoUser.id}</p>
              <p><span className="text-[16px] font-bold ">Name:</span> {infoUser.name}</p>
              <p><span className="text-[16px] font-bold ">Description:</span> {infoUser.description}</p>
              <p><span className="text-[16px] font-bold ">Status:</span> {infoUser.isCompleted ? "Completed" : "Not Completed"}</p>

              <div className="flex gap-[8px] mt-[10px]">
                {infoUser.images?.map((img) => (
                  <img
                    key={img.id}
                    src={`${image}/${img.imageName}`}
                    alt=""
                    className="w-[70px] h-[70px] rounded-[10px] object-cover"
                  />
                ))}
              </div>
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
  );
};

export default App;