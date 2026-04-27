import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Zustandlogic } from "../store/Zuntand"

const Cart = () => {
  const navigate = useNavigate()

  // Достаем данные и функции из стора
  const cart = Zustandlogic((state: any) => state.cart)
  const loadingCart = Zustandlogic((state: any) => state.loadingCart)
  const errorCart = Zustandlogic((state: any) => state.errorCart)
  const getCart = Zustandlogic((state: any) => state.getCart)

  const [counts, setCounts] = useState<any>({})
  const [cartData, setCartData] = useState<any[]>([])

  useEffect(() => {
    getCart()
  }, [])

  // Синхронизация: приоритет отдаем localStorage, если там пусто — берем из Zustand
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    let currentCart = []

    if (savedCart && JSON.parse(savedCart).length > 0) {
      currentCart = JSON.parse(savedCart)
    } else {
      currentCart = cart
    }

    setCartData(currentCart)

    const obj: any = {}
    currentCart.forEach((e: any) => {
      const item = e.product || e
      const key = e.id || item.id
      obj[key] = e.quantity || 1
    })
    setCounts(obj)
  }, [cart])

  // Функция для сохранения изменений в localStorage
  const updateLocalStorage = (newData: any[]) => {
    localStorage.setItem("cart", JSON.stringify(newData))
  }

  function plus(id: any) {
    const newCount = (counts[id] || 1) + 1
    const newCounts = { ...counts, [id]: newCount }
    setCounts(newCounts)

    const updatedData = cartData.map((e) => {
      const key = e.id || (e.product && e.product.id)
      return key === id ? { ...e, quantity: newCount } : e
    })
    setCartData(updatedData)
    updateLocalStorage(updatedData)
  }

  function minus(id: any) {
    if (counts[id] <= 1) return
    const newCount = counts[id] - 1
    const newCounts = { ...counts, [id]: newCount }
    setCounts(newCounts)

    const updatedData = cartData.map((e) => {
      const key = e.id || (e.product && e.product.id)
      return key === id ? { ...e, quantity: newCount } : e
    })
    setCartData(updatedData)
    updateLocalStorage(updatedData)
  }

  // --- УДАЛЕНИЕ ОДНОГО ТОВАРА ---
  function deleteItem(id: any) {
    const updatedData = cartData.filter((e) => {
      const key = e.id || (e.product && e.product.id)
      return key !== id
    })

    setCartData(updatedData)
    updateLocalStorage(updatedData)
    
    // Обновляем Zustand, чтобы в хедере и других местах цифра тоже изменилась
    Zustandlogic.setState({ cart: updatedData })
    
    const newCounts = { ...counts }
    delete newCounts[id]
    setCounts(newCounts)
  }

  // --- ПОЛНАЯ ОЧИСТКА ---
  function clearAllCart() {
    localStorage.removeItem("cart")
    setCartData([])
    setCounts({})
    // Очищаем глобальный стейт, чтобы useEffect не подтянул старые данные
    Zustandlogic.setState({ cart: [] })
  }

  const total = cartData.reduce((sum: number, e: any) => {
    const item = e.product || e
    const key = e.id || item.id
    const price = item.price || 0
    const quantity = counts[key] || 1

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

        {/* Desktop Version */}
        <div className="hidden md:block">
          <div className="grid grid-cols-[2fr_1fr_1fr_1fr_50px] h-[72px] items-center px-8 shadow-[0_0_20px_rgba(0,0,0,0.08)] mb-10">
            <p>Product</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Subtotal</p>
            <p></p>
          </div>

          <div className="flex flex-col gap-8">
            {cartData.map((e: any) => {
              const item = e.product || e
              const key = e.id || item.id
              const quantity = counts[key] || 1
              const price = item.price || 0

              return (
                <div key={key} className="grid grid-cols-[2fr_1fr_1fr_1fr_50px] h-[92px] items-center px-8 shadow-[0_0_20px_rgba(0,0,0,0.08)]">
                  <div className="flex items-center gap-5">
                    <img src={`https://store-api.softclub.tj/images/${item.image}`} alt="" className="w-[54px] h-[54px] object-contain" />
                    <p className="text-[16px]">{item.productName}</p>
                  </div>
                  <p>${price}</p>
                  <div className="flex items-center">
                    <button onClick={() => minus(key)} className="w-[38px] h-[38px] border border-[#B3B3B3] text-[22px] flex items-center justify-center hover:bg-[#DB4444] hover:text-white duration-200">-</button>
                    <div className="w-[54px] h-[38px] border-t border-b border-[#B3B3B3] flex items-center justify-center text-[16px] font-[500]">
                      {String(quantity).padStart(2, "0")}
                    </div>
                    <button onClick={() => plus(key)} className="w-[38px] h-[38px] border border-[#B3B3B3] text-[22px] flex items-center justify-center hover:bg-[#DB4444] hover:text-white duration-200">+</button>
                  </div>
                  <p className="font-[600]">${price * quantity}</p>
                  <button onClick={() => deleteItem(key)} className="w-[22px] h-[22px] rounded-full bg-[#DB4444] text-white text-[14px] flex items-center justify-center">×</button>
                </div>
              )
            })}
          </div>
        </div>

        {/* Mobile Version */}
        <div className="md:hidden flex flex-col gap-5">
          {cartData.map((e: any) => {
            const item = e.product || e
            const key = e.id || item.id
            const quantity = counts[key] || 1
            const price = item.price || 0

            return (
              <div key={key} className="p-4 shadow-[0_0_20px_rgba(0,0,0,0.08)] rounded-[4px]">
                <div className="flex items-center gap-4 mb-4">
                  <img src={`https://store-api.softclub.tj/images/${item.image}`} alt="" className="w-[70px] h-[70px] object-contain" />
                  <div className="w-full">
                    <p className="text-[16px] font-[500]">{item.productName}</p>
                    <div className="flex justify-between mt-2">
                      <p>${price}</p>
                      <p className="font-[600]">${price * quantity}</p>
                    </div>
                  </div>
                  <button onClick={() => deleteItem(key)} className="text-[#DB4444] text-[26px]">×</button>
                </div>
                <div className="flex items-center w-full">
                  <button onClick={() => minus(key)} className="w-[44px] h-[44px] border border-[#B3B3B3] text-[22px] flex items-center justify-center">-</button>
                  <div className="flex-1 h-[44px] border-t border-b border-[#B3B3B3] flex items-center justify-center text-[16px] font-[500]">
                    {String(quantity).padStart(2, "0")}
                  </div>
                  <button onClick={() => plus(key)} className="w-[44px] h-[44px] border border-[#B3B3B3] text-[22px] flex items-center justify-center">+</button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer Actions */}
        <div className="flex flex-col lg:flex-row justify-between gap-10 mt-12">
          <div>
            <div className="flex gap-4 flex-wrap mb-10">
              <button onClick={() => navigate("/category")} className="w-[218px] h-[56px] border border-[#00000080] rounded-[4px] text-[16px] font-[500]">Return To Shop</button>
              <button onClick={clearAllCart} className="w-[160px] h-[56px] border border-[#DB4444] text-[#DB4444] rounded-[4px] text-[16px] font-[500] hover:bg-[#DB4444] hover:text-white duration-200">Clear All</button>
            </div>
          </div>

          <div className="w-full lg:w-[470px] border border-black rounded-[4px] p-6">
            <h2 className="text-[20px] font-[500] mb-6">Cart Total</h2>
            <div className="flex justify-between border-b pb-4 mb-4"><p>Subtotal:</p><p>${total}</p></div>
            <div className="flex justify-between border-b pb-4 mb-4"><p>Shipping:</p><p>Free</p></div>
            <div className="flex justify-between mb-6"><p className="font-[600]">Total:</p><p className="font-[600]">${total}</p></div>
            <button onClick={() => navigate("/checkout")} className="w-full sm:w-[260px] h-[56px] bg-[#DB4444] text-white rounded-[4px] block mx-auto">Proceed to checkout</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Cart