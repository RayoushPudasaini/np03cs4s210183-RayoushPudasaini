import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Login from "./pages/Login";
import Register from "./pages/register";

import { ToastContainer } from "react-toastify";
import CheckoutSucess from "./components/CheckoutSucess";
import Dashboard from "./components/admin/Dashboard";
import Products from "./components/admin/Products";
import Summary from "./components/admin/Summary";
import CreateProduct from "./components/admin/CreateProduct";
import Carousel from "./components/Carousel";
import { useSelector } from "react-redux";
import Footer from "./components/Footer";
import ViewProduct from "./pages/ViewProduct";
import Orders from "./components/admin/Orders";
import Users from "./components/admin/Users";

import Product from "./components/Details/Product";
import UserProfile from "./components/Details/UserProfile";
import Order from "./components/Details/Order";
import SendPasswordResetEmail from "./pages/ForgetPassword";
import ResetPassword from "./pages/ResetPassword";
import Checkout from "./components/Checkout";

function App() {
  const { isAdmin, token } = useSelector((state) => state.auth);

  return (
    <div className="App">
      <BrowserRouter>
        <ToastContainer />

        <NavBar />
        <main className="main__section">
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
            </Route>

            <Route path="/product/:id" element={<ViewProduct />} />
            {!isAdmin && (
              <>
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/checkout-success" element={<CheckoutSucess />} />
                <Route path="/cart" element={<Cart />} />
              </>
            )}

            <Route path="/Register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/forgot-password"
              element={<SendPasswordResetEmail />}
            />
            <Route
              path="/reset-password/:id/:token"
              element={<ResetPassword />}
            />

            {isAdmin && token && (
              <Route path="product/:id" element={<Product />}>
                <Route path="order/:id" element={<Order />} />
                <Route path="user/:id" element={<UserProfile />} />
              </Route>
            )}
            {isAdmin && token && (
              <Route path="/:admin" element={<Dashboard />}>
                <Route path="products" element={<Products />} />
                {/* <Route path="products-list" element={<ProductsList />} /> */}
                <Route path="orders" element={<Orders />} />
                <Route path="create-product" element={<CreateProduct />} />
                <Route path="Summary" element={<Summary />} />
                <Route path="users" element={<Users />} />
              </Route>
            )}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        {!isAdmin && <Footer />}
      </BrowserRouter>
    </div>
  );
}

export default App;

const RootLayout = () => {
  return (
    <>
      <Carousel />
      <Outlet />
    </>
  );
};
