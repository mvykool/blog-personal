import { 
  createBrowserRouter,
  RouterProvider,
  Outlet
  } from "react-router-dom"

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";  

import Home from "./pages/Home";
import Single from "./pages/Single";
import Write from "./pages/Write";
import Register from "./pages/Register";
import Login from "./pages/Login";

// set layout properties


const Layout = () => {
  return (
    <>
    <Navbar/>
    <Outlet/>
    <Footer/>
    </>
  )
}

// set router and links

const router= createBrowserRouter([
  {
    path: "/",
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/single",
        element: <Single/>
      },
      {
        path: "/write",
        element:<Write/>
      }
    ]
  },

  {
    path: "/register",
    element: <Register/>
  },
  {
    path: "/login",
    element: <Login/>
  }
])

// set component

function App() {

  return (
    <>
    <RouterProvider router={router} />
    </>
  )
}

export default App
