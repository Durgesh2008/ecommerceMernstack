import React from "react";
import Layout from "./components/Layout/Layout";
import {  Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import Categories from "./Pages/Categories";
import Cart from "./Pages/Cart";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import Notfound from "./Pages/Notfound";
import Dashboard from "./Pages/user/Dashboard";
import PrivateRoute from "./components/Routes/PrivateRoute";
import ForgetPassword from "./Pages/auth/ForgetPassword";

const App = () => {
  return (
    <>
        
      <Layout  title='Ecommerce App' description="Mern Stack Project" keywords="Mern,node,React,Mongodb,Tailwind,Typescript" >
          <Routes>
            <Route   path="/" element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forget_password" element={<ForgetPassword />} />
            <Route path="/user_dashboard" element={<PrivateRoute />} >
              
            <Route path="" element={<Dashboard />} />
            </Route>
            <Route path="*" element={<Notfound />} />
          </Routes>
      </Layout>
     
    </>
  );
};

export default App;
