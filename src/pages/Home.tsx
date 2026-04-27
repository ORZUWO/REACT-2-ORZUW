import React, { useEffect, useMemo, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Navigation, Pagination } from "swiper/modules"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import iphone from "../images/iphone.svg"
import apple from "../images/apple.svg"
import strelka from "../images/strelka.svg"
import right from "../images/right.svg"
import star from "../images/star.svg"
import ps5 from "../images/ps5.png"
import women from "../images/women.png"
import speaker from "../images/speaker.png"
import perfume from "../images/perfume.png"
import delivery from "../images/delivery.svg"
import service from "../images/service.svg"
import money from "../images/money.svg"
import kalonka from "../images/kalonka.png"

import { Zustandlogic } from "../store/Zuntand"

const Home = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const data = Zustandlogic((state: any) => state.data)
  const loading = Zustandlogic((state: any) => state.loading)
  const error = Zustandlogic((state: any) => state.error)
  const getData = Zustandlogic((state: any) => state.getData)

  const category = Zustandlogic((state: any) => state.category)
  const getCategory = Zustandlogic((state: any) => state.getCategory)

  const addToCart = Zustandlogic((state: any) => state.addToCart)
  const loadingCartId = Zustandlogic((state: any) => state.loadingCartId)

  const products = Array.isArray(data) ? data : []
  const categories = Array.isArray(category) ? category : []

  const [cnt, setCnt] = useState(
    3 * 24 * 60 * 60 + 23 * 60 * 60 + 19 * 60 + 56
  )

  const [like, setLike] = useState<number[]>(() => {
    const saved = localStorage.getItem("like")
    return saved ? JSON.parse(saved) : []
  })

  useEffect(() => {
    getData()
    getCategory()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setCnt((prev) => (prev > 0 ? prev - 1 : 0))
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  function clickLike(id: number) {
    let newLike: number[] = []

    if (like.includes(id)) {
      newLike = like.filter((e) => e !== id)
    } else {
      newLike = [...like, id]
    }

    setLike(newLike)
    localStorage.setItem("like", JSON.stringify(newLike))
    window.dispatchEvent(new Event("wishlistUpdated"))
  }

  const flashSales = useMemo(() => {
    return products.slice(0, 6)
  }, [products])

  const bestSelling = useMemo(() => {
    return products.slice(4, 12)
  }, [products])

  const exploreProducts = useMemo(() => {
    return products.slice(0, 12)
  }, [products])

  const heroSlides = useMemo(
    () => [
      {
        id: 1,
        title: t("home.hero.discount"),
        subtitle: t("home.hero.iphone"),
        image: iphone,
      },
      {
        id: 2,
        title: t("promo.title"),
        subtitle: t("promo.categories"),
        image: kalonka,
      },
      {
        id: 3,
        title: t("bestSelling.title"),
        subtitle: t("explore.subtitle"),
        image: speaker,
      },
    ],
    [t]
  )

  const days = Math.floor(cnt / (24 * 60 * 60))
  const hours = Math.floor((cnt % (24 * 60 * 60)) / (60 * 60))
  const minutes = Math.floor((cnt % (60 * 60)) / 60)
  const seconds = cnt % 60

  const pad = (n: number) => String(n).padStart(2, "0")

  function ProductCard({ e }: any) {
    return (
      <div>
        <div className="relative bg-[#F5F5F5] rounded-[4px] h-[250px] overflow-hidden group">
          {e.hasDiscount && (
            <div className="absolute top-3 left-3 z-10 bg-[#DB4444] font-bold text-white text-[12px] px-3 py-1 rounded-[4px]">
              -{e.discountPrice}%
            </div>
          )}

          <div className="absolute top-3 right-3 z-10 flex flex-col gap-2">
            <button
              onClick={() => clickLike(e.id)}
              className={`w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-md border border-[#ECECEC] duration-300 hover:scale-110 ${
                like.includes(e.id)
                  ? "bg-[#DB4444] text-white border-[#DB4444]"
                  : "bg-white text-black hover:bg-[#DB4444] hover:text-white hover:border-[#DB4444]"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={like.includes(e.id) ? "currentColor" : "none"}
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className="w-[20px] h-[20px]"
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
              className="w-[40px] h-[40px] rounded-full bg-white border border-[#ECECEC] shadow-md flex items-center justify-center text-black duration-300 hover:bg-[#2F6FED] hover:border-[#2F6FED] hover:text-white hover:scale-110"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.8"
                stroke="currentColor"
                className="w-[20px] h-[20px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                />
              </svg>
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
            className="absolute bottom-0 left-0 w-full h-[41px] bg-black text-white text-[16px] font-[500] translate-y-full group-hover:translate-y-0 duration-300"
          >
            {loadingCartId === e.id
              ? t("flashSales.loading")
              : t("flashSales.addToCart")}
          </button>
        </div>

        <div className="pt-4">
          <h3 className="text-[16px] font-[500] leading-[24px] text-black mb-2 line-clamp-1">
            {e.productName}
          </h3>

          <div className="flex items-center gap-3 mb-2">
            <p className="text-[#DB4444] text-[16px] font-[500]">
              ${e.price}
            </p>

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
    )
  }

  if (loading) {
    return (
      <div className="py-16 text-[28px] font-[600]">
        {t("flashSales.loading")}
      </div>
    )
  }

  if (error) {
    return (
      <div className="py-16 text-[28px] font-[600] text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="w-full overflow-x-hidden">
      <style>
        {`
          .homeHeroSwiper {
            width: 100%;
            overflow: hidden;
          }

          .homeHeroSwiper .swiper-slide {
            width: 100%;
          }

          .homeHeroSwiper .swiper-pagination {
            bottom: 18px !important;
          }

          .homeHeroSwiper .swiper-pagination-bullet {
            width: 12px;
            height: 12px;
            background: #808080;
            opacity: 1;
          }

          .homeHeroSwiper .swiper-pagination-bullet-active {
            background: #DB4444;
            border: 2px solid #ffffff;
          }

          .categorySwiper {
            width: 100%;
            overflow: hidden;
          }

          .categorySwiper .swiper-slide {
            height: auto;
          }

          .flashSwiper {
            width: 100%;
            overflow: hidden;
          }
        `}
      </style>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_minmax(0,1fr)] gap-10 xl:gap-[45px]">
        <div className="hidden lg:block border-r border-[#E5E5E5] pt-10 pr-6">
          <div
            onClick={() => navigate("/category")}
            className="flex items-center justify-between mb-5 cursor-pointer group"
          >
            <p className="text-[16px] font-[400] leading-[24px] text-black group-hover:text-[#DB4444]">
              {t("home.categories.womansFashion")}
            </p>
            <img src={right} alt="" className="w-[8px] h-[14px]" />
          </div>

          <div
            onClick={() => navigate("/category")}
            className="flex items-center justify-between mb-5 cursor-pointer group"
          >
            <p className="text-[16px] font-[400] leading-[24px] text-black group-hover:text-[#DB4444]">
              {t("home.categories.mensFashion")}
            </p>
            <img src={right} alt="" className="w-[8px] h-[14px]" />
          </div>

          <p
            onClick={() => navigate("/category")}
            className="text-[16px] font-[400] leading-[24px] text-black mb-5 cursor-pointer hover:text-[#DB4444]"
          >
            {t("home.categories.electronics")}
          </p>

          <p
            onClick={() => navigate("/category")}
            className="text-[16px] font-[400] leading-[24px] text-black mb-5 cursor-pointer hover:text-[#DB4444]"
          >
            {t("home.categories.homeLifestyle")}
          </p>

          <p
            onClick={() => navigate("/category")}
            className="text-[16px] font-[400] leading-[24px] text-black mb-5 cursor-pointer hover:text-[#DB4444]"
          >
            {t("home.categories.medicine")}
          </p>

          <p
            onClick={() => navigate("/category")}
            className="text-[16px] font-[400] leading-[24px] text-black mb-5 cursor-pointer hover:text-[#DB4444]"
          >
            {t("home.categories.sportsOutdoor")}
          </p>

          <p
            onClick={() => navigate("/category")}
            className="text-[16px] font-[400] leading-[24px] text-black mb-5 cursor-pointer hover:text-[#DB4444]"
          >
            {t("home.categories.babysToys")}
          </p>

          <p
            onClick={() => navigate("/category")}
            className="text-[16px] font-[400] leading-[24px] text-black mb-5 cursor-pointer hover:text-[#DB4444]"
          >
            {t("home.categories.groceriesPets")}
          </p>

          <p
            onClick={() => navigate("/category")}
            className="text-[16px] font-[400] leading-[24px] text-black cursor-pointer hover:text-[#DB4444]"
          >
            {t("home.categories.healthBeauty")}
          </p>
        </div>

        <div className="pt-6 lg:pt-10 w-full min-w-0 overflow-hidden">
          <Swiper
            modules={[Autoplay, Pagination]}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            className="homeHeroSwiper w-full rounded-[6px]"
          >
            {heroSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="w-full h-[300px] sm:h-[360px] md:h-[420px] xl:h-[460px] bg-black rounded-[6px] px-6 sm:px-10 lg:px-12 xl:px-16 flex items-center overflow-hidden">
                  <div className="grid grid-cols-1 md:grid-cols-2 items-center w-full h-full gap-8">
                    <div className="text-white flex flex-col justify-center z-10">
                      <div className="flex items-center gap-4 mb-5">
                        {slide.id === 1 && (
                          <img
                            src={apple}
                            alt=""
                            className="w-[32px] sm:w-[40px] h-auto"
                          />
                        )}

                        <p className="text-[16px] sm:text-[18px] font-[400]">
                          {slide.subtitle}
                        </p>
                      </div>

                      <h1 className="text-[30px] sm:text-[44px] xl:text-[56px] leading-[1.15] font-[600] max-w-[520px] mb-6">
                        {slide.title}
                      </h1>

                      <button className="w-fit flex items-center gap-3 text-[16px] sm:text-[18px] font-[500] border-b border-white pb-1">
                        {t("featured.shopNow")}
                        <img
                          src={strelka}
                          alt=""
                          className="w-[20px] sm:w-[22px]"
                        />
                      </button>
                    </div>

                    <div className="hidden md:flex items-center justify-center h-full">
                      <img
                        src={slide.image}
                        alt=""
                        className="w-full max-w-[540px] h-[260px] lg:h-[340px] xl:h-[400px] object-contain"
                      />
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      <div className="pt-20">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-[20px] h-[40px] bg-[#DB4444] rounded-[4px]" />
          <p className="text-[#DB4444] text-[16px] font-[600]">
            {t("flashSales.today") || "Today’s"}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-10">
          <div className="flex flex-col md:flex-row md:items-end gap-8">
            <h2 className="text-[36px] md:text-[46px] font-[600] leading-none text-black">
              {t("flashSales.title") || "Flash Sales"}
            </h2>

            <div className="flex items-end gap-4">
              <div>
                <p className="text-[12px] font-[500] mb-1">Days</p>
                <h3 className="text-[32px] font-[700] leading-none">
                  {pad(days)}
                </h3>
              </div>

              <span className="text-[#DB4444] text-[32px] font-[700] mb-1">
                :
              </span>

              <div>
                <p className="text-[12px] font-[500] mb-1">Hours</p>
                <h3 className="text-[32px] font-[700] leading-none">
                  {pad(hours)}
                </h3>
              </div>

              <span className="text-[#DB4444] text-[32px] font-[700] mb-1">
                :
              </span>

              <div>
                <p className="text-[12px] font-[500] mb-1">Minutes</p>
                <h3 className="text-[32px] font-[700] leading-none">
                  {pad(minutes)}
                </h3>
              </div>

              <span className="text-[#DB4444] text-[32px] font-[700] mb-1">
                :
              </span>

              <div>
                <p className="text-[12px] font-[500] mb-1">Seconds</p>
                <h3 className="text-[32px] font-[700] leading-none">
                  {pad(seconds)}
                </h3>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3">
            <button className="flash-prev w-[46px] h-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center text-[22px] hover:bg-[#DB4444] hover:text-white duration-300">
              ←
            </button>
            <button className="flash-next w-[46px] h-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center text-[22px] hover:bg-[#DB4444] hover:text-white duration-300">
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
          loop={flashSales.length > 4}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          speed={800}
          spaceBetween={30}
          className="flashSwiper"
          breakpoints={{
            0: { slidesPerView: 1.1 },
            520: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            1180: { slidesPerView: 4 },
          }}
        >
          {flashSales.map((e: any) => (
            <SwiperSlide key={e.id}>
              <ProductCard e={e} />
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate("/category")}
            className="w-[234px] h-[56px] bg-[#DB4444] rounded-[4px] text-white text-[16px] font-[500]"
          >
            {t("explore.viewAll")}
          </button>
        </div>

        <div className="w-full h-[1px] bg-[#E5E5E5] mt-16" />
      </div>

      <div className="pt-16">
        <div className="flex items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-[20px] h-[40px] bg-[#DB4444] rounded-[4px]" />
              <p className="text-[#DB4444] text-[16px] font-[600]">
                {t("promo.categories")}
              </p>
            </div>

            <h2 className="text-[28px] md:text-[36px] font-[600] leading-[48px] text-black">
              {t("home.browseByCategory")}
            </h2>
          </div>

          <div className="hidden md:flex items-center justify-end gap-3 mb-2">
            <button className="cat-prev w-[46px] h-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center text-[22px] hover:bg-[#DB4444] hover:text-white duration-300">
              ←
            </button>
            <button className="cat-next w-[46px] h-[46px] rounded-full bg-[#F5F5F5] flex items-center justify-center text-[22px] hover:bg-[#DB4444] hover:text-white duration-300">
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
          loop={categories.length > 6}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          speed={800}
          spaceBetween={24}
          className="categorySwiper"
          breakpoints={{
            0: { slidesPerView: 1.4 },
            420: { slidesPerView: 2 },
            640: { slidesPerView: 3 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
        >
          {categories.map((e: any) => (
            <SwiperSlide key={e.id}>
              <div
                onClick={() => navigate("/category")}
                className="h-[145px] border border-[#E5E5E5] rounded-[4px] flex flex-col items-center justify-center gap-4 hover:bg-[#DB4444] hover:text-white duration-300 cursor-pointer group"
              >
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
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-[20px] h-[40px] bg-[#DB4444] rounded-[4px]" />
              <p className="text-[#DB4444] text-[16px] font-[600]">
                {t("bestSelling.subtitle")}
              </p>
            </div>

            <h2 className="text-[28px] md:text-[36px] font-[600] leading-[48px] text-black">
              {t("bestSelling.title")}
            </h2>
          </div>

          <button
            onClick={() => navigate("/category")}
            className="w-[159px] h-[56px] bg-[#DB4444] rounded-[4px] text-white text-[16px] font-[500]"
          >
            {t("bestSelling.viewAll")}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {bestSelling.map((e: any) => (
            <ProductCard key={e.id} e={e} />
          ))}
        </div>
      </div>

      <div className="pt-20">
        <div className="bg-black rounded-[6px] px-6 md:px-10 xl:px-14 py-10 md:py-14 flex flex-col lg:flex-row items-center justify-between gap-10 overflow-hidden">
          <div className="max-w-[460px]">
            <p className="text-[#00FF66] text-[16px] font-[600] mb-8">
              {t("promo.categories")}
            </p>

            <h2 className="text-white text-[30px] md:text-[44px] leading-[1.3] font-[600] mb-8">
              {t("promo.title")}
            </h2>

            <div className="flex items-center gap-4 flex-wrap mb-10">
              <div className="bg-white text-black rounded-full w-[70px] h-[70px] flex flex-col items-center justify-center">
                <span className="font-[700] text-[16px]">{pad(days)}</span>
                <span className="text-[11px]">{t("promo.days")}</span>
              </div>

              <div className="bg-white text-black rounded-full w-[70px] h-[70px] flex flex-col items-center justify-center">
                <span className="font-[700] text-[16px]">{pad(hours)}</span>
                <span className="text-[11px]">{t("promo.hours")}</span>
              </div>

              <div className="bg-white text-black rounded-full w-[70px] h-[70px] flex flex-col items-center justify-center">
                <span className="font-[700] text-[16px]">{pad(minutes)}</span>
                <span className="text-[11px]">{t("promo.minutes")}</span>
              </div>

              <div className="bg-white text-black rounded-full w-[70px] h-[70px] flex flex-col items-center justify-center">
                <span className="font-[700] text-[16px]">{pad(seconds)}</span>
                <span className="text-[11px]">{t("promo.seconds")}</span>
              </div>
            </div>

            <button className="w-[171px] h-[56px] bg-[#00FF66] rounded-[4px] text-black text-[16px] font-[500]">
              {t("promo.buyNow")}
            </button>
          </div>

          <div className="flex items-center justify-center relative">
            <div className="absolute w-[320px] md:w-[450px] h-[320px] md:h-[450px] bg-white/20 blur-[120px] rounded-full" />
            <img
              src={kalonka}
              alt=""
              className="relative z-10 w-full max-w-[520px] object-contain"
            />
          </div>
        </div>
      </div>

      <div className="pt-20">
        <div className="flex items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-4 mb-5">
              <div className="w-[20px] h-[40px] bg-[#DB4444] rounded-[4px]" />
              <p className="text-[#DB4444] text-[16px] font-[600]">
                {t("explore.subtitle")}
              </p>
            </div>

            <h2 className="text-[28px] md:text-[36px] font-[600] leading-[48px] text-black">
              {t("explore.title")}
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8">
          {exploreProducts.map((e: any) => (
            <ProductCard key={e.id} e={e} />
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <button
            onClick={() => navigate("/category")}
            className="w-[234px] h-[56px] bg-[#DB4444] rounded-[4px] text-white text-[16px] font-[500]"
          >
            {t("explore.viewAll")}
          </button>
        </div>
      </div>

      <div className="pt-20">
        <div className="flex items-center gap-4 mb-5">
          <div className="w-[20px] h-[40px] bg-[#DB4444] rounded-[4px]" />
          <span className="text-[#DB4444] font-[600] text-base">
            {t("featured.subtitle")}
          </span>
        </div>

        <h2 className="text-[28px] md:text-[36px] font-[600] mb-10 text-black">
          {t("featured.title")}
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-white">
          <div className="relative bg-black rounded-[6px] flex flex-col justify-end p-8 min-h-[600px] overflow-hidden">
            <img
              src={ps5}
              alt="PS5"
              className="absolute inset-0 m-auto object-contain"
            />
            <div className="relative z-10 space-y-3">
              <h3 className="text-2xl font-bold">{t("featured.ps5.title")}</h3>
              <p className="text-sm text-gray-300 max-w-[240px]">
                {t("featured.ps5.desc")}
              </p>
              <button className="border-b border-gray-500 pb-1 font-medium hover:text-gray-400 w-fit">
                {t("featured.shopNow")}
              </button>
            </div>
          </div>

          <div className="grid grid-rows-2 gap-8">
            <div className="relative bg-black rounded-[6px] flex flex-col justify-end p-6 overflow-hidden min-h-[284px]">
              <img
                src={women}
                alt="Women Collection"
                className="absolute right-0 bottom-0 h-full object-cover"
              />
              <div className="relative z-10 space-y-3">
                <h3 className="text-2xl font-bold">
                  {t("featured.womens.title")}
                </h3>
                <p className="text-sm text-gray-300 max-w-[200px]">
                  {t("featured.womens.desc")}
                </p>
                <button className="border-b border-gray-500 pb-1 font-medium hover:text-gray-400 w-fit">
                  {t("featured.shopNow")}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="relative bg-black rounded-[6px] flex flex-col justify-end p-6 overflow-hidden min-h-[284px]">
                <img
                  src={speaker}
                  alt="Speakers"
                  className="absolute inset-0 m-auto object-contain p-6"
                />
                <div className="relative z-10 space-y-2">
                  <h3 className="text-xl font-bold">
                    {t("featured.speakers.title")}
                  </h3>
                  <p className="text-xs text-gray-300">
                    {t("featured.speakers.desc")}
                  </p>
                  <button className="border-b border-gray-500 pb-1 text-sm font-medium hover:text-gray-400 w-fit">
                    {t("featured.shopNow")}
                  </button>
                </div>
              </div>

              <div className="relative bg-black rounded-[6px] flex flex-col justify-end p-6 overflow-hidden min-h-[284px]">
                <img
                  src={perfume}
                  alt="Perfume"
                  className="absolute inset-0 m-auto object-contain p-6"
                />
                <div className="relative z-10 space-y-2">
                  <h3 className="text-xl font-bold">
                    {t("featured.perfume.title")}
                  </h3>
                  <p className="text-xs text-gray-300">
                    {t("featured.perfume.desc")}
                  </p>
                  <button className="border-b border-gray-500 pb-1 text-sm font-medium hover:text-gray-400 w-fit">
                    {t("featured.shopNow")}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-24 pb-28">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-20 h-20 bg-[#2F2E30]/30 rounded-full flex items-center justify-center">
              <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center">
                <img
                  src={delivery}
                  alt=""
                  className="w-10 h-10 object-contain"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-xl text-black leading-tight uppercase">
                {t("services.delivery.title")}
              </h3>
              <p className="text-sm text-black">
                {t("services.delivery.desc")}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-20 h-20 bg-[#2F2E30]/30 rounded-full flex items-center justify-center">
              <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center">
                <img src={service} alt="" className="w-10 h-10 object-contain" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-xl text-black leading-tight uppercase">
                {t("services.customerService.title")}
              </h3>
              <p className="text-sm text-black">
                {t("services.customerService.desc")}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center text-center gap-4">
            <div className="w-20 h-20 bg-[#2F2E30]/30 rounded-full flex items-center justify-center">
              <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center">
                <img src={money} alt="" className="w-10 h-10 object-contain" />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <h3 className="font-bold text-xl text-black leading-tight uppercase">
                {t("services.guarantee.title")}
              </h3>
              <p className="text-sm text-black">
                {t("services.guarantee.desc")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home