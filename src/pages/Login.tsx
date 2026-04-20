import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { AxiosRequest, SaveToken } from "../utils/token"

const Login = () => {
  const navigate = useNavigate()

  const [error, seterror] = useState("")
  const [loading, setloading] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    seterror("")
    setloading(true)

    const form = new FormData(event.currentTarget)

    const obj = {
      userName: form.get("username"),
      password: form.get("password"),
    }

    try {
      const { data } = await AxiosRequest.post("/Account/login", obj)

      SaveToken(data.data)
      localStorage.setItem("userName", String(form.get("username")))

      setloading(false)
      navigate("/")
    } catch (error: any) {
      console.log(error.response?.data)
      console.log(error.response?.status)

      setloading(false)
      seterror("Неправильный логин или пароль.")
    }
  }

  return (
    <>
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-[460px]">
          <h1 className="text-[32px] sm:text-[40px] font-[500] tracking-[0.04em] text-black mb-3">
            Log in to Exclusive
          </h1>

          <p className="text-[16px] text-black mb-10">
            Enter your details below
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="relative">
              <input
                name="username"
                type="text"
                placeholder="Username"
                className="w-full h-[64px] border border-[#B3B3B3] rounded-[4px] px-4 pt-4 outline-none text-[16px]"
              />
              <p className="absolute -top-2 left-4 bg-white px-1 text-[14px] text-[#7D8184]">
                User name
              </p>
            </div>

            <div className="relative">
              <input
                name="password"
                type="password"
                placeholder="Password"
                className="w-full h-[64px] border border-[#B3B3B3] rounded-[4px] px-4 pt-4 pr-12 outline-none text-[16px]"
              />
              <p className="absolute -top-2 left-4 bg-white px-1 text-[14px] text-[#7D8184]">
                Password
              </p>

              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7D8184]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-[24px] h-[24px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </button>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 text-[#DB4444] rounded-[4px] px-4 py-3 text-[14px]">
                {error}
              </div>
            )}

            <Link
              to="/signup"
              className="text-[#DB4444] text-[18px] m-auto font-[400] mt-3 mb-3"
            >
              Forget Password?
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-[64px] bg-[#DB4444] rounded-[4px] text-white text-[18px] font-[500] disabled:opacity-70"
            >
              {loading ? "Loading..." : "Log In"}
            </button>

            <div className="flex items-center justify-center gap-3">
              <p className="text-[16px] text-[#7D8184]">
                Don't have account?
              </p>

              <Link
                to="/signup"
                className="text-[16px] text-black border-b border-black"
              >
                Create
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default Login