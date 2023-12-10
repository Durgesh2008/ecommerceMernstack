import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { SHOPCONTAEXT } from "../context/Shopcontext";

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

interface ProductCardProps {
  item: itemType;
  path: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ item, path }) => {
  const context=useContext(SHOPCONTAEXT);
  const [showAddCartbtn,setshowAddCartbtn]=useState(true)
  const AddTOCart=()=>{
    context?.setcart([...context?.cart,item])
    setshowAddCartbtn(false)
  }
  const RemoveToCart=()=>{
  
    let RemainingCart=context?.cart.filter((ele)=>{
      return (item._id!==ele._id)
    })
      context?.setcart(RemainingCart || [])
    setshowAddCartbtn(true)
  }

  
  return (
    <div className="drop-shadow-lg hover:scale-105 transition-all ease-in">
      <div className="flex flex-col h-min w-full p-1 border-box bg-white rounded xl">
       <Link to={`${path}/${item.slug}`}>
       <div className="flex rounded flex-col w-ful w-full h-48 bg-gray-200">
          <img
            src={`${process.env.REACT_APP_HOST}/api/v1/product/product-photo/${item._id}`}
            className="w-full h-full"
            alt="Product_Image"
          />
        </div>
        <div className="flex border-box p-1 flex-col">
          <p className="text-sm text-gray-500 font-roboto capitalize">
            {item.category.name}
          </p>
          <p className="font-inter ">{item.name}</p>
          <p className="font-poppins font-medium">${item.price.toFixed(2)}</p>
        </div>
       </Link>
       
      {(!(JSON.parse(localStorage.getItem("auth") as string)) || JSON.parse(localStorage.getItem("auth") as string).role === 0 ) && (
        
     ( !context?.cart.some(ele => ele._id === item._id) )? <button onClick={AddTOCart} className="bg-btn_bg shadow-btn__shadow p-2 font-inter font-semibold text-[#ffffff] rounded my-3">Add to cart</button>:
       <button onClick={RemoveToCart} className="bg-red-400 drop-shadow-sm p-2 text-[#ffffff] font-inter font-semibold uppercase rounded my-3">Remove to cart</button>
      )}
      </div>
    </div>
  );
};

export default ProductCard;
