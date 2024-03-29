import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SHOPCONTAEXT } from "../context/Shopcontext";
import { delete_1_Cart, updatecount } from "../Api/CartApicall";

const Cart = () => {
  const context = useContext(SHOPCONTAEXT);
  const [total, setTotal] = useState(0);
 

  useEffect(() => {
    if (total === 0) {
      let sum = context?.cart.reduce((acc, ele) => {
        return acc + ele.price;
      }, 0);
      setTotal(sum ? sum : 0);
    }
  }, []);


  return (
    <div>
      <div className="container mx-auto mt-10">
        <div className="flex shadow-md my-10">
          <div className="w-3/4 bg-white px-10 py-10">
            <div className="flex justify-between border-b pb-8">
              <h1 className="font-semibold text-2xl font-roboto">
                Shopping Cart
              </h1>
              <h2 className="font-semibold text-2xl font-roboto">
                {" "}
                {context?.cart.length} Items
              </h2>
            </div>
            <div className="flex mt-10 mb-5">
              <h3 className="font-semibold text-gray-700 text-[13px] uppercase font-poppins w-2/5">
                Product Details
              </h3>
              <h3 className="font-semibold text-center text-gray-700 text-[13px] font-poppins  uppercase w-1/5">
                Quantity
              </h3>
              <h3 className="font-semibold text-center text-gray-700 text-[13px] font-poppins uppercase w-1/5 ">
                Price
              </h3>
            </div>
            {context?.cart.map((item) => {
              return <Item key={item._id} item={item} setTotal={setTotal} />;
            })}

            <Link
              to={"/"}
              className="flex font-semibold font-inter text-base text-indigo-600  mt-10"
            >
              <svg
                className="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </Link>
          </div>

          <div id="summary" className="w-1/4 px-8 py-10">
            <h1 className="font-semibold text-2xl border-b pb-8">
              Order Summary
            </h1>
            <div className="flex justify-between mt-10 mb-5">
              <span className="font-semibold text-sm uppercase">
                Items {context?.cart?.length}
              </span>
              <span className="font-semibold text-sm">{total}$</span>
            </div>
            <div>
              <label className="font-medium inline-block mb-3 text-sm uppercase">
                Shipping
              </label>
              <select className="block p-2 text-gray-600 w-full text-sm">
                <option>Standard shipping - $10.00</option>
              </select>
            </div>

            <div className="border-t mt-8">
              <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>{total + 10}$</span>
              </div>
              <Link to={'/payment'} className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                Checkout
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

const Item = ({
  item,
  setTotal,
}: {
  item: any;
  setTotal: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const context = useContext(SHOPCONTAEXT);
  const [qnt, setqnt] = useState<number>(item?.count);

  const IncrementQnt = async () => {
    if (qnt <= 19) {
      setqnt((pre) => pre + 1);
      await updatecount(item._id, qnt + 1);
    } else {
      alert("At max 20 iten only");
    }
    setTotal((pre) => pre + item.price);
  };

  const DecrementQnt = async () => {
    if (qnt > 1) {
      setqnt((pre) => pre - 1);
      setTotal((pre) => pre - item.price);
      await updatecount(item._id, qnt - 1);
    } else {
      alert("At least one item");
    }
  };

  const handleRemove = async () => {
    setTotal((pre) => pre - item.price * qnt);
    const userid = context?.Auth?.id ? context?.Auth?.id : "";
    await delete_1_Cart(userid, item._id, item.pid);
    context?.getCartData();
  };

  return (
    <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
      <div className="flex w-2/5">
        <div className="w-20">
          <img
            className="h-24 object-contain"
            src={`${process.env.REACT_APP_HOST}/api/v1/product/product-photo/${item.pid}`}
            alt="Product_image"
          />
        </div>
        <div className="flex  items-center justify-between ml-4 flex-grow">
          <span className="font-semibold capitalize font-poppins  text-sm">
            {item.name}
          </span>
        </div>
      </div>
      <div className="flex justify-center w-1/5">
        <svg
          onClick={DecrementQnt}
          className="fill-current cursor-pointer text-gray-600 w-3"
          viewBox="0 0 448 512"
        >
          <path d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
        </svg>

        <input
          className="mx-2 border text-center w-8"
          max={20}
          min={1}
          type="text"
          value={qnt}
        />

        <svg
          onClick={IncrementQnt}
          className=" cursor-pointer fill-current text-gray-600 w-3"
          viewBox="0 0 448 512"
        >
          <path d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
        </svg>
      </div>
      <span className="text-center w-1/5 font-semibold text-sm">
        ${item.price * qnt}.00
      </span>
      <span
        onClick={handleRemove}
        className="text-center  cursor-pointer text-red-500 w-1/5 font-semibold text-sm"
      >
        Remove
      </span>
    </div>
  );
};
