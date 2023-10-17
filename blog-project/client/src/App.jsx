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

import "./index.scss";

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
        path: "/post/:id",
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
    <div className="app">
      <div className="container">
      <RouterProvider router={router} />
      </div>
    </div>
  )
}

export default App
