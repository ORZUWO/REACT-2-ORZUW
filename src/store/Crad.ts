import { create } from "zustand";

export interface IData {
  id: number;
  name: string;
  age: number;
  status: boolean;
}


export const usecrad = create((set) => ({
  data: [
    { id: 1, name: "Ali", age: 20, status: true },
    { id: 2, name: "Vali", age: 23, status: false },
    { id: 3, name: "Said", age: 19, status: true },
  ],

  adduser: (user:any) =>
    set((state:any) => ({
      data: [...state.data, user],
    })),

  deleteuser: (id:any) =>
    set((state:any) => ({
      data: state.data.filter((e:any) => e.id !== id),
    })),

  chek: (id:any) =>
    set((state:any) => ({
      data: state.data.map((e:any) =>
        e.id == id ? { ...e, status: !e.status } : e
      ),
    })),

  edituser: (user:any) =>
    set((state:any) => ({
      data: state.data.map((e:any) => (e.id === user.id ? user : e)),
    })),
}));