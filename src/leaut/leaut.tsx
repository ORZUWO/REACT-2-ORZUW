import { Link, NavLink, Outlet, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import logo from "../images/logo.svg"
import kar from "../images/karzina.svg"
import user from "../images/user.svg"

import send from "../images/send.svg"
import facebook from "../images/facebook.svg"
import twitter from "../images/twitter.svg"
import instagram from "../images/instagram.svg"
import linkedin from "../images/linkedin.svg"

const Leaut = () => {
  const navigate = useNavigate()

  const [like, setlike] = useState<number[]>([])
  const [openProfile, setOpenProfile] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem("like")
    setlike(saved ? JSON.parse(saved) : [])
  }, [])

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-[100] bg-white/95 backdrop-blur-md border-b border-[#E5E5E5] shadow-sm">
        <div className="max-w-[1400px] mx-auto h-[94px] px-6 flex items-center justify-between">
          <div className="flex items-center gap-[140px]">
            <Link to="/">
              <img src={logo} alt="" className="w-[140px]" />
            </Link>

            <nav className="hidden md:flex items-center gap-12">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive
                    ? "text-[16px] font-[400] text-black border-b border-black pb-1"
                    : "text-[16px] font-[400] text-black"
                }
              >
                Home
              </NavLink>

              <NavLink
                to="/contact"
                className={({ isActive }) =>
                  isActive
                    ? "text-[16px] font-[400] text-black border-b border-black pb-1"
                    : "text-[16px] font-[400] text-black"
                }
              >
                Contact
              </NavLink>

             <NavLink
  to="/about"
  className={({ isActive }) =>
    isActive
      ? "text-[16px] font-[400] text-black border-b border-black pb-1"
      : "text-[16px] font-[400] text-black"
  }
>
  About
</NavLink>

              <NavLink
                to="/signup"
                className={({ isActive }) =>
                  isActive
                    ? "text-[16px] font-[400] text-black border-b border-black pb-1"
                    : "text-[16px] font-[400] text-black"
                }
              >
                Sign Up
              </NavLink>
            </nav>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <div className="w-[280px] h-[42px] bg-[#F5F5F5] rounded-[6px] px-5 flex items-center justify-between border border-transparent focus-within:border-[#DB4444] duration-200">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="w-full bg-transparent outline-none text-[12px] font-[400] placeholder:text-black"
              />
              <span className="text-[18px] text-black">⌕</span>
            </div>

            <div className="flex items-center gap-5">
              <button
                onClick={() => navigate("/wishlist")}
                className="relative cursor-pointer w-[24px] h-[24px] flex items-center justify-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={like.length ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className={`size-6 duration-200 ${like.length ? "text-red-500" : "text-black"}`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>

                {like.length > 0 && (
                  <span className="absolute -top-1 -right-2 w-[17px] h-[17px] rounded-full bg-[#DB4444] text-white text-[10px] flex items-center justify-center">
                    {like.length}
                  </span>
                )}
              </button>

              <button onClick={() => navigate("/cart")} className="relative cursor-pointer">
  <img src={kar} alt="" className="w-[27px] h-[27px]" />
  <span className="absolute -top-1 -right-2 w-[17px] h-[17px] rounded-full bg-[#DB4444] text-white text-[10px] flex items-center justify-center">
    2
  </span>
