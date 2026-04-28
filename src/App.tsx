import { useState } from "react";
import { useForm } from "react-hook-form";

type User = {
  id: number;
  name: string;
  age: number;
  status: boolean;
};

type FormData = {
  name: string;
  age: number;
  status: boolean;
};

export default function App() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: "Orzu", age: 20, status: true },
    { id: 2, name: "Ali", age: 22, status: false },
    { id: 3, name: "Muhammad", age: 19, status: true },
  ]);

  const [idx, setIdx] = useState<number | null>(null);
  const [infoUser, setInfoUser] = useState<User | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      age: 18,
      status: false,
    },
  });

  const onSubmit = (data: FormData) => {
    if (idx === null) {
      const newUser: User = {
        id: Date.now(),
        name: data.name,
        age: data.age,
        status: data.status,
      };

      setUsers([...users, newUser]);
    } else {
      setUsers(
        users.map((user) =>
          user.id === idx ? { ...user, ...data } : user
        )
      );

      setIdx(null);
    }

    reset({
      name: "",
      age: 18,
      status: false,
    });
  };

  const deleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  const editUser = (user: User) => {
    setIdx(user.id);

    setValue("name", user.name);
    setValue("age", user.age);
    setValue("status", user.status);
  };

  return (
    <div className="min-h-screen bg-slate-100 p-5">
      <div className="max-w-[1000px] mx-auto grid md:grid-cols-[350px_1fr] gap-6">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-5 rounded-2xl shadow flex flex-col gap-4 h-fit"
        >
          <h1 className="text-2xl font-bold">
            {idx === null ? "Add User" : "Edit User"}
          </h1>

          <div>
            <input
              {...register("name", {
                required: "Name обязательно",
              })}
              placeholder="Name"
              className="w-full border rounded-lg p-3"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <input
              type="number"
              {...register("age", {
                required: "Age обязательно",
                valueAsNumber: true,
              })}
              placeholder="Age"
              className="w-full border rounded-lg p-3"
            />
            {errors.age && (
              <p className="text-red-500 text-sm mt-1">
                {errors.age.message}
              </p>
            )}
          </div>

          <label className="flex items-center gap-2">
            <input type="checkbox" {...register("status")} />
            Active
          </label>

          <button className="bg-black text-white rounded-lg p-3">
            {idx === null ? "Add" : "Save"}
          </button>

          {idx !== null && (
            <button
              type="button"
              onClick={() => {
                setIdx(null);
                reset({
                  name: "",
                  age: 18,
                  status: false,
                });
              }}
              className="border border-black rounded-lg p-3"
            >
              Cancel
            </button>
          )}
        </form>

        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-black text-white">
              <tr>
                <th className="p-3 text-left">ID</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Age</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-b">
                  <td className="p-3">{user.id}</td>
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.age}</td>
                  <td className="p-3">
                    {user.status ? (
                      <span className="text-green-600 font-semibold">
                        Active
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        Inactive
                      </span>
                    )}
                  </td>
                  <td className="p-3 flex gap-2">
                    <button
                      onClick={() => editUser(user)}
                      className="bg-blue-500 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>

                    <button
                      onClick={() => setInfoUser(user)}
                      className="bg-gray-700 text-white px-3 py-1 rounded"
                    >
                      Info
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {infoUser && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-[400px] rounded-2xl p-6 shadow">
            <h2 className="text-2xl font-bold mb-4">User Info</h2>

            <p>
              <b>ID:</b> {infoUser.id}
            </p>
            <p>
              <b>Name:</b> {infoUser.name}
            </p>
            <p>
              <b>Age:</b> {infoUser.age}
            </p>
            <p>
              <b>Status:</b>{" "}
              {infoUser.status ? "Active" : "Inactive"}
            </p>

            <button
              onClick={() => setInfoUser(null)}
              className="mt-5 w-full bg-black text-white p-3 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}