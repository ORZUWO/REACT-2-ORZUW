import Home from "./pages/Home"
import Leaut from "./leaut/leaut"
import Info from "./pages/Info"
import Wishlist from "./pages/Wishlist"
import Category from "./pages/Category"
import Login from "./pages/Login"
import Create from "./pages/Create"
import About from "./pages/About"
import Account from "./pages/Acount"
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import Contact from "./pages/Contact"
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom"
import PrivateRoute from "./components/ui/PrivateRoute"

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Create />,
  },
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Leaut />
      </PrivateRoute>
    ),
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
        path: "contact",
        element: <Contact />,
      },
      {
        path: "about",
        element: <About />,
      },
      {
        path: "account/:id",
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
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
])

export const App = () => {
  return <RouterProvider router={router} />
}