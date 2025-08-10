import { Routes, Route } from "react-router-dom";
import { HomePage } from "../pages/Home/HomePage";
import { ProductsList } from "../pages/Products/ProductsList";
import { ProductDetail } from "../pages/ProductDetail";
import { CartPage } from "../pages/Cart/CartPage";
import { OrderPage } from "../pages/Order/OrderPage";
import { Login } from "../pages/Login";
import { Register } from "../pages/Register";
import { DashboardPage } from "../pages/Dashboard/DashboardPage";
import { PageNotFound } from "../pages/PageNotFound";
import { WishlistPage } from "../pages/Wishlist/WishlistPage";

export const AllRoutes = () => {
  return (
    <>
        <Routes>
            <Route path="/" element={<HomePage />}></Route>
            <Route path="/products" element={<ProductsList />}></Route>
            <Route path="/products/:id" element={<ProductDetail />}></Route>
            <Route path="/cart" element={<CartPage />}></Route>
            <Route path="/wishlist" element={<WishlistPage />}></Route>
            <Route path="/order-summary" element={<OrderPage />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/dashboard" element={<DashboardPage />}></Route>
            <Route path="*" element={<PageNotFound />}></Route>
        </Routes>
    </>
  )
}