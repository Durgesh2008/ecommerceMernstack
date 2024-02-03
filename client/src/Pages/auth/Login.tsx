import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingButton from "../../components/LoadingButton";
import { SHOPCONTAEXT } from "../../context/Shopcontext";

type Loginform = {
  email: string;
  password: string;
};
const Login = () => {
  // all states

  const context = useContext(SHOPCONTAEXT);
  const [IsLogin, setIsLogin] = useState(false);
  const [Isloading, setIsloading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Loginform>();
  // navigator
  const location = useLocation();
  const navigate = useNavigate();

  // function
  const onSubmit = async (input: Loginform) => {
    try {
      setIsloading(true);
      const res = await axios.post(
        `${process.env.REACT_APP_HOST}/api/v1/auth/login`,
        { email: input.email, password: input.password }
      );
      const data = await res.data;
   console.log(data)
      if (data.success) {
        setIsLogin(data.success);
        context?.setAuth({
          name: data.user.name,
          email: data.user.email,
          id: data.user.id,
          phone: data.user.phone,
          address: data.user.address,
          role: data.user.role,
          token: data.token,
          Islogin: true, 
          productId:res.data?.productId?res.data?.productId:[],
         
        });
        setIsloading(false);
        toast.success("Login Successfully");
      } else {
        toast.error(data.message);
        setIsloading(false);
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const onSuccess = (response: any) => {
    console.log("success", response);
  };
  const onfailure = () => {
    console.log("fail");
  };
  useEffect(() => {
    if (IsLogin) {
      localStorage.setItem("auth", JSON.stringify(context?.Auth));
      navigate(location.state || "/");
    }
  }, [IsLogin]);
  useEffect(() => {
    if (Isloading) {
      setTimeout(() => {
        setIsloading(false);
      }, 5000);
    }
  }, [Isloading]);

  return (
    <>
      <section className="bg-[#D4F3F6] py-4 h-[86vh] flex  flex-col justify-center ">
        <h1 className=" font-roboto mx-auto my-3 text-lg font-semibold text-[#05494F] ">
          Sign In
        </h1>
        <div className=" mx-auto w-full max-w-md rounded-lg bg-white p-7 drop-shadow-lg dark:bg-neutral-700">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* <!--Email input--> */}
            <div className="relative mb-7">
              <input
                type="email"
                {...register("email", { required: true })}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              {errors.email && (
                <p className="text-[#d95454] font-roboto text-[10px]">
                  {" "}
                  email is required.
                </p>
              )}
              <label className="peer-focus:font-medium absolute font-poppins text-base text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Email
              </label>
            </div>
            <div className="relative mb-7">
              <input
                type="password"
                {...register("password", { required: true })}
                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
              />
              {errors.password && (
                <p className="text-[#d95454] font-roboto text-[10px]">
                  {" "}
                  Password is required.
                </p>
              )}
              <label className="peer-focus:font-medium absolute font-poppins text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                Password
              </label>
            </div>
            {/* <!--Submit button--> */}
            <div className="w-full mx-auto ">
              {!Isloading ? (
                <button
                  type="submit"
                  className="inline-block w-full text-center bg-[#19A5B1] font-inter  rounded  px-6 py-2 mt-5 mb-4 text-xs md:text-base font-medium capitalize leading-normal text-white  hover:shadow-btn__shadow   duration-500 ease-in transform active:scale-75 transition-transform"
                >
                  Login
                </button>
              ) : (
                <LoadingButton />
              )}
            </div>
         
            
            <div className="flex items-center justify-center font-inter ">
              <span className="text-sm font-normal">New User?</span>
              <Link
                to={"/register"}
                className="font-poppins font-semibold text-[#05494F] text-[12px]  "
              >
                Signup here
              </Link>
              <Link
                className="font-poppins font-semibold text-[#05494F] px-3 text-[12px]"
                to={"/forget_password"}
              >
                Forget Password
              </Link>
            </div>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Login;
