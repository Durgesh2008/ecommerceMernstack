import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RatingFill from "../../Svgs/RatingFill";
import { FaFacebook } from "react-icons/fa";
import { BsMessenger, BsTwitter } from "react-icons/bs";
import RatingUnfill from "../../Svgs/RatingUnfill ";
import { deleteProduct } from "../../Api/ProductApicall";
import UpdateProduct from "./UpdateProduct";
import { Cardp } from "../../skeleton/ProductCardSkeleton";
import SingleCartskeleton from "../../skeleton/SingleCartskeleton";

type itemType = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: {
    _id: string;
    name: string;
    slug: string;
    __v: number;
  };
  quantity: number;
  shipping: boolean;
  rating: number;
};

const SingleProduct = () => {
  const [ProductData, setProductData] = useState<itemType | null>(null);
  const [Like, setLike] = useState(false);
  const [id, setid] = useState("");
  const [Rating, setRating] = useState(0);
  const [Isupdate, setIsupdate] = useState<Boolean>(false);
 const [loading,setloading] = useState(false)
  let { slug } = useParams();
  const navigate = useNavigate();
  const fetdata = async () => {
    setloading(true)
    try {
    
      const res = await axios.get(
        `${process.env.REACT_APP_HOST}/api/v1/product/getAll-product/${slug}`
      );
      const resdata = await res.data;

      setProductData(resdata.Product[0]);
      setid(resdata.Product[0]._id);
      setloading(false)
    } catch (error) {
      alert("error in single page Product ");
      setloading(false)
    }
  };
  const HandleDelte = async (id: string) => {
    const res = await deleteProduct(id);
    alert(res);
    navigate("/admin_dashboard/mange_product");
  };
  useEffect(() => {
    fetdata();
  }, [Isupdate]);
  const RateArr = [1, 1, 1, 1, 1].fill(0, ProductData?.rating, 5);

  const HandleUpdate = () => {
    setIsupdate(true);
  };

  return (
    
     <>
      <section className="text-gray-700 body-font overflow-hidden bg-white">
        <div className="container px-5 py-24 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img
              alt="ecommerce"
              className="lg:w-[33%] p-5 w-full object-cover object-center rounded border border-gray-200"
              src={`${process.env.REACT_APP_HOST}/api/v1/product/product-photo/${ProductData?._id}`}
            />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">
                {ProductData?.category.name}
              </h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                {ProductData?.name}
              </h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  {RateArr.map((ele, index) => {
                    return ele === 1 ? (
                      <RatingFill key={index} />
                    ) : (
                      <RatingUnfill key={index} />
                    );
                  })}
                  <span className="text-gray-600 ml-3">
                    {Math.round(Rating)} Reviews
                  </span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                  <a className="text-gray-500">
                    <FaFacebook />
                  </a>
                  <a className="ml-2 text-gray-500">
                    <BsTwitter />
                  </a>
                  <a className="ml-2 text-gray-500">
                    <BsMessenger />
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">{ProductData?.description}</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>
                  <button className="border-2 border-gray-300 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-gray-700 rounded-full w-6 h-6 focus:outline-none"></button>
                  <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6 focus:outline-none"></button>
                </div>
                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select className="rounded border appearance-none border-gray-400 py-2 focus:outline-none focus:border-red-500 text-base pl-3 pr-10">
                      <option>SM</option>
                      <option>M</option>
                      <option>L</option>
                      <option>XL</option>
                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">
                  ${ProductData?.price}
                </span>
                <button
                  onClick={HandleUpdate}
                  className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => HandleDelte(id)}
                  className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setLike(!Like);
                  }}
                  className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4"
                >
                  {Like ? (
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5 text-red-600"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  ) : (
                    <svg
                      fill="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
        {Isupdate ? (
          <UpdateProduct item={ProductData} setIsupdate={setIsupdate} />
        ) : (
          <></>
        )}
      </section>
    </>
   
    
  );
};

export default SingleProduct;
