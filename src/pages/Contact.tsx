import React, { useState } from "react"
import { useNavigate } from "react-router-dom"

const Contact = () => {
  const navigate = useNavigate()
  const [openSuccess, setOpenSuccess] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setOpenSuccess(true)
    e.currentTarget.reset()
  }

  return (
    <>
      <div className="pt-10 pb-24">
        <div className="flex items-center gap-3 text-[14px] text-[#7D8184] mb-16">
          <p onClick={() => navigate("/")} className="cursor-pointer">
            Home
          </p>
          <p>/</p>
          <p className="text-black">Contact</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-8">
          <div className="bg-white rounded-[4px] shadow-[0_0_30px_rgba(0,0,0,0.08)] px-8 py-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-[40px] h-[40px] rounded-full bg-[#DB4444] flex items-center justify-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                  stroke="currentColor"
                  className="w-[22px] h-[22px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106a1.125 1.125 0 0 0-1.173.417l-.97 1.293a1.125 1.125 0 0 1-1.21.38 12.035 12.035 0 0 1-7.143-7.143 1.125 1.125 0 0 1 .38-1.21l1.293-.97c.363-.272.527-.739.417-1.173L6.963 3.102A1.125 1.125 0 0 0 5.872 2.25H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z"
                  />
                </svg>
              </div>

              <h2 className="text-[20px] font-[600] text-black">
                Call To Us
              </h2>
            </div>

            <p className="text-[14px] leading-[21px] text-black mb-4">
              We are available 24/7, 7 days a week.
            </p>

            <p className="text-[14px] leading-[21px] text-black">
              Phone: +992918601121
            </p>

            <div className="w-full h-[1px] bg-[#D9D9D9] my-8" />

            <div className="flex items-center gap-4 mb-6">
              <div className="w-[40px] h-[40px] rounded-full bg-[#DB4444] flex items-center justify-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.8"
                  stroke="currentColor"
                  className="w-[22px] h-[22px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5A2.25 2.25 0 0 1 19.5 19.5h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0l-7.5-4.615A2.25 2.25 0 0 1 2.25 6.993V6.75"
                  />
                </svg>
              </div>

              <h2 className="text-[20px] font-[600] text-black">
                Write To US
              </h2>
            </div>

            <p className="text-[14px] leading-[21px] text-black mb-4">
              Fill out our form and we will contact you within 24 hours.
            </p>

            <p className="text-[14px] leading-[21px] text-black mb-4">
              Emails: customer@exclusive.com
            </p>

            <p className="text-[14px] leading-[21px] text-black">
              Emails: support@exclusive.com
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-[4px] shadow-[0_0_30px_rgba(0,0,0,0.08)] px-6 md:px-10 py-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <input
                required
                type="text"
                placeholder="Name"
                className="w-full h-[56px] border border-[#D9D9D9] rounded-[4px] px-4 outline-none focus:border-[#DB4444]"
              />

              <input
                required
                type="email"
                placeholder="Email"
                className="w-full h-[56px] border border-[#D9D9D9] rounded-[4px] px-4 outline-none focus:border-[#DB4444]"
              />

              <input
                required
                type="text"
                placeholder="Phone"
                className="w-full h-[56px] border border-[#D9D9D9] rounded-[4px] px-4 outline-none focus:border-[#DB4444]"
              />
            </div>

            <textarea
              required
              placeholder="Your Message"
              className="w-full h-[200px] border border-[#D9D9D9] rounded-[4px] p-4 outline-none resize-none focus:border-[#DB4444] mb-8"
            />

            <div className="flex justify-end">
              <button
                type="submit"
                className="w-full sm:w-[215px] h-[56px] bg-[#DB4444] text-white rounded-[4px] text-[16px] font-[500] hover:bg-[#c83a3a] duration-200"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </div>

      {openSuccess && (
        <div className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-[430px] bg-white rounded-[18px] shadow-[0_20px_60px_rgba(0,0,0,0.25)] p-8 text-center relative">
            <button
              onClick={() => setOpenSuccess(false)}
              className="absolute top-4 right-5 text-[28px] text-[#7D8184] hover:text-black"
            >
              ×
            </button>

            <div className="w-[90px] h-[90px] rounded-full bg-[#E9FFF2] flex items-center justify-center mx-auto mb-6">
              <div className="w-[64px] h-[64px] rounded-full bg-[#00C853] flex items-center justify-center text-white">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.4"
                  stroke="currentColor"
                  className="w-[34px] h-[34px]"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m4.5 12.75 6 6 9-13.5"
                  />
                </svg>
              </div>
            </div>

            <h2 className="text-[28px] font-[700] text-black mb-3">
              Успешно отправлено!
            </h2>

            <p className="text-[16px] text-[#7D8184] leading-[24px] mb-7">
              Ваше сообщение принято. Мы свяжемся с вами в ближайшее время.
            </p>

            <button
              onClick={() => setOpenSuccess(false)}
              className="w-full h-[52px] bg-[#DB4444] text-white rounded-[6px] font-[500]"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </>
  )
}

export default Contact