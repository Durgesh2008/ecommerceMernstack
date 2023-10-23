import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiTwotoneEdit, AiTwotoneDelete } from "react-icons/ai";
import {
  GetAllCategory,
  addcategory,
  deleteCategory,
  updateCategory,
} from "../../Api/CategoryApiCall";
import { SHOPCONTAEXT } from "../../context/Shopcontext";

type CategoryType = {
  name: string,
  Updatename:string,
  price:number,
  
};
type AllCategoryPrps = {
  name: string;
  _id: string;
};

const CreateCategory = () => {
const [AllCategory,setAllCategory]=useState<[]>([])
 const [IsmodalOpen,setIsmodalOpen]=useState<Boolean>(false)
 const [id,setid]=useState<string>('');
  const getcategory = async () => {
    let data = await GetAllCategory();
 setAllCategory(data);
  };
  useEffect(() => {
    getcategory();
  }, []);

  const form1=useForm<CategoryType>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CategoryType>();

  const onSubmit = async (input: CategoryType) => {
    try {
      const res = await addcategory(input.name);
      // toast.success(res);
      getcategory();
      setValue("name", "");
    } catch (error) {
      // toast.error("error in addtion of category");
    }
  };

  const modalSubmit =async (input: CategoryType) => {
    try {
      const res=await updateCategory(id,input.Updatename);
      // toast.success(res)
      getcategory()
      form1.setValue("Updatename",'')
      setIsmodalOpen(false)
    } catch (error) {
      // toast.error('error in update category')
    }

  };
  const HandleEdit = (id: string, name: string) => {
setIsmodalOpen(true);
form1.setValue('Updatename',name)
setid(id)

  };
  const HandleDelete = async (id: string) => {
    try {
      const data = await deleteCategory(id);
      getcategory();
      // toast.success(data);
    } catch (error) {
      // toast.error("error in Delection");
    }
  };
  return (
    <section className="flex flex-col items-center justify-center">
      <h1 className="text-[#000f00] mb-6 font-roboto font-bold text-center md:text-[30px] text-[24px] uppercase">
        Manage Category
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
        <button
          className="font-poppins bg-[#19A5B1]  font-medium  text-white  p-3 rounded-lg"
          type="submit"
        >
          Add Caregory
        </button>
      </form>

      <div className="relative mt-5 w-[80%] mx-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-6 md:text-[16px] text-[12px] py-3 font-roboto font-bold"
              >
                Category name
              </th>

              <th
                scope="col"
                className="flex md:text-[16px] text-[12px] items-center justify-center py-3 font-roboto font-bold"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {AllCategory &&
              AllCategory.map((item: AllCategoryPrps) => {
                return (
                  <tr
                    key={item._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 md:text-[15px] capitalize text-[11px] font-poppins py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item.name}
                    </th>
                    <td className=" py-4  flex gap-5 text-[20px] items-center justify-center">
                      <AiTwotoneEdit
                        onClick={() => HandleEdit(item._id, item.name)}
                        className="cursor-pointer"
                      />
                      <AiTwotoneDelete
                        onClick={() => HandleDelete(item._id)}
                        className="cursor-pointer"
                      />
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
      <form
        onSubmit={form1.handleSubmit(modalSubmit)}
        className={`w-[80%] drop-shadow-lg absolute z-10 transition-all ease-in duration-500 bg-white mx-auto rounded-lg p-4 ${IsmodalOpen?" md:top-[50%] top-[35%]":' top-[-60%]'}`}
      >
        <div className="relative mb-7">
          <input
            type="text"
            {...form1.register("Updatename", { required: true })}
            className="block py-2.5 px-0 w-full text-lg text-[#000000] bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          />
          {errors.Updatename && (
            <p className="text-[#d95454] font-roboto text-[16px]">
              {" "}
              name is required.
            </p>
          )}
          <label className="peer-focus:font-medium absolute font-poppins text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
            Name
          </label>
        </div>
        <div className="flex items-center justify-around">

        <button
     
          className="font-poppins bg-[#19A5B1]  font-medium  text-white  p-3 rounded-lg"
          type="submit"
        >
          Update
        </button>
        <button
         onClick={()=>setIsmodalOpen(false)}
          className="font-poppins bg-[#19A5B1]  font-medium  text-white  p-3 rounded-lg"
          
        >
         Cancal
        </button>
        </div>
      </form>
      <ToastContainer />
    </section>
  );
};

export default CreateCategory;
