import React, { Suspense } from "react";
import Layout from "./components/Layout/Layout";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import Notfound from "./Pages/Notfound";
import User_Dashboard from "./Pages/user/User_Dashboard";
import UserPrivateRoute from "./components/Routes/UserPrivateRoute";
import ForgetPassword from "./Pages/auth/ForgetPassword";
import AdminPrivateRoute from "./components/Routes/AdminPrivateRoute";
import Admin_DashBoard from "./Pages/Admin/Admin_DashBoard";
import CreateProduct from "./Pages/Admin/CreateProduct";
import AlluserList from "./Pages/Admin/AlluserList";
import CreateCategory from "./Pages/Admin/CreateCategory";
import AdminProfile from "./Pages/Admin/AdminProfile";
import UserProfile from "./Pages/user/UserProfile";
import Orders from "./Pages/user/Orders";
import MangeProduct from "./Pages/Admin/MangeProduct";
import SingleProduct from "./Pages/Admin/SingleProduct";
import DataLoader from "./Pages/Admin/DataLoader";
import SingleCartskeleton from "./skeleton/SingleCartskeleton";
const SingleProductDetails = React.lazy(() => import("./Pages/SingleProductDetails"));
const Payment = React.lazy(() => import("./Pages/Payment"));
const Cart = React.lazy(() => import("./Pages/Cart"));
const App = () => {


  return (
    <>

      <Layout title='Ecommerce App' description="Mern Stack Project" keywords="Mern,node,React,Mongodb,Tailwind,Typescript" >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Suspense fallback={<DataLoader />}><Cart /></Suspense>} />
          <Route path="/payment" element={<Suspense fallback={<DataLoader />}><Payment /></Suspense>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget_password" element={<ForgetPassword />} />
          <Route path="/user_dashboard" element={<UserPrivateRoute />} >
            <Route path="" element={<User_Dashboard children={<UserProfile />} />} />
            <Route path="profile" element={<User_Dashboard children={<UserProfile />} />} />
            <Route path="orders" element={<User_Dashboard children={<Orders />} />} />
          </Route>
          <Route path="/admin_dashboard" element={<AdminPrivateRoute />}>
            <Route path="" element={<Admin_DashBoard children={<AdminProfile />} />} />
            <Route path="create_product" element={<Admin_DashBoard children={<CreateProduct />} />} />
            <Route path="create_category" element={<Admin_DashBoard children={<CreateCategory />} />} />
            <Route path="users" element={<Admin_DashBoard children={<AlluserList />} />} />
            <Route path="mange_product" element={<Admin_DashBoard children={<MangeProduct path='/admin_dashboard/mange_product' />} />} />
            <Route path="mange_product/:slug" element={<SingleProduct />} />
          </Route>
          <Route path="/product/:slug" element={<Suspense fallback={<SingleCartskeleton />}><SingleProductDetails /></Suspense>} />
          <Route path="*" element={<Notfound />} />
        </Routes>

      </Layout>

    </>
  );
};

export default App;
