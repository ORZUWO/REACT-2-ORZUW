import { useNavigate, useParams } from "react-router-dom"
import star from "../images/star.svg"
import { Zustandlogic } from "../store/Zuntand"
import { useEffect, useState } from "react"

const Info = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const data = Zustandlogic((state: any) => state.data)
  const getData = Zustandlogic((state: any) => state.getData)
  const addToCart = Zustandlogic((state: any) => state.addToCart)
  const loadingCartId = Zustandlogic((state: any) => state.loadingCartId)

  const e = data.find((el: any) => String(el.id) === String(id))

  const [cnt, setCnt] = useState(1)
  const [like, setLike] = useState<number[]>([])

  useEffect(() => {
    getData()

    const saved = localStorage.getItem("like")
    setLike(saved ? JSON.parse(saved) : [])
  }, [])

  function decCnt() {
    if (cnt > 1) {
      setCnt(cnt - 1)
    }
  }

  function incCnt() {
    setCnt(cnt + 1)
  }

  function clickLike(id: number) {
    let newLike: number[] = []

    if (like.includes(id)) {
      newLike = like.filter((item) => item !== id)
    } else {
      newLike = [...like, id]
    }

    setLike(newLike)
    localStorage.setItem("like", JSON.stringify(newLike))
    window.dispatchEvent(new Event("wishlistUpdated"))
  }

  async function buyNow() {
    if (!e?.id) return

    for (let i = 0; i < cnt; i++) {
      await addToCart(e.id)
    }

    navigate("/cart")
  }

  if (!e) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <p className="text-[30px] font-[600]">Loading...</p>
      </div>
    )
  }

  return (
    <>
      <div className="pt-10">
        <div className="flex items-center gap-3 text-[14px] text-[#7D8184] mb-10">
          <p onClick={() => navigate("/")} className="cursor-pointer">
            Account
          </p>
          <p>/</p>
          <p onClick={() => navigate("/category")} className="cursor-pointer">
            Gaming
          </p>
          <p>/</p>
          <p className="text-black">{e.productName}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[170px_500px_1fr] gap-8">
          <div className="flex lg:flex-col gap-4 overflow-x-auto">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="min-w-[170px] w-[170px] h-[138px] bg-[#F5F5F5] rounded-[4px] flex items-center justify-center"
              >
                <img
                  src={`https://store-api.softclub.tj/images/${e.image}`}
                  alt=""
                  className="max-w-[121px] max-h-[114px] object-contain"
                />
              </div>
            ))}
          </div>

          <div className="w-full h-[600px] bg-[#F5F5F5] rounded-[4px] flex items-center justify-center">
            <img
              src={`https://store-api.softclub.tj/images/${e.image}`}
              alt=""
              className="max-w-[446px] max-h-[315px] object-contain"
            />
          </div>

          <div>
            <h2 className="text-[24px] font-[600] mb-4">{e.productName}</h2>

            <div className="flex items-center gap-3 mb-4 flex-wrap">
              <div className="flex items-center gap-1">
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
                <img src={star} alt="" />
              </div>

              <p className="text-[#7D8184] text-[14px]">(150 Reviews)</p>
              <p className="text-[#00FF66] text-[14px]">In Stock</p>
            </div>

            <p className="text-[24px] font-[400] mb-4">${e.price}.00</p>

            <p className="text-[14px] leading-[21px] text-black border-b border-[#B3B3B3] pb-6 mb-6">
              {e.description ||
                "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive."}
            </p>

            <div className="flex items-center gap-4 mb-6">
              <p className="text-[20px] font-[400]">Colours:</p>
              <div className="w-[20px] h-[20px] rounded-full bg-[#A0BCE0]" />
              <div className="w-[20px] h-[20px] rounded-full bg-[#E07575]" />
            </div>

            <div className="flex items-center gap-4 mb-6">
              <p className="text-[20px] font-[400]">Size:</p>

              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className={`w-[32px] h-[32px] border rounded-[4px] text-[14px] ${
                    size === "M" ? "bg-[#DB4444] text-white border-[#DB4444]" : ""
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4 mb-10 flex-wrap">
              <div className="flex items-center">
                <button
                  onClick={decCnt}
                  className="w-[44px] h-[44px] border border-[#B3B3B3] text-[24px] hover:bg-[#DB4444] hover:text-white duration-200"
                >
                  -
                </button>

                <div className="w-[80px] h-[44px] border-t border-b border-[#B3B3B3] flex items-center justify-center text-[20px] font-[500]">
                  {cnt}
                </div>

                <button
                  onClick={incCnt}
                  className="w-[44px] h-[44px] border border-[#B3B3B3] text-[24px] hover:bg-[#DB4444] hover:text-white duration-200"
                >
                  +
                </button>
              </div>

              <button
                onClick={buyNow}
                disabled={loadingCartId === e.id}
                className="w-[165px] h-[44px] bg-[#DB4444] text-white rounded-[4px] disabled:opacity-60"
              >
                {loadingCartId === e.id ? "Loading..." : "Buy Now"}
              </button>

              <button
                onClick={() => clickLike(e.id)}
                className={`w-[44px] h-[44px] rounded-[4px] flex items-center justify-center border duration-300 ${
                  like.includes(e.id)
                    ? "bg-[#DB4444] border-[#DB4444]"
                    : "bg-white border-[#B3B3B3] hover:bg-[#DB4444] hover:border-[#DB4444]"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={like.includes(e.id) ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  strokeWidth="1.7"
                  stroke="currentColor"
                  className={`w-[22px] h-[22px] duration-300 ${
                    like.includes(e.id)
                      ? "text-white"
                      : "text-black hover:text-white"
                  }`}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                  />
                </svg>
              </button>
            </div>

            <div className="border rounded-[4px] overflow-hidden">
              <div className="p-4 border-b">
                <p className="text-[16px] font-[500] mb-1">Free Delivery</p>
                <p className="text-[12px]">
                  Enter your postal code for Delivery Availability
                </p>
              </div>

              <div className="p-4">
                <p className="text-[16px] font-[500] mb-1">Return Delivery</p>
                <p className="text-[12px]">
                  Free 30 Days Delivery Returns. Details
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Info