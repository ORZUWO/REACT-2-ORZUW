import React, { useState } from "react"
import gg from "../images/gg.svg"
import { Link, useNavigate } from "react-router-dom"
import { AxiosRequest } from "../utils/token"

const Create = () => {
  const navigate = useNavigate()

  const [error, seterror] = useState("")
  const [loading, setloading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    seterror("")
    setloading(true)

    const form = new FormData(event.currentTarget)

    const password = form.get("password")
    const confirmPassword = form.get("confirmPassword")

    if (password !=confirmPassword) {
      setloading(false)
      seterror("Пароли не одинаковые")
      return
    }

    const obj = {
      userName: form.get("username"),
      phoneNumber: form.get("phoneNumber"),
      email: form.get("email"),
      password: form.get("password"),
      confirmPassword: form.get("confirmPassword"),
    }

    try {
      await AxiosRequest.post("/Account/register", obj)
      setloading(false)
      navigate("/login")
    } catch (error: any) {
      console.log(error.response?.data)
      console.log(error.response?.status)

      setloading(false)
      seterror("Ошибка регистрации. Проверь данные.")
    }
  }

  return (
    <>
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[430px]">
          <h1 className="text-[32px] sm:text-[40px] font-[500] tracking-[0.04em] text-black mb-3">
            Create an account
          </h1>

          <p className="text-[16px] text-black mb-10">
            Enter your details below
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input
              name="username"
              type="text"
              placeholder="Name"
              className="w-full h-[56px] border border-[#B3B3B3] rounded-[4px] px-4 outline-none text-[16px] placeholder:text-[#7D8184]"
            />

            <input
              name="phoneNumber"
              type="text"
              placeholder="Phone number"
              className="w-full h-[56px] border border-[#B3B3B3] rounded-[4px] px-4 outline-none text-[16px] placeholder:text-[#7D8184]"
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full h-[56px] border border-[#B3B3B3] rounded-[4px] px-4 outline-none text-[16px] placeholder:text-[#7D8184]"
            />

            <input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full h-[56px] border border-[#B3B3B3] rounded-[4px] px-4 outline-none text-[16px] placeholder:text-[#7D8184]"
            />

            <input
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              className="w-full h-[56px] border border-[#B3B3B3] rounded-[4px] px-4 outline-none text-[16px] placeholder:text-[#7D8184]"
            />

            {error && (
              <div className="bg-red-50 border border-red-200 text-[#DB4444] rounded-[4px] px-4 py-3 text-[14px]">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[56px] bg-[#DB4444] rounded-[4px] text-white text-[16px] font-[500] mt-2 disabled:opacity-70"
            >
              {loading ? "Loading..." : "Create Account"}
            </button>

            <button
              type="button"
              className="w-full h-[56px] border border-[#B3B3B3] rounded-[4px] flex items-center justify-center gap-4 text-[16px] font-[400] text-black"
            >
              <img src={gg} alt="" className="w-[24px] h-[24px]" />
              Sign up with Google
            </button>

            <div className="flex items-center justify-center gap-4 mt-2">
              <p className="text-[16px] text-[#7D8184]">
                Already have account?
              </p>

              <Link
                to="/login"
                className="text-[16px] text-black border-b border-black"
              >
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Create