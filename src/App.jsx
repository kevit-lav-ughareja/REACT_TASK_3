// App.jsx
import "./App.css";
import { RouterProvider, createBrowserRouter, Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Product from "./components/Product";
import ProductDetails from "./components/ProductDetials";
import AddToCart from "./components/AddToCart";
import Home from "./components/Home";
import User from "./components/User";
import CheckOut from "./components/CheckOut";

/* import { FormProvider } from "./UseContext"; */

const Layout = () => {
  return (
    <>
      <Header />
      <div className="app-container">
        <main className="main-content">
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "user", element: <User /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },
      { path: "products", element: <Product /> },
      { path: "cart", element: <AddToCart /> },
      { path: "checkout", element: <CheckOut /> },
      { path: "products/:id", element: <ProductDetails /> },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
