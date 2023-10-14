import  { useState, useEffect, useContext } from "react";
import { SHOPCONTAEXT } from "../../context/Shopcontext";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Outlet } from "react-router-dom";
import Spiner from "../Spiner";
const AdminPrivateRoute = () => {
  const [ok, setok] = useState(false);
  const context = useContext(SHOPCONTAEXT);
  const usertoken = context?.Auth !== null && context?.Auth.token;
  const authcheck = async () => {
   
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_HOST}/api/v1/auth/admin-auth`,
        {
          headers: {
            token: usertoken,
          },
        }
      );
      const resData = await res.data;
      if (resData.ok) {
        setok(true);
      } else {
        setok(false);
      }
    } catch (error) {
      toast.error("Protected page please Login");
    }
  };
  useEffect(() => {
    if (usertoken) {
      authcheck();
    }
  }, [usertoken]);
  return (
    <>
      <ToastContainer />
      {
        ok?<Outlet/>:<Spiner path=""/>
      }
    </>
  );
};

export default AdminPrivateRoute;
