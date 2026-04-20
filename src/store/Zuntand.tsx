import { create } from "zustand"
import { AxiosRequest } from "../utils/token"

export const Zustandlogic = create((set, get: any) => ({
  data: [],
  category: [],
  cart: [],

  loading: false,
  loadingCategory: false,
  loadingCart: false,

  error: null,
  errorCategory: null,
  errorCart: null,

  loadingCartId: null,
  cartMessage: "",

  getData: async () => {
    set({ loading: true, error: null })

    try {
      const res = await AxiosRequest.get("/Product/get-products")

      set({
        data: res.data?.data?.products || res.data?.data || [],
        loading: false,
        error: null,
      })
    } catch (error: any) {
      console.log("GET PRODUCTS ERROR:", error.response?.status)
      console.log("GET PRODUCTS DATA:", error.response?.data)

      set({
        data: [],
        loading: false,
        error: "Error products",
      })
    }
  },

  getCategory: async () => {
    set({ loadingCategory: true, errorCategory: null })

    try {
      const res = await AxiosRequest.get("/Category/get-categories")

      set({
        category: res.data?.data || [],
        loadingCategory: false,
        errorCategory: null,
      })
    } catch (error: any) {
      console.log("GET CATEGORY ERROR:", error.response?.status)
      console.log("GET CATEGORY DATA:", error.response?.data)

      set({
        category: [],
        loadingCategory: false,
        errorCategory: "Error category",
      })
    }
  },

  getCart: async () => {
    set({ loadingCart: true, errorCart: null })

    try {
      const res = await AxiosRequest.get("/Cart/get-products-from-cart")

      console.log("CART DATA:", res.data)
      set({
        cart:
          res.data?.data?.[0]?.productsInCart ||
          res.data?.data?.productsInCart ||
          res.data?.data ||
          [],
        loadingCart: false,
        errorCart: null,
      })
    } catch (error: any) {
      console.log("GET CART ERROR:", error.response?.status)
      console.log("GET CART DATA:", error.response?.data)

      set({
        cart: [],
        loadingCart: false,
        errorCart: "Error cart",
      })
    }
  },

  addToCart: async (id: number) => {
    set({
      loadingCartId: id,
      cartMessage: "",
    })

    try {
      console.log("ADD TO CART ID:", id)

      await AxiosRequest.post(`/Cart/add-product-to-cart?id=${id}`)

      await get().getCart()

      set({
        loadingCartId: null,
        cartMessage: "success",
      })
    } catch (error: any) {
      console.log("ADD CART ERROR:", error.response?.status)
      console.log("ADD CART DATA:", error.response?.data)

      set({
        loadingCartId: null,
        cartMessage: "error",
      })
    }
  },

  clearCartMessage: () => {
    set({ cartMessage: "" })
  },
}))