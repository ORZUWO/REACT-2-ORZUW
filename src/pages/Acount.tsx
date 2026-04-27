import React, { useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useFormik } from "formik"
import { GetDecodedToken } from "../utils/token"
import { UserGetbyid } from "../store/Acount"

const PageAcount = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  const dataId = UserGetbyid((state) => state.dataId)
  const loading = UserGetbyid((state) => state.loading)
  const saving = UserGetbyid((state) => state.saving)
  const error = UserGetbyid((state) => state.error)
  const getById = UserGetbyid((state) => state.getById)
  const EditUser = UserGetbyid((state) => state.EditUser)

  const [success, setSuccess] = useState(false)
  const [imageName, setImageName] = useState("")

  const decoded: any = useMemo(() => {
    return GetDecodedToken()
  }, [])

  const userId = id || decoded?.sid || decoded?.nameid || decoded?.id || ""

  useEffect(() => {
    if (!userId) {
      navigate("/login")
      return
    }
    getById(userId)
  }, [userId])

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstName: dataId?.firstName || decoded?.name || dataId?.userName || "",
      userName: dataId?.userName || decoded?.name || "",
      email: dataId?.email || decoded?.email || "",
      dob: dataId?.dob || "",
      phoneNumber: dataId?.phoneNumber || "",
      Image: null as File | null,
    },
    onSubmit: async (values) => {
  const edituser = new FormData()

  edituser.append("FirstName", values.firstName || "")
  edituser.append("LastName", dataId?.lastName || " ")
  edituser.append("UserName", values.userName || "")
  edituser.append("Email", values.email || "")
  edituser.append("Dob", values.dob || "0001-01-01")
  edituser.append("PhoneNumber", values.phoneNumber || "")

  if (values.Image) {
    edituser.append("Image", values.Image)
  }
  
  const ok = await EditUser(edituser)

  if (ok) {
    await getById(userId)
    setSuccess(true)
    setImageName("")
    setTimeout(() => setSuccess(false), 2500)
  }
}
  })

  function getImage() {
    return dataId?.image || dataId?.Image || dataId?.userImage || ""
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-500 font-medium animate-pulse">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] text-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-sm text-gray-500 mb-10 transition-all">
          <span
            onClick={() => navigate("/")}
            className="hover:text-red-500 cursor-pointer transition-colors"
          >
            Home
          </span>
          <span className="text-gray-300">/</span>
          <span className="text-black font-medium">My Account</span>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar */}
          <aside className="w-full lg:w-72 shrink-0">
            <div className="space-y-10">
              <section>
                <h3 className="font-bold text-lg mb-6 tracking-tight">Manage My Account</h3>
                <ul className="space-y-4 text-gray-500">
                  <li className="text-red-500 cursor-pointer font-semibold flex items-center gap-3">
                    <span className="w-1.5 h-6 bg-red-500 rounded-full"></span>
                    My Profile
                  </li>
                  <li className="hover:text-red-500 cursor-pointer transition-colors pl-4">Address Book</li>
                  <li className="hover:text-red-500 cursor-pointer transition-colors pl-4">Payment Options</li>
                </ul>
              </section>

              <section>
                <h3 className="font-bold text-lg mb-6 tracking-tight">My Orders</h3>
                <ul className="space-y-4 text-gray-500">
                  <li className="hover:text-red-500 cursor-pointer transition-colors pl-4">My Returns</li>
                  <li className="hover:text-red-500 cursor-pointer transition-colors pl-4">My Cancellations</li>
                </ul>
              </section>

              <button className="font-bold text-lg hover:text-red-500 transition-colors">
                My Wishlist
              </button>
            </div>
          </aside>

          {/* Main Form */}
          <main className="flex-1 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 overflow-hidden">
            <div className="p-8 md:p-12">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-10">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">Edit Your Profile</h2>
                  <p className="text-gray-400 text-sm">Update your personal information and photo</p>
                </div>

                <div className="flex items-center gap-6 group">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-2xl bg-gray-100 border-2 border-white shadow-md overflow-hidden flex items-center justify-center transition-transform group-hover:scale-105 duration-300">
                      {getImage() ? (
                        <img
                          src={`https://store-api.softclub.tj/images/${getImage()}`}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-gray-400 text-xs font-medium uppercase tracking-wider">No Avatar</div>
                      )}
                    </div>
                  </div>

                  <label className="group relative">
                    <div className="h-11 px-6 bg-black text-white text-sm font-medium rounded-xl flex items-center justify-center cursor-pointer hover:bg-red-500 transition-all duration-300 shadow-sm active:scale-95">
                      Upload Photo
                    </div>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(event) => {
                        const file = event.currentTarget.files?.[0] || null
                        formik.setFieldValue("Image", file)
                        setImageName(file ? file.name : "")
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Status Messages */}
              <div className="space-y-4 mb-8">
                {error && (
                  <div className="animate-in slide-in-from-top-2 flex items-center gap-3 bg-red-50 border border-red-100 text-red-600 px-5 py-4 rounded-xl text-sm font-medium">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                    {error}
                  </div>
                )}
                {success && (
                  <div className="animate-in slide-in-from-top-2 flex items-center gap-3 bg-emerald-50 border border-emerald-100 text-emerald-600 px-5 py-4 rounded-xl text-sm font-medium">
                    <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                    Profile updated successfully!
                  </div>
                )}
                {imageName && (
                  <div className="bg-blue-50 border border-blue-100 text-blue-600 px-5 py-3 rounded-xl text-xs font-medium">
                    New file selected: {imageName}
                  </div>
                )}
              </div>

              <form onSubmit={formik.handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                  <div className="space-y-2">
                    <label className="text-[13px] font-bold uppercase tracking-wider text-gray-400 ml-1">First Name</label>
                    <input
                      name="firstName"
                      placeholder="Enter first name"
                      onChange={formik.handleChange}
                      value={formik.values.firstName}
                      className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/5 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[13px] font-bold uppercase tracking-wider text-gray-400 ml-1">User Name</label>
                    <input
                      name="userName"
                      placeholder="Enter username"
                      onChange={formik.handleChange}
                      value={formik.values.userName}
                      className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/5 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[13px] font-bold uppercase tracking-wider text-gray-400 ml-1">Email Address</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="example@mail.com"
                      onChange={formik.handleChange}
                      value={formik.values.email}
                      className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/5 transition-all"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[13px] font-bold uppercase tracking-wider text-gray-400 ml-1">Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      placeholder="+992 XXX XX XX XX"
                      onChange={formik.handleChange}
                      value={formik.values.phoneNumber}
                      className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/5 transition-all"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-50">
                  <h3 className="text-sm font-bold text-gray-900 mb-6 uppercase tracking-widest">Personal Details</h3>
                  <div className="max-w-md">
                     <label className="text-[13px] font-bold uppercase tracking-wider text-gray-400 ml-1 mb-2 block">Date of Birth</label>
                    <input
                      name="dob"
                      type="text"
                      placeholder="YYYY-MM-DD"
                      onChange={formik.handleChange}
                      value={formik.values.dob}
                      className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl outline-none focus:bg-white focus:border-red-500 focus:ring-4 focus:ring-red-500/5 transition-all"
                    />
                  </div>
                </div>

                <div className="flex justify-end items-center gap-6 pt-6">
                  <button
                    type="button"
                    onClick={() => navigate("/")}
                    className="text-sm font-bold text-gray-400 hover:text-black transition-colors px-4"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="relative bg-red-500 text-white px-10 py-4 rounded-xl font-bold text-sm shadow-lg shadow-red-500/20 hover:bg-red-600 hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                  >
                    {saving ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Saving...</span>
                      </div>
                    ) : (
                      "Save Changes"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

export default PageAcount