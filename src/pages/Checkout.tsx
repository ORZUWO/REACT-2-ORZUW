import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Zustandlogic } from "../store/Zuntand"

const Checkout = () => {
  const navigate = useNavigate()

  const cart = Zustandlogic((state: any) => state.cart)
  const getCart = Zustandlogic((state: any) => state.getCart)

  const [openSuccess, setOpenSuccess] = useState(false)

  useEffect(() => {
    getCart()
  }, [])

  const total = cart.reduce((sum: number, e: any) => {
    const item = e.product || e
    const quantity = e.quantity || 1
    return sum + (item.price || 0) * quantity
  }, 0)




  

  function placeOrder() {
    setOpenSuccess(true)
  }

  return (
    <>
      <div className="pt-10 pb-20">
        <div className="flex items-center gap-3 text-[14px] text-[#7D8184] mb-14">
          <p onClick={() => navigate("/category")} className="cursor-pointer">
            Product
          </p>
          <p>/</p>
          <p onClick={() => navigate("/cart")} className="cursor-pointer">
            View Cart
          </p>
          <p>/</p>
          <p className="text-black">CheckOut</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_520px] gap-16">
          <div>
            <h1 className="text-[36px] font-[500] tracking-[0.04em] mb-8">
              Billing Details
            </h1>

            <div className="bg-white shadow-[0_0_25px_rgba(0,0,0,0.08)] rounded-[4px] p-5 flex flex-col gap-4">
              <input
                className="h-[56px] border border-[#D9D9D9] rounded-[4px] px-4 outline-none"
                placeholder="First name"
              />

              <input
                className="h-[56px] border border-[#D9D9D9] rounded-[4px] px-4 outline-none"
                placeholder="Last name"
              />

              <input
                className="h-[56px] border border-[#D9D9D9] rounded-[4px] px-4 outline-none"
                placeholder="Street address"
              />

              <input
                className="h-[56px] border border-[#D9D9D9] rounded-[4px] px-4 outline-none"
                placeholder="Apartment, floor, etc. (optional)"
              />

              <input
                className="h-[56px] border border-[#D9D9D9] rounded-[4px] px-4 outline-none"
                placeholder="Town / City"
              />

              <input
                className="h-[56px] border border-[#D9D9D9] rounded-[4px] px-4 outline-none"
                placeholder="Phone number"
              />

              <input
                className="h-[56px] border border-[#D9D9D9] rounded-[4px] px-4 outline-none"
                placeholder="Email address"
              />

              <label className="flex items-start gap-3 text-[16px]">
                <input
                  type="checkbox"
                  defaultChecked
                  className="mt-1 accent-[#DB4444]"
                />
                Save this information for faster check-out next time
              </label>
            </div>
          </div>

          <div className="pt-2">
            <div className="flex flex-col gap-5 mb-8">
              {cart.map((e: any) => {
                const item = e.product || e
                const quantity = e.quantity || 1

                return (
                  <div
                    key={e.id || item.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={`https://store-api.softclub.tj/images/${item.image}`}
                        alt=""
                        className="w-[54px] h-[54px] object-contain"
                      />
                      <p>{item.productName}</p>
                    </div>

                    <p>${(item.price || 0) * quantity}</p>
                  </div>
                )
              })}
            </div>

            <div className="flex justify-between border-b pb-4 mb-4">
              <p>Subtotal:</p>
              <p>${total}</p>
            </div>

            <div className="flex justify-between border-b pb-4 mb-4">
              <p>Shipping:</p>
              <p>Free</p>
            </div>

            <div className="flex justify-between mb-8">
              <p className="font-[600]">Total:</p>
              <p className="font-[600] text-[20px]">${total}</p>
            </div>

            <div className="flex flex-col gap-5 mb-8">
              <label className="flex items-center gap-3">
                <input type="radio" name="pay" className="w-[20px] h-[20px]" />
                Bank
              </label>

              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="pay"
                  defaultChecked
                  className="w-[20px] h-[20px]"
                />
                Cash on delivery
              </label>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <input
                placeholder="Coupon Code"
                className="w-full h-[56px] border border-[#D9D9D9] rounded-[4px] px-5 outline-none"
              />

              <button className="w-full sm:w-[150px] h-[56px] border border-[#DB4444] text-[#DB4444] rounded-[4px]">
                Apply
              </button>
            </div>

            <button
              onClick={placeOrder}
              className="w-[190px] h-[56px] bg-[#DB4444] rounded-[4px] text-white text-[16px] font-[500] hover:bg-[#c83a3a] duration-200"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>

      {openSuccess && (
        <div className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-[460px] bg-white rounded-[18px] shadow-[0_20px_60px_rgba(0,0,0,0.25)] p-8 relative text-center">
            <button
              onClick={() => setOpenSuccess(false)}
              className="absolute top-4 right-5 text-[28px] text-[#7D8184] hover:text-black"
            >
              ×
            </button>

            <div className="w-[92px] h-[92px] rounded-full bg-[#E9FFF2] flex items-center justify-center mx-auto mb-6">
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
              Заказ успешно принят!
            </h2>

            <p className="text-[16px] text-[#7D8184] leading-[24px] mb-6">
              Спасибо за покупку. Ваш заказ принят, скоро мы свяжемся с вами.
            </p>

            <div className="bg-[#F8F8F8] rounded-[12px] p-4 mb-7">
              <div className="flex items-center justify-between mb-3">
                <p className="text-[#7D8184]">Order total</p>
                <p className="font-[700] text-[20px] text-[#DB4444]">
                  ${total}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-[#7D8184]">Payment</p>
                <p className="font-[500]">Cash on delivery</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setOpenSuccess(false)
                  navigate("/cart")
                }}
                className="h-[52px] border border-[#DB4444] text-[#DB4444] rounded-[6px] font-[500]"
              >
                View Cart
              </button>

              <button
                onClick={() => {
                  setOpenSuccess(false)
                  navigate("/")
                }}
                className="h-[52px] bg-[#DB4444] text-white rounded-[6px] font-[500]"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Checkout