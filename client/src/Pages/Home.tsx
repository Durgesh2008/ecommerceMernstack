import { useContext, useState, useEffect } from "react";
import { SHOPCONTAEXT } from "../context/Shopcontext";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import { GetAllCategory } from "../Api/CategoryApiCall";
import { Price } from "../dataJson/Price";
import MangeProduct from "./Admin/MangeProduct";
import { FilterProduct } from "../Api/ProductApicall";
import ProductCard from "../components/ProductCard";

type AllCategoryPrps = {
  name: string;
  _id: string;
};
const Home = () => {
  const context = useContext(SHOPCONTAEXT);
  const [AllCategory, setAllCategory] = useState<[]>([]);
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [selectradio, setselectradio] = useState<number>();
  const [RadioValue, setRadioValue] = useState<number[]>([]);
  const [Products, setProducts] = useState([]);
  const HandleRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
    setselectradio(parseInt(e.target.value));
    setRadioValue(Price[parseInt(e.target.value)].arr);
  };
  const HandleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = event.target.value;
    if (selectedValues.includes(selectedValue)) {
      setSelectedValues(
        selectedValues.filter((value) => value !== selectedValue)
      );
    } else {
      setSelectedValues([...selectedValues, selectedValue]);
    }
  };

  const getcategory = async () => {
    let data = await GetAllCategory();
    setAllCategory(data);
  };

  const filterData = async () => {
    const data = {
      checked: selectedValues,
      radio: RadioValue,
    };
    const res = await FilterProduct(data);
    setProducts(res);
  };

  useEffect(() => {
    getcategory();
  }, []);
  const clearFilter = () => {
    setRadioValue([]);
    setSelectedValues([]);
  };
  useEffect(() => {
    filterData();
  }, [selectedValues, RadioValue]);

  return (
    <>
      {context?.isfilter && (
        <form
          id="dropdown"
          className="z-50  mx-3 sticky top-20 p-3 border  w-full bg-white rounded-lg shadow dark:bg-gray-700"
        >
          <h6 className="my-3 text-sm  font-roboto font-medium uppercase text-gray-900 dark:text-white">
            Filter By Category
          </h6>
          <ul
            className="text-sm flex w-full flex-wrap items-center justify-start "
            aria-labelledby="dropdownDefault"
          >
            {AllCategory?.map((category: AllCategoryPrps) => {
              return (
                <li key={category._id} className="flex p-2 items-center">
                  <input
                    type="checkbox"
                    checked={selectedValues.includes(category._id)}
                    onChange={HandleChange}
                    value={category._id}
                    className="w-4 font-poppins h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />

                  <label className="ml-2 font-poppins capitalize text-sm font-medium text-gray-900 dark:text-gray-100">
                    {category.name}
                  </label>
                </li>
              );
            })}
          </ul>
          <h6 className="my-3 text-sm font-roboto font-medium uppercase text-gray-900 dark:text-white">
            Filter By Price
          </h6>
          <ul
            className="text-sm flex w-full flex-wrap items-center justify-start"
            aria-labelledby="dropdownDefault"
          >
            {Price.map((ele) => {
              return (
                <li key={ele.id} className="flex p-2 items-center">
                  <input
                    type="radio"
                    name="Price"
                    value={ele.id}
                    checked={selectradio === ele.id}
                    onChange={HandleRadio}
                    className="w-4 h-4 bg-gray-100 font-poppins border-gray-300 rounded-full  text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                  />

                  <label className="ml-2 font-inter capitalize text-sm font-medium text-gray-900 dark:text-gray-100">
                    {ele.name}
                  </label>
                </li>
              );
            })}
          </ul>
          <button
            onClick={clearFilter}
            className="font-inter font-semibold capitalize p-2 bg-[#19A5B1] rounded text-[#ffffff] my-4"
            type="reset"
          >
            Clear
          </button>
        </form>
      )}

      <div className="relative">
        <h1 className="poppins text-[#D21312]  absolute lg:top-[280px] md:top-[215px] top-[155px] font-bold  text-center text-xl left-[30%] uppercase md:text-5xl z-10">
          Welcome to my shop
        </h1>
        <AwesomeSlider
          bullets={false}
          className=" p-4  lg:h-[600px] shadow-lg rounded md:h-[450px] h-[350px]"
        >
          <div data-src={require("../Images/clothes/pic1.jpg")} />
          <div data-src={require("../Images/clothes/pic2.jpg")} />
          <div data-src={require("../Images/clothes/pic3.jpg")} />
          <div data-src={require("../Images/clothes/pic4.jpg")} />
          <div data-src={require("../Images/clothes/pic5.jpg")} />
          <div data-src={require("../Images/clothes/pic6.jpg")} />
          <div data-src={require("../Images/clothes/pic7.jpg")} />
        </AwesomeSlider>
      </div>

      <h1 className="roboto font-semibold p-6 text-center capitalize underline text-4xl">
        My Products
      </h1>
      <div className="flex gap-4  p-4">
        {!(context?.serachdata && context?.serachdata.length > 0) ? (
          <div className="flex-[3] ">
            {selectedValues.length > 0 || RadioValue.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {Products?.map((item: any) => {
                  return (
                    <ProductCard key={item._id} item={item} path="/product" />
                  );
                })}
              </div>
            ) : (
              <MangeProduct path="/product" />
            )}
          </div>
        ) : (
          <div className="flex-[3]">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {context?.serachdata?.map((item: any) => {
                return (
                  <ProductCard key={item._id} item={item} path="/product" />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
