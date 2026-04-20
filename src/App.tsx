import Home from "./pages/Home"
import Leaut from "./leaut/leaut"
import Info from "./pages/Info"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Wishlist from "./pages/Wishlist"
import Category from "./pages/Category"
import Login from "./pages/Login"
import Create from "./pages/Create"
import About from "./pages/About"
import Account from "./pages/Acount"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Leaut />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "info/:id",
        element: <Info />,
      },
      {
        path: "wishlist",
        element: <Wishlist />,
      },
      {
        path: "category",
        element: <Category />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Create />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
  path: "account",
  element: <Account />,
},
{
  path: "cart",
  element: <Cart />,
},
{
  path: "checkout",
  element: <Checkout />,
},
    ],
  },
])

export const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}