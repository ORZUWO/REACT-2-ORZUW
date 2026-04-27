import React, { useEffect, useMemo, useState } from 'react'
import eye from "../images/eye.svg"
import star from "../images/star.svg"
import { Zustandlogic } from '../store/Zuntand'
import { useNavigate } from 'react-router-dom'

const Category = () => {
  const navigate = useNavigate()

  const data = Zustandlogic((state: any) => state.data)
  const loading = Zustandlogic((state: any) => state.loading)
  const error = Zustandlogic((state: any) => state.error)
  const getData = Zustandlogic((state: any) => state.getData)

  const category = Zustandlogic((state: any) => state.category)
  const getCategory = Zustandlogic((state: any) => state.getCategory)
const addToCart = Zustandlogic((state: any) => state.addToCart)
const loadingCartId = Zustandlogic((state: any) => state.loadingCartId)
  const [like, setlike] = useState<number[]>(() => {
    const saved = localStorage.getItem("like")
    return saved ? JSON.parse(saved) : []
  })

  const [search, setsearch] = useState("")
  const [selectedCategory, setselectedCategory] = useState("All products")
  const [sort, setsort] = useState("Popular")
  const [visible, setvisible] = useState(12)

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
    if (!data.length) {
      getData()
    }
    if (!category.length) {
      getCategory()
    }
  }, [])

  const filterData = useMemo(() => {
    let arr = [...data]

    if (selectedCategory !== "All products") {
      arr = arr.filter(
        (e: any) =>
          e.categoryName?.toLowerCase() === selectedCategory.toLowerCase()
      )
    }

    if (search.trim()) {
      arr = arr.filter((e: any) =>
        e.productName?.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (sort === "Price low") {
      arr.sort((a: any, b: any) => a.price - b.price)
    }

    if (sort === "Price high") {
      arr.sort((a: any, b: any) => b.price - a.price)
    }

    if (sort === "A-Z") {
      arr.sort((a: any, b: any) => a.productName.localeCompare(b.productName))
    }

    return arr
  }, [data, selectedCategory, search, sort])

  if (loading) {
    return <div className="py-10 text-[24px] font-[600]">Loading...</div>
  }

  if (error) {
    return <div className="py-10 text-[24px] font-[600] text-red-500">{error}</div>
  }

  return (
    <>
      <div className="pt-10 pb-16">
        <div className="flex items-center gap-3 text-[14px] text-[#7D8184] mb-10">
          <p onClick={() => navigate("/")} className="cursor-pointer">Home</p>
          <p>/</p>
          <p className="text-black">Explore Our Products</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[270px_1fr] gap-8 items-start">
          <div className="border border-[#E5E5E5] rounded-[4px] p-6 h-max sticky top-[120px]">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[20px] font-[600]">Category</h3>
              <span className="text-[18px]">⌃</span>
            </div>

            <div className="flex flex-col gap-4 pb-8 border-b border-[#E5E5E5]">
              <button
                onClick={() => setselectedCategory("All products")}
                className={`text-left text-[16px] ${
                  selectedCategory === "All products" ? "text-[#DB4444]" : "text-black"
                }`}
              >
                All products
              </button>

              {category.slice(0, 5).map((e: any) => (
                <button
                  key={e.id}
                  onClick={() => setselectedCategory(e.categoryName)}
                  className={`text-left text-[16px] ${
                    selectedCategory === e.categoryName ? "text-[#DB4444]" : "text-black"
                  }`}
                >
                  {e.categoryName}
                </button>
              ))}

              <button className="text-left text-[16px] text-[#DB4444]">
                See all
              </button>
            </div>

            <div className="pt-8">
              <h3 className="text-[20px] font-[600] mb-5">Brands</h3>
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-3 text-[16px]">
                  <input type="checkbox" />
                  Samsung
                </label>
                <label className="flex items-center gap-3 text-[16px]">
                  <input type="checkbox" />
                  Apple
                </label>
                <label className="flex items-center gap-3 text-[16px]">
                  <input type="checkbox" />
                  Huawei
                </label>
                <label className="flex items-center gap-3 text-[16px]">
                  <input type="checkbox" />
                  Pocco
                </label>
                <label className="flex items-center gap-3 text-[16px]">
                  <input type="checkbox" />
                  Lenovo
                </label>
              </div>
            </div>
          </div>

          <div>
            <div className="flex flex-col md:flex-row gap-4 justify-between mb-8">
              <div className="w-full md:max-w-[350px] h-[50px] border border-[#E5E5E5] rounded-[4px] px-4 flex items-center justify-between">
                <input
                  value={search}
                  onChange={(e) => setsearch(e.target.value)}
                  type="text"
                  placeholder="Search"
                  className="w-full bg-transparent outline-none text-[14px]"
                />
                <span className="text-[18px]">⌕</span>
              </div>

              <div className="flex gap-4">
                <select
                  value={sort}
                  onChange={(e) => setsort(e.target.value)}
                  className="w-[180px] h-[50px] border border-[#E5E5E5] rounded-[4px] px-4 outline-none"
                >
                  <option>Popular</option>
                  <option>Price low</option>
                  <option>Price high</option>
                  <option>A-Z</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mb-8">
              <button className="px-4 h-[36px] border border-[#DB4444] text-[#DB4444] rounded-[4px] text-[14px]">
                {selectedCategory}
              </button>
              <button className="px-4 h-[36px] border border-[#DB4444] text-[#DB4444] rounded-[4px] text-[14px]">
                Any
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {filterData.slice(0, visible).map((e: any) => (
                <div key={e.id}>
                  <div className="relative bg-[#F5F5F5] rounded-[4px] h-[250px] overflow-hidden">
                    {e.hasDiscount && (
                      <div className="absolute top-3 left-3 z-10 bg-[#DB4444] text-white text-[12px] px-3 py-1 rounded-[4px]">
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

            {visible < filterData.length && (
              <div className="flex justify-center mt-10">
                <button
                  onClick={() => setvisible(visible + 6)}
                  className="w-[211px] h-[56px] bg-[#DB4444] rounded-[4px] text-white text-[16px] font-[500]"
                >
                  More Products
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

export default Category