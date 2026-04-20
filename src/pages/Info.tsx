import { useNavigate, useParams } from "react-router-dom"
import dil from "../images/dil.svg"
import star from "../images/star.svg"
import { Zustandlogic } from "../store/Zuntand"

const Info = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const data = Zustandlogic((state: any) => state.data)
  const e = data.find((el: any) => String(el.id) == String(id))



  if (!e) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-10">
        <p className="text-[30px] font-[600]">Not Found {id}</p>
      </div>
    )
  }

  return (
    <>
      <div className="pt-10">
        <div className="flex items-center gap-3 text-[14px] text-[#7D8184] mb-10">
          <p onClick={() => navigate("/")} className="cursor-pointer">Account</p>
          <p>/</p>
          <p onClick={() => navigate("/")} className="cursor-pointer">Gaming</p>
          <p>/</p>
          <p className="text-black">{e.productName}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[170px_500px_1fr] gap-8">
          <div className="flex lg:flex-col gap-4">
            <div className="w-[170px] h-[138px] bg-[#F5F5F5] rounded-[4px] flex items-center justify-center">
              <img
                src={`https://store-api.softclub.tj/images/${e.image}`}
                alt=""
                className="max-w-[121px] max-h-[114px] object-contain"
              />
            </div>
            <div className="w-[170px] h-[138px] bg-[#F5F5F5] rounded-[4px] flex items-center justify-center">
              <img
                src={`https://store-api.softclub.tj/images/${e.image}`}
                alt=""
                className="max-w-[121px] max-h-[114px] object-contain"
              />
            </div>
            <div className="w-[170px] h-[138px] bg-[#F5F5F5] rounded-[4px] flex items-center justify-center">
              <img
                src={`https://store-api.softclub.tj/images/${e.image}`}
                alt=""
                className="max-w-[121px] max-h-[114px] object-contain"
              />
            </div>
            <div className="w-[170px] h-[138px] bg-[#F5F5F5] rounded-[4px] flex items-center justify-center">
              <img
                src={`https://store-api.softclub.tj/images/${e.image}`}
                alt=""
                className="max-w-[121px] max-h-[114px] object-contain"
              />
            </div>
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

            <div className="flex items-center gap-3 mb-4">
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

            <p className="text-[14px] leading-[a21px] text-black border-b border-[#B3B3B3] pb-6 mb-6">
              PlayStation 5 Controller Skin High quality vinyl with air channel adhesive
              for easy bubble free install & mess free removal Pressure sensitive.
            </p>

            <div className="flex items-center gap-4 mb-6">
              <p className="text-[20px] font-[400]">Colours:</p>
              <div className="w-[20px] h-[20px] rounded-full bg-[#A0BCE0]" />
              <div className="w-[20px] h-[20px] rounded-full bg-[#E07575]" />
            </div>

            <div className="flex items-center gap-4 mb-6">
              <p className="text-[20px] font-[400]">Size:</p>
              <button className="w-[32px] h-[32px] border rounded-[4px] text-[14px]">XS</button>
              <button className="w-[32px] h-[32px] border rounded-[4px] text-[14px]">S</button>
              <button className="w-[32px] h-[32px] bg-[#DB4444] text-white rounded-[4px] text-[14px]">M</button>
              <button className="w-[32px] h-[32px] border rounded-[4px] text-[14px]">L</button>
              <button className="w-[32px] h-[32px] border rounded-[4px] text-[14px]">XL</button>
            </div>

            <div className="flex items-center gap-4 mb-10">
              <div className="flex items-center">
                <button className="w-[40px] h-[44px] border text-[24px]">-</button>
                <div className="w-[80px] h-[44px] border-y flex items-center justify-center text-[20px]">
                  2
                </div>
                <button className="w-[40px] h-[44px] bg-[#DB4444] text-white text-[24px]">+</button>
              </div>

              <button className="w-[165px] h-[44px] bg-[#DB4444] text-white rounded-[4px]">
                Buy Now
              </button>

              <button className="w-[40px] h-[44px] border rounded-[4px] flex items-center justify-center">
                <img src={dil} alt="" />
              </button>
            </div>

            <div className="border rounded-[4px] overflow-hidden">
              <div className="p-4 border-b">
                <p className="text-[16px] font-[500] mb-1">Free Delivery</p>
                <p className="text-[12px]">Enter your postal code for Delivery Availability</p>
              </div>

              <div className="p-4">
                <p className="text-[16px] font-[500] mb-1">Return Delivery</p>
                <p className="text-[12px]">Free 30 Days Delivery Returns. Details</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Info