</button>

              <div className="relative">
                <button
                  onClick={() => setOpenProfile(!openProfile)}
                  className={`w-[42px] h-[42px] rounded-full flex items-center justify-center duration-200 ${
                    openProfile ? "bg-[#DB4444]" : "bg-transparent"
                  }`}
                >
                  <img
                    src={user}
                    alt=""
                    className={`w-[25px] h-[25px] ${openProfile ? "brightness-0 invert" : ""}`}
                  />
                </button>

                {openProfile && (
                  <div className="absolute top-[56px] right-0 w-[230px] rounded-[4px] overflow-hidden bg-black/80 backdrop-blur-md text-white shadow-[0_8px_30px_rgba(0,0,0,0.35)] z-[200]">
                    <button
                      onClick={() => {
                        setOpenProfile(false)
                        navigate("/account")
                      }}
                      className="w-full h-[64px] px-6 flex items-center gap-4 text-[20px] font-[400] hover:bg-white/10 duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-[28px] h-[28px]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0"
                        />
                      </svg>
                      Account
                    </button>

                    <button
                      onClick={() => {
                        setOpenProfile(false)
                        navigate("/order")
                      }}
                      className="w-full h-[64px] px-6 flex items-center gap-4 text-[20px] font-[400] hover:bg-white/10 duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-[28px] h-[28px]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12A1.5 1.5 0 0 1 19.376 22H4.624a1.5 1.5 0 0 1-1.493-1.493l1.263-12A1.5 1.5 0 0 1 5.887 7.25h12.226a1.5 1.5 0 0 1 1.493 1.257Z"
                        />
                      </svg>
                      My Order
                    </button>

                    <button
                      onClick={() => {
                      localStorage.removeItem("store_token")
localStorage.removeItem("userName")
navigate("/login")
                      }}
                      className="w-full h-[64px] px-6 flex items-center gap-4 text-[20px] font-[400] hover:bg-white/10 duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-[28px] h-[28px]"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6A2.25 2.25 0 0 0 5.25 5.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
                        />
                      </svg>
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          <button className="md:hidden text-[24px]">☰</button>
        </div>
      </header>

      <main className="min-h-[70vh] max-w-[1400px] mx-auto px-6 pt-[120px]">
        <Outlet />
      </main>

      <footer className="bg-black text-white mt-20">
        <div className="max-w-[1400px] mx-auto px-6 pt-20 pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[#2A2A2A]">
            <div>
              <h2 className="text-[24px] font-[700] mb-6">Exclusive</h2>
              <p className="text-[20px] font-[500] mb-6">Subscribe</p>
              <p className="text-[16px] font-[400] mb-4">Get 10% off your first order</p>

              <div className="w-full max-w-[217px] h-[48px] border border-white rounded-[4px] px-4 flex items-center justify-between">
                <input
                  type="text"
                  placeholder="Enter your email"
                  className="bg-transparent outline-none text-[16px] w-full placeholder:text-[#7D7D7D]"
                />
                <img src={send} alt="" className="w-[24px] h-[24px]" />
              </div>
            </div>

            <div>
              <h2 className="text-[24px] font-[500] mb-6">Support</h2>
              <p className="text-[16px] font-[400] leading-[24px] mb-4">
                111 Bijoy sarani, Dhaka,
                <br />
                DH 1515, Bangladesh.
              </p>
              <p className="text-[16px] font-[400] mb-4">exclusive@gmail.com</p>
              <p className="text-[16px] font-[400]">+88015-88888-9999</p>
            </div>

            <div>
              <h2 className="text-[24px] font-[500] mb-6">Account</h2>
              <div className="flex flex-col gap-4">
                <p className="text-[16px] font-[400]">My Account</p>
                <p className="text-[16px] font-[400]">Cart</p>
                <p className="text-[16px] font-[400]">Wishlist</p>
                <p className="text-[16px] font-[400]">Shop</p>
              </div>
            </div>

            <div>
              <h2 className="text-[24px] font-[500] mb-6">Quick Link</h2>
              <div className="flex flex-col gap-4">
                <p className="text-[16px] font-[400]">Privacy Policy</p>
                <p className="text-[16px] font-[400]">Terms Of Use</p>
                <p className="text-[16px] font-[400]">FAQ</p>
                <p className="text-[16px] font-[400]">Contact</p>
              </div>
            </div>

            <div>
              <h2 className="text-[24px] font-[500] mb-6">Social</h2>
              <div className="flex items-center gap-6">
                <img src={facebook} alt="" className="w-[24px] h-[24px]" />
                <img src={twitter} alt="" className="w-[24px] h-[24px]" />
                <img src={instagram} alt="" className="w-[24px] h-[24px]" />
                <img src={linkedin} alt="" className="w-[24px] h-[24px]" />
              </div>
            </div>
          </div>

          <div className="pt-8 flex justify-center">
            <p className="text-[#7D7D7D] text-[16px] font-[400]">
              © Copyright Rimel 2022. All right reserved
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Leaut