import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AxiosRequest } from "../utils/token"

const Account = () => {
  const navigate = useNavigate()

  const [loading, setloading] = useState(false)
  const [error, seterror] = useState("")
  const [profile, setprofile] = useState<any>(null)

  async function getProfile() {
    setloading(true)
    seterror("")

    try {
      const userName = localStorage.getItem("userName") || ""

      const { data } = await AxiosRequest.get("/UserProfile/get-user-profiles", {
        params: {
          UserName: userName,
          PageNumber: 1,
          PageSize: 10,
        },
      })

      const result =
        data?.data?.data?.[0] ||
        data?.data?.[0] ||
        data?.data ||
        data?.[0] ||
        data

      setprofile(result)
      setloading(false)
    } catch (error: any) {
      console.log(error.response?.status)
      console.log(error.response?.data)

      setloading(false)

      if (error.response?.status === 401) {
        seterror("Сначала сделай login. Token не найден.")
      } else {
        seterror("Ошибка get profile.")
      }
    }
  }

  useEffect(() => {
    getProfile()
  }, [])

  if (loading) {
    return (
      <div className="py-20 text-[24px] font-[600]">
        Loading...
      </div>
    )
  }

  return (
    <>
      <div className="pt-10 pb-20">
        <div className="flex items-center gap-3 text-[14px] text-[#7D8184] mb-16">
          <p onClick={() => navigate("/")} className="cursor-pointer">
            Home
          </p>
          <p>/</p>
          <p className="text-black">My Account</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-12 items-start">
          <div className="hidden lg:block">
            <div className="mb-8">
              <h3 className="text-[16px] font-[600] text-black mb-4">
                Manage My Account
              </h3>

              <div className="pl-6 flex flex-col gap-3">
                <p className="text-[16px] text-[#DB4444]">My Profile</p>
                <p className="text-[16px] text-[#7D8184]">Address Book</p>
                <p className="text-[16px] text-[#7D8184]">
                  My Payment Options
                </p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-[16px] font-[600] text-black mb-4">
                My Orders
              </h3>

              <div className="pl-6 flex flex-col gap-3">
                <p className="text-[16px] text-[#7D8184]">My Returns</p>
                <p className="text-[16px] text-[#7D8184]">My Cancellations</p>
              </div>
            </div>

            <div>
              <h3 className="text-[16px] font-[600] text-black">
                My WishList
              </h3>
            </div>
          </div>

          <div className="w-full bg-white shadow-[0_0_30px_rgba(0,0,0,0.08)] rounded-[4px] px-5 sm:px-10 lg:px-12 py-10">
            <h2 className="text-[20px] font-[500] text-[#DB4444] mb-8">
              Profile
            </h2>

            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 text-[#DB4444] rounded-[4px] px-4 py-3 text-[14px]">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="relative">
                <input
                  type="text"
                  defaultValue={profile?.firstName || profile?.userName || ""}
                  className="w-full h-[50px] border border-[#B3B3B3] rounded-[4px] px-4 pt-3 outline-none text-[16px]"
                />
                <p className="absolute -top-2 left-4 bg-white px-1 text-[12px] text-[#7D8184]">
                  First name
                </p>
              </div>

              <div className="relative">
                <input
                  type="text"
                  defaultValue={profile?.lastName || ""}
                  className="w-full h-[50px] border border-[#B3B3B3] rounded-[4px] px-4 pt-3 outline-none text-[16px]"
                />
                <p className="absolute -top-2 left-4 bg-white px-1 text-[12px] text-[#7D8184]">
                  Last name
                </p>
              </div>

              <div className="relative">
                <input
                  type="text"
                  defaultValue={profile?.email || ""}
                  className="w-full h-[50px] border border-[#B3B3B3] rounded-[4px] px-4 pt-3 outline-none text-[16px]"
                />
                <p className="absolute -top-2 left-4 bg-white px-1 text-[12px] text-[#7D8184]">
                  Email address
                </p>
              </div>

              <div className="relative">
                <input
                  type="text"
                  defaultValue={
                    profile?.address ||
                    profile?.streetAddress ||
                    profile?.phoneNumber ||
                    ""
                  }
                  className="w-full h-[50px] border border-[#B3B3B3] rounded-[4px] px-4 pt-3 outline-none text-[16px]"
                />
                <p className="absolute -top-2 left-4 bg-white px-1 text-[12px] text-[#7D8184]">
                  Street address
                </p>
              </div>
            </div>

            <h3 className="text-[16px] font-[500] text-black mb-5">
              Password Changes
            </h3>

            <div className="flex flex-col gap-5 mb-8">
              <input
                type="password"
                placeholder="Current password"
                className="w-full h-[50px] border border-[#B3B3B3] rounded-[4px] px-4 outline-none text-[16px] placeholder:text-[#7D8184]"
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input
                  type="password"
                  placeholder="New password"
                  className="w-full h-[50px] border border-[#B3B3B3] rounded-[4px] px-4 outline-none text-[16px] placeholder:text-[#7D8184]"
                />

                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full h-[50px] border border-[#B3B3B3] rounded-[4px] px-4 outline-none text-[16px] placeholder:text-[#7D8184]"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-end gap-6">
              <button className="text-[16px] text-black">
                Cancel
              </button>

              <button className="w-full sm:w-[214px] h-[56px] bg-[#DB4444] rounded-[4px] text-white text-[16px] font-[500]">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Account