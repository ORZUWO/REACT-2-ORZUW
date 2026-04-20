import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'

import iphone from "../images/iphone.svg"
import apple from "../images/apple.svg"
import strelka from "../images/strelka.svg"
import right from "../images/right.svg"
import eye from "../images/eye.svg"
import star from "../images/star.svg"
import kalonka from "../images/kalonka.png"

import ps5 from "../images/ps5.png"
import women from "../images/women.png"
import speaker from "../images/speaker.png"
import perfume from "../images/perfume.png"
import delivery from "../images/delivery.svg"
import service from "../images/service.svg"
import money from "../images/money.svg"

import { Zustandlogic } from '../store/Zuntand'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()

  const data = Zustandlogic((state: any) => state.data)
  const loading = Zustandlogic((state: any) => state.loading)
  const error = Zustandlogic((state: any) => state.error)
  const getData = Zustandlogic((state: any) => state.getData)
const addToCart = Zustandlogic((state: any) => state.addToCart)
const loadingCartId = Zustandlogic((state: any) => state.loadingCartId)
  const category = Zustandlogic((state: any) => state.category)
  const getCategory = Zustandlogic((state: any) => state.getCategory)

  const [like, setlike] = useState<number[]>(() => {
    const saved = localStorage.getItem("like")
    return saved ? JSON.parse(saved) : []
  })

  function clickLike(id: number) {
    let newLike: number[]

    if (like.includes(id)) {
      newLike = like.filter((e) => e !== id)
    } else {
      newLike = [...like, id]
    }

    setlike(newLike)
    localStorage.setItem("like", JSON.stringify(newLike))
  }

  useEffect(() => {
    getData()
    getCategory()
  }, [])

  if (loading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <>
      <div className="w-full">
        <div className="hidden md:grid grid-cols-[260px_1fr] gap-[60px]">
          <div className="border-r border-[#E5E5E5] pt-10 pr-6">
            <div className="flex items-center justify-between mb-5">
              <p className="text-[16px] font-[400] leading-[24px] text-black">Woman’s Fashion</p>
              <img src={right} alt="" className="w-[8px] h-[14px]" />
            </div>

            <div className="flex items-center justify-between mb-5">
              <p className="text-[16px] font-[400] leading-[24px] text-black">Men’s Fashion</p>
              <img src={right} alt="" className="w-[8px] h-[14px]" />
            </div>

            <p className="text-[16px] font-[400] leading-[24px] text-black mb-5">Electronics</p>
            <p className="text-[16px] font-[400] leading-[24px] text-black mb-5">Home & Lifestyle</p>
            <p className="text-[16px] font-[400] leading-[24px] text-black mb-5">Medicine</p>
            <p className="text-[16px] font-[400] leading-[24px] text-black mb-5">Sports & Outdoor</p>
            <p className="text-[16px] font-[400] leading-[24px] text-black mb-5">Baby’s & Toys</p>
            <p className="text-[16px] font-[400] leading-[24px] text-black mb-5">Groceries & Pets</p>
            <p className="text-[16px] font-[400] leading-[24px] text-black">Health & Beauty</p>
          </div>

          <div className="pt-10">
            <div className="w-full h-[460px] bg-black pl-20 pr-10 flex items-center justify-between overflow-hidden">
              <div className="max-w-[420px] text-white pt-1">
                <div className="flex items-center gap-6 mb-7">
                  <img src={apple} alt="" className="w-[44px] h-[54px]" />
                  <p className="text-[18px] font-[400] leading-[24px]">iPhone 14 Series</p>
                </div>
                <h1 className="text-[44px] leading-[78px] tracking-[0.04em] font-[600] mb-7">
                  Up to 10%
                  <br />
                  off Voucher
                </h1>

                <button className="flex items-center gap-3 text-[18px] font-[500] border-b border-white pb-1">
                  Shop Now
                  <img src={strelka} alt="" className="w-[22px]" />
                </button>
              </div>

              <div className="flex flex-col items-center justify-end h-full pt-6">
                <img src={iphone} alt="" className="w-[580px] h-[430px] object-contain" />
                <div className="flex items-center justify-center gap-[12px] pb-4 -mt-2">
                  <div className="w-[12px] h-[12px] rounded-full bg-[#808080]" />
                  <div className="w-[12px] h-[12px] rounded-full bg-[#808080]" />
                  <div className="w-[14px] h-[14px] rounded-full bg-[#DB4444] border-[2px] border-white" />
                  <div className="w-[12px] h-[12px] rounded-full bg-[#808080]" />
                  <div className="w-[12px] h-[12px] rounded-full bg-[#808080]" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-14">
          <div className='flex gap-[910px] items-end mb-4'>
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-[20px] h-[40px] bg-[#DB4444] rounded-[4px]" />
                <p className="text-[#DB4444] text-[16px] font-[600]">Categories</p>
              </div>
              <h2 className="text-[36px] font-[600] leading-[48px] text-black">
                Browse By Category
              </h2>
            </div>

            <div className="flex items-center justify-end gap-3 mb-8">
              <button className="flash-prev w-[46px] h-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center text-[22px]">
                ←
              </button>
              <button className="flash-next w-[46px] h-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center text-[22px]">
                →

              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: ".flash-prev",
              nextEl: ".flash-next",
            }}
            loop={true}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            speed={800}
            spaceBetween={24}
            breakpoints={{
              0: { slidesPerView: 1.2 },
              450: { slidesPerView: 1.7 },
              640: { slidesPerView: 2 },
              768: { slidesPerView: 2.3 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
              1500: { slidesPerView: 5 },
            }}
          >
            {data.map((e: any) => (
              <SwiperSlide key={e.id}>
                <div className="w-full">
                  <div className="relative bg-[#F5F5F5] rounded-[4px] h-[250px] overflow-hidden">
                    {e.hasDiscount && (
                      <div className="absolute top-3 left-3 z-10 bg-[#DB4444] font-bold text-white text-[12px] px-3 py-1 rounded-[4px]">
                        -{e.discountPrice}%
                      </div>
                    )}

                    <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                      <button
                        onClick={() => clickLike(e.id)}
                        className={`w-[34px] h-[34px] rounded-full flex items-center justify-center ${
                          like.includes(e.id) ? "bg-red-500 text-white" : "bg-white text-black"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill={like.includes(e.id) ? "currentColor" : "none"}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                          />
                        </svg>
                      </button>

                      <button
                        onClick={() => navigate(`/info/${e.id}`)}
                        className="w-[34px] h-[34px] rounded-full bg-white flex items-center justify-center"
                      >
                        <img src={eye} alt="" />
                      </button>
                    </div>

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
                      <p className="text-[#7D8184] text-[14px] font-[600] ml-2">(88)</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex justify-center mt-10">
            <button   onClick={() => navigate("/category")} className="w-[234px] h-[56px] bg-[#DB4444] rounded-[4px] text-white text-[16px] font-[500]">
              View All Products
            </button>
          </div>
        </div>

        <div className="pt-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-[20px] h-[40px] bg-[#DB4444] rounded-[4px]" />
                <p className="text-[#DB4444] text-[16px] font-[600]">Categories</p>
              </div>

              <h2 className="text-[36px] font-[600] leading-[48px] text-black">
                Browse By Category
              </h2>
            </div>

            <div className="hidden md:flex items-center gap-3">
              <button className="cat-prev w-[46px] h-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center text-[22px]">
                ←
              </button>
              <button className="cat-next w-[46px] h-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center text-[22px]">
                →
              </button>
            </div>
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            navigation={{
              prevEl: ".cat-prev",
              nextEl: ".cat-next",
            }}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            speed={800}
            spaceBetween={24}
            breakpoints={{
              0: { slidesPerView: 2 },
              480: { slidesPerView: 2.3 },
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 5 },
              1280: { slidesPerView: 6 },
            }}
          >
            {category.map((e: any) => (
              <SwiperSlide key={e.id}>
                <div className="h-[145px] border border-[#E5E5E5] rounded-[4px] flex flex-col items-center justify-center gap-4 hover:bg-[#DB4444] hover:text-white duration-300 cursor-pointer">
                  <img
                    src={`https://store-api.softclub.tj/images/${e.categoryImage}`}
                    alt=""
                    className="w-[56px] h-[56px] object-contain"
                  />
                  <p className="text-[16px] font-[400] text-center">
                    {e.categoryName}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="w-full h-[1px] bg-[#E5E5E5] mt-16" />
        </div>

        <div className="pt-16">
          <div className="flex items-end justify-between mb-10">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-[20px] h-[40px] bg-[#DB4444] rounded-[4px]" />
                <p className="text-[#DB4444] text-[16px] font-[600]">This Month</p>
              </div>

              <h2 className="text-[36px] font-[600] leading-[48px] text-black">
                Best Selling Products
              </h2>
            </div>

            <button   onClick={() => navigate("/category")} className="w-[159px] h-[56px] bg-[#DB4444] rounded-[4px] text-white text-[16px] font-[500]">
              View All
            </button>
          </div>

          <Swiper
            modules={[Navigation, Autoplay]}
            loop={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            speed={800}
            spaceBetween={24}
            breakpoints={{
              0: { slidesPerView: 1.2 },
              480: { slidesPerView: 1.5 },
              768: { slidesPerView: 2.5 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }}
          >
            {data.map((e: any) => (
              <SwiperSlide key={e.id}>
                <div>
                  <div className="relative bg-[#F5F5F5] rounded-[4px] h-[250px] overflow-hidden">
                    <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                      <button
                        onClick={() => clickLike(e.id)}
                        className={`w-[34px] h-[34px] rounded-full flex items-center justify-center ${
                          like.includes(e.id) ? "bg-red-500 text-white" : "bg-white text-black"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill={like.includes(e.id) ? "currentColor" : "none"}
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="size-6"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                          />
                        </svg>
                      </button>

                      <button
                        onClick={() => navigate(`/info/${e.id}`)}
                        className="w-[34px] h-[34px] rounded-full bg-white flex items-center justify-center"
                      >
                        <img src={eye} alt="" />
                      </button>
                    </div>

                    <div className="h-[209px] flex items-center justify-center p-4">
                      <img
                        src={`https://store-api.softclub.tj/images/${e.image}`}
                        alt=""
                        className="max-w-[190px] max-h-[180px] object-contain"
                      />
                    </div>
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
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        <div className="pt-16">
          <div className="w-full bg-black min-h-[500px] px-6 md:px-[56px] py-[40px] flex flex-col md:flex-row items-center justify-between overflow-hidden gap-10">
            <div className="max-w-[450px] w-full">
              <p className="text-[#00FF66] text-[16px] font-[600] mb-8">Categories</p>

              <h2 className="text-white text-[34px] md:text-[48px] font-[600] leading-[42px] md:leading-[60px] mb-8">
                Enhance Your
                <br />
                Music Experience
              </h2>

              <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-10">
                <div className="w-[62px] h-[62px] rounded-full bg-white flex flex-col items-center justify-center">
                  <p className="text-[16px] font-[600] text-black leading-[18px]">23</p>
                  <p className="text-[11px] text-black">Hours</p>
                </div>

                <div className="w-[62px] h-[62px] rounded-full bg-white flex flex-col items-center justify-center">
                  <p className="text-[16px] font-[600] text-black leading-[18px]">05</p>
                  <p className="text-[11px] text-black">Days</p>
                </div>

                <div className="w-[62px] h-[62px] rounded-full bg-white flex flex-col items-center justify-center">
                  <p className="text-[16px] font-[600] text-black leading-[18px]">59</p>
                  <p className="text-[11px] text-black">Minutes</p>
                </div>

                <div className="w-[62px] h-[62px] rounded-full bg-white flex flex-col items-center justify-center">
                  <p className="text-[16px] font-[600] text-black leading-[18px]">35</p>
                  <p className="text-[11px] text-black">Seconds</p>
                </div>
              </div>

              <button className="w-[171px] h-[56px] bg-[#00FF66] rounded-[4px] text-black text-[16px] font-[500]">
                Buy Now!
              </button>
            </div>

            <div className="flex items-center justify-center w-full md:w-auto">
              <div className="w-full max-w-[600px] h-[260px] md:h-[420px] flex items-center justify-center">
                <img src={kalonka} alt="" className="max-w-full max-h-full object-contain" />
              </div>
            </div>
          </div>
        </div>

        <div className="pt-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
            <div>
              <div className="flex items-center gap-4 mb-5">
                <div className="w-[20px] h-[40px] bg-[#DB4444] rounded-[4px]" />
                <p className="text-[#DB4444] text-[16px] font-[600]">Our Products</p>
              </div>

              <h2 className="text-[36px] font-[600] leading-[48px] text-black">
                Explore Our Products
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {data.slice(0, 8).map((e: any) => (
              <div key={e.id}>
                <div className="relative bg-[#F5F5F5] rounded-[4px] h-[250px] overflow-hidden">
                  {e.hasDiscount && (
                    <div className="absolute top-3 left-3 z-10 bg-[#00FF66] text-white text-[12px] px-3 py-1 rounded-[4px]">
                      NEW
                    </div>
                  )}

                  <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
                    <button
                      onClick={() => clickLike(e.id)}
                      className={`w-[34px] h-[34px] rounded-full flex items-center justify-center ${
                        like.includes(e.id) ? "bg-red-500 text-white" : "bg-white text-black"
                      }`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill={like.includes(e.id) ? "currentColor" : "none"}
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                        />
                      </svg>
                    </button>

                    <button
                      onClick={() => navigate(`/info/${e.id}`)}
                      className="w-[34px] h-[34px] rounded-full bg-white flex items-center justify-center"
                    >
                      <img src={eye} alt="" />
                    </button>
                  </div>

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

                  {(e.color || e.colors) && (
                    <div className="flex items-center gap-2 mt-3">
                      <div className="w-[20px] h-[20px] rounded-full border-2 border-black bg-red-500" />
                      <div className="w-[20px] h-[20px] rounded-full bg-[#DB4444]" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-10">
            <button   onClick={() => navigate("/category")} className="w-[234px] h-[56px] bg-[#DB4444] rounded-[4px] text-white text-[16px] font-[500]">
              View All Products
            </button>
          </div>
        </div>

        <div className="pt-16">
          <div className="mb-10">
            <div className="flex items-center gap-4 mb-5">
              <div className="w-[20px] h-[40px] bg-[#DB4444] rounded-[4px]" />
              <p className="text-[#DB4444] text-[16px] font-[600]">Featured</p>
            </div>

            <h2 className="text-[36px] font-[600] leading-[48px] text-black">
              New Arrival
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-black rounded-[4px] relative min-h-[600px] overflow-hidden">
              <div className="absolute bottom-8 left-8 z-10 max-w-[250px]">
                <h3 className="text-white text-[24px] font-[600] leading-[24px] mb-4">
                  PlayStation 5
                </h3>
                <p className="text-white text-[14px] font-[400] leading-[21px] mb-4">
                  Black and White version of the PS5 coming out on sale.
                </p>
                <button className="text-white text-[16px] font-[500] border-b border-white">
                  Shop Now
                </button>
              </div>

              <div className="w-full h-full flex items-end justify-center pt-10">
                <img src={ps5} alt="" className="max-w-full object-contain" />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-8">
              <div className="bg-black rounded-[4px] relative min-h-[284px] overflow-hidden">
                <div className="absolute bottom-8 left-8 z-10 max-w-[255px]">
                  <h3 className="text-white text-[24px] font-[600] leading-[24px] mb-4">
                    Women’s Collections
                  </h3>
                  <p className="text-white text-[14px] font-[400] leading-[21px] mb-4">
                    Featured woman collections that give you another vibe.
                  </p>
                  <button className="text-white text-[16px] font-[500] border-b border-white">
                    Shop Now
                  </button>
                </div>

                <div className="w-full h-full flex items-end justify-end">
                  <img src={women} alt="" className="max-w-full object-contain" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="bg-black rounded-[4px] relative min-h-[284px] overflow-hidden">
                  <div className="absolute bottom-8 left-8 z-10 max-w-[200px]">
                    <h3 className="text-white text-[24px] font-[600] leading-[24px] mb-2">
                      Speakers
                    </h3>
                    <p className="text-white text-[14px] font-[400] leading-[21px] mb-3">
                      Amazon wireless speakers
                    </p>
                    <button className="text-white text-[16px] font-[500] border-b border-white">
                      Shop Now
                    </button>
                  </div>

                  <div className="w-full h-full flex items-center justify-center">
                    <img src={speaker} alt="" className="max-w-full object-contain" />
                  </div>
                </div>

                <div className="bg-black rounded-[4px] relative min-h-[284px] overflow-hidden">
                  <div className="absolute bottom-8 left-8 z-10 max-w-[200px]">
                    <h3 className="text-white text-[24px] font-[600] leading-[24px] mb-2">
                      Perfume
                    </h3>
                    <p className="text-white text-[14px] font-[400] leading-[21px] mb-3">
                      GUCCI INTENSE OUD EDP
                    </p>
                    <button className="text-white text-[16px] font-[500] border-b border-white">
                      Shop Now
                    </button>
                  </div>

                  <div className="w-full h-full flex items-center justify-center">
                    <img src={perfume} alt="" className="max-w-full object-contain" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-24">
            <div className="flex flex-col items-center text-center">
              <div className="w-[80px] h-[80px] rounded-full bg-[#C1C1C1] flex items-center justify-center mb-6">
                <div className="w-[58px] h-[58px] rounded-full bg-black flex items-center justify-center">
                  <img src={delivery} alt="" />
                </div>
              </div>
              <h4 className="text-[20px] font-[600] leading-[28px] text-black mb-2">
                FREE AND FAST DELIVERY
              </h4>
              <p className="text-[14px] font-[400] leading-[21px] text-black">
                Free delivery for all orders over $140
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-[80px] h-[80px] rounded-full bg-[#C1C1C1] flex items-center justify-center mb-6">
                <div className="w-[58px] h-[58px] rounded-full bg-black flex items-center justify-center">
                  <img src={service} alt="" />
                </div>
              </div>
              <h4 className="text-[20px] font-[600] leading-[28px] text-black mb-2">
                24/7 CUSTOMER SERVICE
              </h4>
              <p className="text-[14px] font-[400] leading-[21px] text-black">
                Friendly 24/7 customer support
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-[80px] h-[80px] rounded-full bg-[#C1C1C1] flex items-center justify-center mb-6">
                <div className="w-[58px] h-[58px] rounded-full bg-black flex items-center justify-center">
                  <img src={money} alt="" />
                </div>
              </div>
              <h4 className="text-[20px] font-[600] leading-[28px] text-black mb-2">
                MONEY BACK GUARANTEE
              </h4>
              <p className="text-[14px] font-[400] leading-[21px] text-black">
                We reurn money within 30 days
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home