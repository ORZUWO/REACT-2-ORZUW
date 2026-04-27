import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Zustandlogic } from "../store/Zuntand"

const Login = () => {
  const navigate = useNavigate()

  const loginUser = Zustandlogic((state: any) => state.loginUser)
  const loadingAuth = Zustandlogic((state: any) => state.loadingAuth)
  const errorAuth = Zustandlogic((state: any) => state.errorAuth)

  const [show, setShow] = useState(false)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const form = new FormData(event.currentTarget)

    const obj = {
      userName: String(form.get("username")),
      password: String(form.get("password")),
    }

    const ok = await loginUser(obj)

    if (ok) {
      navigate("/")
    }
  }

  return (
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
              type={show ? "text" : "password"}
              placeholder="Password"
              className="w-full h-[64px] border border-[#B3B3B3] rounded-[4px] px-4 pt-4 pr-12 outline-none text-[16px]"
            />
            <p className="absolute -top-2 left-4 bg-white px-1 text-[14px] text-[#7D8184]">
              Password
            </p>

            <button
              type="button"
              onClick={() => setShow(!show)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7D8184]"
            >
              {show ? "🙈" : "👁"}
            </button>
          </div>

          {errorAuth && (
            <div className="bg-red-50 border border-red-200 text-[#DB4444] rounded-[4px] px-4 py-3 text-[14px]">
              {errorAuth}
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
            disabled={loadingAuth}
            className="w-full h-[64px] bg-[#DB4444] rounded-[4px] text-white text-[18px] font-[500] disabled:opacity-70"
          >
            {loadingAuth ? "Loading..." : "Log In"}
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
  )
}

export default Login