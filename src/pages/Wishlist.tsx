import React, { useEffect, useState } from "react"
import eye from "../images/eye.svg"
import star from "../images/star.svg"
import { Zustandlogic } from "../store/Zuntand"
import { useNavigate } from "react-router-dom"

const Wishlist = () => {
  const navigate = useNavigate()

  const data = Zustandlogic((state: any) => state.data)
  const loading = Zustandlogic((state: any) => state.loading)
  const error = Zustandlogic((state: any) => state.error)
  const getData = Zustandlogic((state: any) => state.getData)

  const addToCart = Zustandlogic((state: any) => state.addToCart)
  const loadingCartId = Zustandlogic((state: any) => state.loadingCartId)
  const cartMessage = Zustandlogic((state: any) => state.cartMessage)

  const [like, setlike] = useState<number[]>(() => {
    const saved = localStorage.getItem("like")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    if (!data.length) {
      getData()
    }
  }, [])

  useEffect(() => {
    if (cartMessage === "success") {
      alert("Added to cart")
    }

    if (cartMessage === "error") {
      alert("Add to cart error. If 401, login/token required")
    }
  }, [cartMessage])

  function deleteLike(id: number) {
    const newLike = like.filter((e) => e !== id)
    setlike(newLike)
    localStorage.setItem("like", JSON.stringify(newLike))
  }

  const wishlistData = data.filter((e: any) => like.includes(e.id))
  const justForYou = data.filter((e: any) => !like.includes(e.id)).slice(0, 4)

  if (loading) {
    return <div className="py-10 text-[24px] font-[600]">Loading...</div>
  }

  if (error) {
    return <div className="py-10 text-[24px] font-[600] text-red-500">{error}</div>
  }

  return (
    <>
      <div className="pt-10 pb-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-[20px] font-[400] text-black">Wishlist ({wishlistData.length})</h2>

          <button className="w-[223px] h-[56px] border border-[#00000080] rounded-[4px] text-[16px] font-[500]">
            Move All To Bag
          </button>
        </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {wishlistData.map((e: any) => (
              <div key={e.id}>
                <div className="relative bg-[#F5F5F5] rounded-[4px] h-[250px] overflow-hidden">
                  {e.hasDiscount && (
                    <div className="absolute top-3 left-3 z-10 bg-[#DB4444] text-white text-[12px] px-3 py-1 rounded-[4px]">
                      -{e.discountPrice}%
                    </div>
                  )}

                  <button
                    onClick={() => deleteLike(e.id)}
                    className="absolute top-3 right-3 z-10 w-[34px] h-[34px] rounded-full bg-white flex items-center justify-center"
                  >
                    🗑
                  </button>

                  <div className="h-[209px] flex items-center justify-center p-4">
                    <img
                      src={`https://store-api.softclub.tj/images/${e.image}`}
                      alt=""
                      className="max-w-[190px] max-h-[180px] object-contain"
                    />
                  </div>

                  <button
                    onClick={() => addToCart(e.id)}
                    className="w-full h-[41px] bg-black text-white text-[16px] font-[500]"
                  >
                    {loadingCartId === e.id ? "Loading..." : "Add To Cart"}
                  </button>
                </div>

                <div className="pt-4">
                  <h3 className="text-[16px] font-[500] leading-[24px] text-black mb-2 line-clamp-1">
                    {e.productName}
                  </h3>

                  <div className="flex items-center gap-3">
                    <p className="text-[#DB4444] text-[16px] font-[500]">${e.price}</p>
                    {e.hasDiscount && (
                      <p className="text-[#7D8184] text-[16px] font-[500] line-through">
                        ${Math.round(e.price + (e.price * e.discountPrice) / 100)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

        <div className="pt-20">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-4">
              <div className="w-[20px] h-[40px] bg-[#DB4444] rounded-[4px]" />
              <p className="text-[20px] font-[400] text-black">Just For You</p>
            </div>

            <button
              onClick={() => navigate("/category")}
              className="w-[150px] h-[56px] border border-[#00000080] rounded-[4px] text-[16px] font-[500]"
            >
              See All
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {justForYou.map((e: any) => (
              <div key={e.id}>
                <div className="relative bg-[#F5F5F5] rounded-[4px] h-[250px] overflow-hidden">
                  {e.hasDiscount && (
                    <div className="absolute top-3 left-3 z-10 bg-[#DB4444] text-white text-[12px] px-3 py-1 rounded-[4px]">
                      -{e.discountPrice}%
                    </div>
                  )}

                  <button
                    onClick={() => navigate(`/info/${e.id}`)}
                    className="absolute top-3 right-3 z-10 w-[34px] h-[34px] rounded-full bg-white flex items-center justify-center"
                  >
                    <img src={eye} alt="" />
                  </button>

                  <div className="h-[209px] flex items-center justify-center p-4">
                    <img
                      src={`https://store-api.softclub.tj/images/${e.image}`}
                      alt=""
                      className="max-w-[190px] max-h-[180px] object-contain"
                    />
                  </div>

                  <button
                    onClick={() => addToCart(e.id)}
                    className="w-full h-[41px] bg-black text-white text-[16px] font-[500]"
                  >
                    {loadingCartId === e.id ? "Loading..." : "Add To Cart"}
                  </button>
                </div>

                <div className="pt-4">
                  <h3 className="text-[16px] font-[500] leading-[24px] text-black mb-2 line-clamp-1">
                    {e.productName}
                  </h3>

                  <div className="flex items-center gap-3 mb-2">
                    <p className="text-[#DB4444] text-[16px] font-[500]">${e.price}</p>
                    {e.hasDiscount && (
                      <p className="text-[#7D8184] text-[16px] font-[500] line-through">
                        ${Math.round(e.price + (e.price * e.discountPrice) / 100)}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center gap-1">
                    <img src={star} alt="" className="w-[20px] h-[20px]" />
                    <img src={star} alt="" className="w-[20px] h-[20px]" />
                    <img src={star} alt="" className="w-[20px] h-[20px]" />
                    <img src={star} alt="" className="w-[20px] h-[20px]" />
                    <img src={star} alt="" className="w-[20px] h-[20px]" />
                    <p className="text-[#7D8184] text-[14px] font-[600] ml-2">(65)</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default Wishlist