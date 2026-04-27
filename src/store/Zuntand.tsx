import { create } from "zustand"
import { AxiosRequest, GetToken, RemoveToken, SaveToken } from "../utils/token"

export const Zustandlogic = create((set, get: any) => ({
  data: [],
  category: [],
  cart: [],

  loading: false,
  loadingCategory: false,
  loadingCart: false,
  loadingAuth: false,
  loadingRegister: false,

  error: null,
  errorCategory: null,
  errorCart: null,
  errorAuth: "",
  errorRegister: "",

  loadingCartId: null,
  cartMessage: "",
  isAuth: !!GetToken(),

  registerUser: async (obj: any) => {
    set({
      loadingRegister: true,
      errorRegister: "",
    })

    try {
      await AxiosRequest.post("/Account/register", obj)

      set({
        loadingRegister: false,
        errorRegister: "",
      })

      return true
    } catch (error: any) {
      set({
        loadingRegister: false,
        errorRegister: error.response?.data?.errors?.[0] || "Ошибка регистрации",
      })

      return false
    }
  },

  loginUser: async (obj: { userName: string; password: string }) => {
    set({
      loadingAuth: true,
      errorAuth: "",
    })

    try {
      const { data } = await AxiosRequest.post("/Account/login", obj)

      SaveToken(data.data)
      localStorage.setItem("userName", obj.userName)

      set({
        loadingAuth: false,
        errorAuth: "",
        isAuth: true,
      })

      window.dispatchEvent(new Event("authUpdated"))

      return true
    } catch (error: any) {
      set({
        loadingAuth: false,
        errorAuth: error.response?.data?.errors?.[0] || "Неправильный логин или пароль.",
        isAuth: false,
      })

      return false
    }
  },

  logoutUser: () => {
    RemoveToken()
    localStorage.removeItem("userName")

    set({
      isAuth: false,
    })

    window.dispatchEvent(new Event("authUpdated"))
  },

  getData: async () => {
    set({ loading: true, error: null })

    try {
      const res = await AxiosRequest.get("/Product/get-products")

      set({
        data: res.data?.data?.products || res.data?.data || [],
        loading: false,
        error: null,
      })
    } catch {
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
    } catch {
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

      set({
        cart:
          res.data?.data?.[0]?.productsInCart ||
          res.data?.data?.productsInCart ||
          res.data?.data ||
          [],
        loadingCart: false,
        errorCart: null,
      })
    } catch {
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
      await AxiosRequest.post(`/Cart/add-product-to-cart?id=${id}`)
      await get().getCart()

      set({
        loadingCartId: null,
        cartMessage: "success",
      })

      window.dispatchEvent(new Event("cartUpdated"))
    } catch {
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