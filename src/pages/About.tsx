import React from "react"
import story from "../images/story.png"
import tom from "../images/tom.png"
import emma from "../images/emma.png"
import will from "../images/will.png"
import delivery from "../images/delivery.svg"
import service from "../images/service.svg"
import money from "../images/money.svg"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"

const About = () => {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <>
      <div className="pt-10 pb-20">
        <div className="flex items-center gap-3 text-[14px] text-[#7D8184] mb-16">
          <p onClick={() => navigate("/")} className="cursor-pointer">
            {t("about.breadcrumb.home")}
          </p>
          <p>/</p>
          <p className="text-black">{t("about.breadcrumb.about")}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h1 className="text-[36px] md:text-[54px] font-[600] tracking-[0.06em] mb-10">
              {t("about.story.title")}
            </h1>

            <p className="text-[16px] leading-[28px] text-black mb-6 max-w-[600px]">
              {t("about.story.desc1")}
            </p>

            <p className="text-[16px] leading-[28px] text-black max-w-[600px]">
              {t("about.story.desc2")}
            </p>
          </div>

          <div className="w-full h-[380px] md:h-[450px] bg-[#F5F5F5] rounded-[4px] overflow-hidden">
            <img
              src={story}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 mb-24">
          <div className="h-[230px] border border-[#B3B3B3] rounded-[4px] flex flex-col items-center justify-center text-center">
            <div className="w-[80px] h-[80px] rounded-full bg-[#C1C1C1] flex items-center justify-center mb-5">
              <div className="w-[58px] h-[58px] rounded-full bg-black flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[30px] h-[30px]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5A2.25 2.25 0 0 0 11.25 11.25h-3A2.25 2.25 0 0 0 6 13.5V21m13.5 0V8.25A2.25 2.25 0 0 0 17.25 6h-10.5A2.25 2.25 0 0 0 4.5 8.25V21m15 0H3" />
                </svg>
              </div>
            </div>
            <h2 className="text-[32px] font-[700] mb-2">10.5k</h2>
            <p className="text-[16px]">{t("about.stats.sellers")}</p>
          </div>

          <div className="h-[230px] bg-[#DB4444] rounded-[4px] flex flex-col items-center justify-center text-center text-white shadow-md">
            <div className="w-[80px] h-[80px] rounded-full bg-white/30 flex items-center justify-center mb-5">
              <div className="w-[58px] h-[58px] rounded-full bg-white flex items-center justify-center text-black">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[30px] h-[30px]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.768 0-1.536-.219-2.121-.659-1.172-.879-1.172-2.303 0-3.182 1.171-.879 3.07-.879 4.242 0L15 8.818" />
                </svg>
              </div>
            </div>
            <h2 className="text-[32px] font-[700] mb-2">33k</h2>
            <p className="text-[16px]">{t("about.stats.sales")}</p>
          </div>

          <div className="h-[230px] border border-[#B3B3B3] rounded-[4px] flex flex-col items-center justify-center text-center">
            <div className="w-[80px] h-[80px] rounded-full bg-[#C1C1C1] flex items-center justify-center mb-5">
              <div className="w-[58px] h-[58px] rounded-full bg-black flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[30px] h-[30px]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5C14.377 3.75 12.715 4.876 12 6.483 11.285 4.876 9.623 3.75 7.687 3.75 5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                </svg>
              </div>
            </div>
            <h2 className="text-[32px] font-[700] mb-2">45.5k</h2>
            <p className="text-[16px]">{t("about.stats.customers")}</p>
          </div>

          <div className="h-[230px] border border-[#B3B3B3] rounded-[4px] flex flex-col items-center justify-center text-center">
            <div className="w-[80px] h-[80px] rounded-full bg-[#C1C1C1] flex items-center justify-center mb-5">
              <div className="w-[58px] h-[58px] rounded-full bg-black flex items-center justify-center text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-[30px] h-[30px]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m9-9H3" />
                </svg>
              </div>
            </div>
            <h2 className="text-[32px] font-[700] mb-2">25k</h2>
            <p className="text-[16px]">{t("about.stats.annual")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div>
            <div className="w-full h-[430px] bg-[#F5F5F5] rounded-[4px] flex items-end justify-center overflow-hidden mb-8">
              <img src={tom} alt="" className="max-w-full max-h-full object-contain" />
            </div>
            <h2 className="text-[32px] font-[500] mb-2">Tom Cruise</h2>
            <p className="text-[16px] mb-4">{t("about.team.tom")}</p>
            <div className="flex items-center gap-4 text-[22px]">
              <span>𝕏</span>
              <span>◎</span>
              <span>in</span>
            </div>
          </div>

          <div>
            <div className="w-full h-[430px] bg-[#F5F5F5] rounded-[4px] flex items-end justify-center overflow-hidden mb-8">
              <img src={emma} alt="" className="max-w-full max-h-full object-contain" />
            </div>
            <h2 className="text-[32px] font-[500] mb-2">Emma Watson</h2>
            <p className="text-[16px] mb-4">{t("about.team.emma")}</p>
            <div className="flex items-center gap-4 text-[22px]">
              <span>𝕏</span>
              <span>◎</span>
              <span>in</span>
            </div>
          </div>

          <div>
            <div className="w-full h-[430px] bg-[#F5F5F5] rounded-[4px] flex items-end justify-center overflow-hidden mb-8">
              <img src={will} alt="" className="max-w-full max-h-full object-contain" />
            </div>
            <h2 className="text-[32px] font-[500] mb-2">Will Smith</h2>
            <p className="text-[16px] mb-4">{t("about.team.will")}</p>
            <div className="flex items-center gap-4 text-[22px]">
              <span>𝕏</span>
              <span>◎</span>
              <span>in</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-3 mb-20">
          <div className="w-[12px] h-[12px] rounded-full bg-[#B3B3B3]" />
          <div className="w-[12px] h-[12px] rounded-full bg-[#B3B3B3]" />
          <div className="w-[14px] h-[14px] rounded-full bg-[#DB4444] border-2 border-[#B3B3B3]" />
          <div className="w-[12px] h-[12px] rounded-full bg-[#B3B3B3]" />
          <div className="w-[12px] h-[12px] rounded-full bg-[#B3B3B3]" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col items-center text-center">
            <div className="w-[80px] h-[80px] rounded-full bg-[#C1C1C1] flex items-center justify-center mb-6">
              <div className="w-[58px] h-[58px] rounded-full bg-black flex items-center justify-center">
                <img src={delivery} alt="" />
              </div>
            </div>
            <h4 className="text-[20px] font-[600] leading-[28px] text-black mb-2">
              {t("services.delivery.title")}
            </h4>
            <p className="text-[14px] font-[400] leading-[21px] text-black">
              {t("services.delivery.desc")}
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-[80px] h-[80px] rounded-full bg-[#C1C1C1] flex items-center justify-center mb-6">
              <div className="w-[58px] h-[58px] rounded-full bg-black flex items-center justify-center">
                <img src={service} alt="" />
              </div>
            </div>
            <h4 className="text-[20px] font-[600] leading-[28px] text-black mb-2">
              {t("services.customerService.title")}
            </h4>
            <p className="text-[14px] font-[400] leading-[21px] text-black">
              {t("services.customerService.desc")}
            </p>
          </div>

          <div className="flex flex-col items-center text-center">
            <div className="w-[80px] h-[80px] rounded-full bg-[#C1C1C1] flex items-center justify-center mb-6">
              <div className="w-[58px] h-[58px] rounded-full bg-black flex items-center justify-center">
                <img src={money} alt="" />
              </div>
            </div>
            <h4 className="text-[20px] font-[600] leading-[28px] text-black mb-2">
              {t("services.guarantee.title")}
            </h4>
            <p className="text-[14px] font-[400] leading-[21px] text-black">
              {t("services.guarantee.desc")}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default About