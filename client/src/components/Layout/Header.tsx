import React, { useState, useContext,useEffect } from "react";
import { FaShopify } from "react-icons/fa";
import { HiOutlineShoppingCart } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { SHOPCONTAEXT } from "../../context/Shopcontext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaFilter } from "react-icons/fa6";
import axios from "axios";
type User = {
  Data: object;
};
const Header = () => {
  const [IsHambargerclick, setIsHambargerclick] = useState(false);
  const context = useContext(SHOPCONTAEXT);

  const HandleHambarger = () => {
    setIsHambargerclick(!IsHambargerclick);
  };
  const navigate = useNavigate();
  const SetLogout = () => {
    context?.setAuth(null);
    localStorage.removeItem("auth");
    navigate("/login");
    toast.success("Logout Successfully");
    context?.setAuth(null)
  };
  const GetSearchData=async()=>{
    try {
      if(context?.keyword===''){
        context.setSearchData([]);
      }else{
        const {data}=await axios.get(`${process.env.REACT_APP_HOST}/api/v1/product/search-product/${context?.keyword}`)
        context?.setSearchData(data.result);
      }
   
    } catch (error) {
      console.log(error)
    }
  }
const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
context?.setKeyword(e.target.value);
}
useEffect(()=>{
  const GetData=setTimeout(() => {
    GetSearchData();
  }, 1000);
  return () => clearTimeout(GetData)
},[context?.keyword])
  return (
    <>
      <nav className="bg-white sticky top-0 z-50  border-gray-200 dark:bg-gray-900 shadow-lg ">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to={"/"} className="flex items-center">
            <FaShopify className="h-[20px] w-[20px]" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap uppercase font-poppins dark:text-white">
              Shop
            </span>
          </Link>

          <form  className="w-[40%] drop-shadow-sm bg-white border">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                type="search"
                onChange={handleChange}
                value={context?.keyword}
                className="block w-full p-3 pl-10 text-sm text-gray-900   outline-none rounded-lg  focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Electronics, Jewelery Men's Clothing...."
              />
             
            </div>
          </form>

          <FaFilter className="h-7 w-7 cursor-pointer"  onClick={()=>context?.setisfilter(!context.isfilter)} />
          <button
            onClick={HandleHambarger}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
          <div
            className={`${
              IsHambargerclick ? "right-0" : "right-[100%]"
            } z-50 absolute top-[78%]  md:static w-full md:block md:w-auto transition-all duration-700 ease-in-out delay-300`}
          >
            <div className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <Link
                to={"/"}
                className="block font-inter py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent capitalize"
              >
                home
              </Link>

            

              {!context?.Auth ? (
                <>
                  <Link
                    to={"/register"}
                    className="block font-inter py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent capitalize"
                  >
                    Register
                  </Link>
                  <Link
                    to={"/login"}
                    className="block font-inter py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent capitalize"
                  >
                    login
                  </Link>
                </>
              ) : (
                <p
                  onClick={SetLogout}
                  className="block font-inter cursor-pointer py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent capitalize"
                >
                  Logout
                </p>
              )}

              {context?.Auth ? (
                context?.Auth?.role === 1 ? (
                  <Link
                    to={"/admin_dashboard"}
                    className="block font-inter py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent capitalize"
                  >
                    {context.Auth.name}
                  </Link>
                ) : (
                  <Link
                    to={"/user_dashboard"}
                    className="block font-inter py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent capitalize"
                  >
                    {context.Auth.name}
                  </Link>
                )
              ) : null}

              <Link to={"/cart"} className=" pl-3 pr-4 relative flex">
                <HiOutlineShoppingCart className="h-7 w-7" />
                <span className=" absolute top-[-10px] left-1 bg-red-600 text-white p-1 rounded-full w-4 h-4 flex items-center justify-center">
                  {context?.cart?.length}
                </span>
              </Link>
            </div>
          </div>
        </div>
        <ToastContainer />
      </nav>
    </>
  );
};

export default Header;
