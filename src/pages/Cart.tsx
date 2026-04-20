import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Zustandlogic } from "../store/Zuntand"

const Cart = () => {
  const navigate = useNavigate()

  const cart = Zustandlogic((state: any) => state.cart)
  const loadingCart = Zustandlogic((state: any) => state.loadingCart)
  const errorCart = Zustandlogic((state: any) => state.errorCart)
  const getCart = Zustandlogic((state: any) => state.getCart)

  useEffect(() => {
    getCart()
  }, [])

  const total = cart.reduce((sum: number, e: any) => {
    const price = e.product?.price || e.price || 0
    const quantity = e.quantity || 1
    return sum + price * quantity
  }, 0)

  if (loadingCart) {
    return <div className="py-20 text-[24px] font-[600]">Loading...</div>
  }

  if (errorCart) {
    return (
      <div className="py-20">
        <p className="text-[#DB4444] text-[22px] font-[600] mb-4">{errorCart}</p>
        <button
          onClick={() => navigate("/login")}
          className="w-[160px] h-[46px] bg-[#DB4444] text-white rounded-[4px]"
        >
          Go Login
        </button>
      </div>
    )
  }

  return (
    <>
      <div className="pt-10 pb-20">
        <div className="flex items-center gap-3 text-[14px] text-[#7D8184] mb-16">
          <p onClick={() => navigate("/")} className="cursor-pointer">Home</p>
          <p>/</p>
          <p className="text-black">Cart</p>
        </div>

        <div className="hidden md:block">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_50px] h-[72px] items-center px-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] mb-10">
            <p>Product</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Subtotal</p>
            <p></p>
          </div>

          <div className="flex flex-col gap-8">
            {cart.map((e: any) => {
              const item = e.product || e
              const quantity = e.quantity || 1
              const price = item.price || 0

              return (
                <div
                  key={e.id || item.id}
                  className="grid grid-cols-[2fr_1fr_1fr_1fr_50px] h-[92px] items-center px-8 shadow-[0_0_20px_rgba(0,0,0,0.08)]"
                >
                  <div className="flex items-center gap-5">
                    <img
                      src={`https://store-api.softclub.tj/images/${item.image}`}
                      alt=""
                      className="w-[54px] h-[54px] object-contain"
                    />
                    <p className="text-[16px]">{item.productName}</p>
                  </div>

                  <p>${price}</p>

                  <select
                    defaultValue={quantity}
                    className="w-[72px] h-[44px] border border-[#B3B3B3] rounded-[4px] px-3 outline-none"
                  >
                    <option value="1">01</option>
                    <option value="2">02</option>
                    <option value="3">03</option>
                  </select>

                  <p className="font-[600]">${price * quantity}</p>

                  <button className="w-[22px] h-[22px] rounded-full bg-[#DB4444] text-white text-[14px] flex items-center justify-center">
                    ×
                  </button>
                </div>
              )
            })}
          </div>
        </div>

        <div className="md:hidden flex flex-col gap-5">
          {cart.map((e: any) => {
            const item = e.product || e
            const quantity = e.quantity || 1
            const price = item.price || 0

            return (
              <div
                key={e.id || item.id}
                className="p-4 shadow-[0_0_20px_rgba(0,0,0,0.08)] rounded-[4px]"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={`https://store-api.softclub.tj/images/${item.image}`}
                    alt=""
                    className="w-[70px] h-[70px] object-contain"
                  />
                  <div className="w-full">
                    <p className="text-[16px] font-[500]">{item.productName}</p>
                    <div className="flex justify-between mt-2">
                      <p>${price}</p>
                      <p className="font-[600]">${price * quantity}</p>
                    </div>
                  </div>
                  <button className="text-[#DB4444] text-[22px]">×</button>
                </div>

                <select
                  defaultValue={quantity}
                  className="w-full h-[44px] border border-[#B3B3B3] rounded-[4px] px-3 outline-none"
                >
                  <option value="1">01</option>
                  <option value="2">02</option>
                  <option value="3">03</option>
                </select>
              </div>
            )
          })}
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-10 mt-12">
          <div>
            <button
              onClick={() => navigate("/category")}
              className="w-[218px] h-[56px] border border-[#00000080] rounded-[4px] text-[16px] font-[500] mb-10"
            >
              Return To Shop
            </button>

            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Coupon Code"
                className="w-full sm:w-[300px] h-[56px] border border-[#00000080] rounded-[4px] px-5 outline-none"
              />
              <button className="w-full sm:w-[150px] h-[56px] border border-[#DB4444] text-[#DB4444] rounded-[4px]">
                Apply
              </button>
            </div>
          </div>

          <div className="w-full lg:w-[470px] border border-black rounded-[4px] p-6">
            <h2 className="text-[20px] font-[500] mb-6">Cart Total</h2>

            <div className="flex justify-between border-b pb-4 mb-4">
              <p>Subtotal:</p>
              <p>${total}</p>
            </div>

            <div className="flex justify-between border-b pb-4 mb-4">
              <p>Shipping:</p>
              <p>Free</p>
            </div>

            <div className="flex justify-between mb-6">
              <p className="font-[600]">Total:</p>
              <p className="font-[600]">${total}</p>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full sm:w-[260px] h-[56px] bg-[#DB4444] text-white rounded-[4px] block mx-auto"
            >
              Proceed to checkout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart