import { create } from "zustand"
import { AxiosRequest } from "../utils/token"

interface AccountStore {
  dataId: any
  loading: boolean
  saving: boolean
  error: string
  getById: (id: string) => Promise<void>
  EditUser: (edituser: FormData) => Promise<boolean>
}

export const UserGetbyid = create<AccountStore>((set) => ({
  dataId: null,
  loading: false,
  saving: false,
  error: "",

  getById: async (id) => {
    set({ loading: true, error: "" })

    try {
      const { data } = await AxiosRequest.get(
        `/UserProfile/get-user-profile-by-id?id=${id}`
      )

      set({
        dataId: data?.data || null,
        loading: false,
        error: "",
      })
    } catch (error: any) {
      set({
        dataId: null,
        loading: false,
        error: error?.response?.data?.errors?.[0] || "Error profile",
      })
    }
  },

  EditUser: async (edituser) => {
    set({ saving: true, error: "" })

    try {
      await AxiosRequest.put("/UserProfile/update-user-profile", edituser)

      set({
        saving: false,
        error: "",
      })

      return true
    } catch (error: any) {
      set({
        saving: false,
        error: error?.response?.data?.errors?.[0] || "Error edit profile",
      })

      return false
    }
  },
}))