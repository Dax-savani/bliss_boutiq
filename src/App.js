import React, {useEffect} from "react";
import Home from "./pages/Home/Home";
import Footer from "./components/global/footer/Footer";
import MyData from "./components/profile/MyData";
import {Route, Routes, useLocation} from "react-router-dom";
import OrderHistory from "./components/profile/OrderHistory";
import MyWishlist from "./components/profile/MyWishlist";
import Offer from "./components/profile/Offer";
import Register_form from "./pages/Registration_form/Register_form";
import Contact from "./pages/contact/Contact";
import CartPage from "./components/cart/CartPage";
import SingleProduct from "./components/Home/SingleProduct";
import Profile from "./pages/profile/Profile";
import {RecoilRoot} from "recoil";
import ProductPage from "./pages/Product/Product";
import Form from "./pages/form/Form";
import {ToastContainer} from "react-toastify";
import PrivateRoute from "./components/PrivateRoute";
import Megamenus from "./Megamenus";
import { Toaster } from "react-hot-toast";
import OrderForm from "./components/Order/OrderForm";

function App() {
    function ScrollToTop() {
        const {pathname} = useLocation();
        useEffect(() => {
            window.scrollTo(0, 0);
        }, [pathname]);
        return null;
    }

    return (
        <>
            <ToastContainer/>
            <Toaster/>
            <RecoilRoot>
                <Megamenus/>
                <ScrollToTop/>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/profile" element={<Form/>}/>
                    <Route element={<PrivateRoute/>}>
                        <Route path="/my-wishilist" element={<MyWishlist/>}/>
                        <Route path="/cart" element={<CartPage/>}/>
                        <Route path="/orderform" element={<OrderForm/>}/>
                    </Route>
                    <Route path="/my-account" element={<Profile/>}/>
                    <Route path="/my-data" element={<MyData/>}/>
                    <Route path="/order-history" element={<OrderHistory/>}/>
                    <Route path="/offer" element={<Offer/>}/>
                    <Route path="/sign-up" element={<Register_form/>}/>
                    <Route path="/single-product/:id" element={<SingleProduct/>}/>
                    <Route path="/product" element={<ProductPage/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                </Routes>
                <Footer/>
            </RecoilRoot>
        </>
    );
}

export default App;
