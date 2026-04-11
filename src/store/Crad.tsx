import axios from "axios"
import { create } from "zustand"

const url = "http://37.27.29.18:8001/api/to-dos"
export const image = "http://37.27.29.18:8001/images"
const urlchek="http://37.27.29.18:8001"

export interface IImage {
  id: number
  imageName: string
}

export interface IData {
  id: number
  name: string
  description: string
  images: IImage[]
  isCompleted: boolean
}


export const usecrad = create((set, get) => ({
  data: [],

  getdata: async () => {
    try {
      let { data } = await axios.get(url)
      set(() => ({ data: data.data }))
    } catch (error) {
      console.error(error)
    }
  },

  adduser: async (user:any) => {
    try {
      await axios.post(url, user)
      get().getdata()
    } catch (error) {
      console.error(error)
    }
  },

  edituser: async (user:any) => {
    try {
      await axios.put(url, {
        id: user.id,
        Name: user.name,
        Description: user.description,
        Images: user.images,
        IsCompleted: user.isCompleted,
      })
      get().getdata()
    } catch (error) {
      console.error(error)
    }
  },

  deleteuser: async (id:any) => {
    try {
      await axios.delete(`${url}?id=${id}`)
      get().getdata()
    } catch (error) {
      console.error(error)
    }
  },

  chek:async(id:any)=>{
    try {
      await axios.put(`${urlchek}/completed?id=${id}`)
      get().getdata()
    } catch (error) {
      console.error(error);
    }
  }


}))