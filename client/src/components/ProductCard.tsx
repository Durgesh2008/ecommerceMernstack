import { Link } from "react-router-dom";

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
       
      {JSON.parse(localStorage.getItem("auth") as string).role === 0 && (
        <button className="bg-btn_bg shadow-btn__shadow p-2 font-inter font-semibold text-[#ffffff] rounded my-3">Add to cart</button>
      )}
      </div>
    </div>
  );
};

export default ProductCard;
