import { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { GetAllCategory } from "../../Api/CategoryApiCall";
import { AddProduct } from "../../Api/ProductApicall";
import Loader from "../../components/Loader";

type AllCategoryPrps = {
  name: string;
  _id: string;
};
type ProductType = {
  name: string;
  description: string;
  category: string;
  quantity: string;
  image: string;
  shipping: string;
  rating: string;
  price: string;
};
const CreateProduct = () => {
  const [AllCategory, setAllCategory] = useState<[]>([]);
  const [isLoading,setIsloading]=useState<Boolean>(false);
  const {
    register,
    handleSubmit,
 
    formState: { errors },
    setValue,
  } = useForm<ProductType>();

  const onSubmit = async (input: ProductType) => {
  setIsloading(true)
    await AddProduct({...input,image:input.image[0]});
    setIsloading(false)
    setValue("name","");
    setValue("description","");
    setValue("price","");
    setValue("category","");
    setValue("rating","");
    setValue("shipping","");
    setValue("quantity","");
    setValue("image","");
  };
  // get all category
  const getcategory = async () => {
    let data = await GetAllCategory();
    setAllCategory(data);
  };
  useEffect(() => {
    getcategory();
  }, []);

  return (
  
  <>
  {isLoading && <Loader/>}
   <section className="flex flex-col items-center justify-center">
    <h1 className="text-[#000f00] mb-6 font-roboto font-bold text-center md:text-[30px] text-[24px] uppercase">
      Manage Product
    </h1>
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-[80%] mx-auto border border-gray-700 p-4"
    >
      <div className="relative mb-7">
        <input
          type="text"
          {...register("name", { required: true })}
          className="block py-2.5 px-0 w-full text-lg text-[#000000] bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
        {errors.name && (
          <p className="text-[#d95454] font-roboto text-[16px]">
            {" "}
            name is required.
          </p>
        )}
        <label className="peer-focus:font-medium absolute font-poppins text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Name
        </label>
      </div>
      <div className="relative mb-7">
        <input
          type="text"
          {...register("description", { required: true })}
          className="block py-2.5 px-0 w-full text-lg text-[#000000] bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
        {errors.description && (
          <p className="text-[#d95454] font-roboto text-[16px]">
            {" "}
            description is required.
          </p>
        )}
        <label className="peer-focus:font-medium capitalize absolute font-poppins text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          description
        </label>
      </div>
      <div className="relative mb-7">
        <select
          {...register("category", { required: true })}
          className="block py-2.5 px-1 w-full text-lg text-[#000000] bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        >
          {AllCategory.map((item: AllCategoryPrps) => {
            return (
              <option key={item._id} value={item._id}>
                {item.name}
              </option>
            );
          })}
        </select>
        {errors.category && (
          <p className="text-[#d95454] font-roboto text-[16px]">
            {" "}
            category is required.
          </p>
        )}
        <label className="peer-focus:font-medium capitalize absolute font-poppins text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          category
        </label>
      </div>
      <div className="relative mb-7">
        <input
          type="number"
          {...register("quantity", { required: true })}
          className="block py-2.5 px-0 w-full text-lg text-[#000000] bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
        {errors.quantity && (
          <p className="text-[#d95454] font-roboto text-[16px]">
            {" "}
            quantity is required.
          </p>
        )}
        <label className="peer-focus:font-medium capitalize absolute font-poppins text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          quantity
        </label>
      </div>
      <div className="relative mb-7">
        <input
          type="file"
          accept="image/*"
          {...register("image", { required: true })}
          className="block py-2.5 px-0 w-full text-lg text-[#000000] bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
        {errors.image && (
          <p className="text-[#d95454] font-roboto text-[16px]">
            {" "}
            image is required.
          </p>
        )}
        <label className="peer-focus:font-medium capitalize absolute font-poppins text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          Image
        </label>
      </div>
      <div className="relative mb-7">
        <input
          type="number"
          {...register("price", { required: true })}
          className="block py-2.5 px-0 w-full text-lg text-[#000000] bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
        {errors.price && (
          <p className="text-[#d95454] font-roboto text-[16px]">
            {" "}
            price is required.
          </p>
        )}
        <label className="peer-focus:font-medium capitalize absolute font-poppins text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          price
        </label>
      </div>

      <div className="relative mb-7">
        <input
          type="number"
          {...register("rating", { required: true })}
          className="block py-2.5 px-0 w-full text-lg text-[#000000] bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        />
        {errors.rating && (
          <p className="text-[#d95454] font-roboto text-[16px]">
            {" "}
            rating is required.
          </p>
        )}
        <label className="peer-focus:font-medium capitalize absolute font-poppins text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          rating
        </label>
      </div>
      <div className="relative mb-7">
        <select
          {...register("shipping", { required: true })}
          className="block py-2.5 px-0 capitalize w-full text-lg text-[#000000] bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
        >
          <option value="" disabled>
            Select Option
          </option>
          <option value="false">false</option>
          <option value="true">true</option>
        </select>
        {errors.shipping && (
          <p className="text-[#d95454] font-roboto text-[16px]">
            {" "}
            shipping is required.
          </p>
        )}
        <label className="peer-focus:font-medium capitalize absolute font-poppins text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
          shipping
        </label>
      </div>
      <button
        className="font-poppins bg-[#19A5B1]  font-medium  text-white  p-3 rounded-lg"
        type="submit"
      >
        Add Product
      </button>
    </form>
  </section>
  </>
  
  );
};

export default CreateProduct;
