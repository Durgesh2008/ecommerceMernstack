import axios from "axios";
import { useEffect, useState } from "react";
type userType = {
  _id: String,
  name: String,
  email:String,
  phone:String,
  address:String,
  role: Number;
};
const AlluserList = () => {
  const [users, setUsers] = useState([]);
  const Fetchuser = async () => {
    const Token = JSON.parse(localStorage.getItem("auth") as string).token;
    const config = {
      headers: {
        token: Token,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_HOST}/api/v1/auth/alluser`,
        config
      );
      const resdata = res.data;
      setUsers(resdata.users);
    } catch (error) {
      alert("error in alluser fetching");
    }
  };

  useEffect(() => {
    Fetchuser();
  }, []);
  return (
    <>
    <section className="flex flex-col  ">
      <h1 className="text-[#000f00] mb-6 font-roboto font-bold text-center md:text-[30px] text-[24px] uppercase">
        Manage user
      </h1>

    </section>
      <div className="relative overflow-x-auto md:w-full mx-3">
        <table className="w-full   text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-[#3F3F3F] uppercase bg-[#6EE5F0] dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 md:text-base text-[12px] font-roboto "
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 md:text-base text-[12px] font-roboto"
              >
                Email
              </th>
              <th
                scope="col"
                className="px-6 md:text-base text-[12px]  py-3 font-roboto"
              >
                Mobile No.
              </th>
              <th
                scope="col"
                className="px-6 py-3 md:text-base text-[12px]  font-roboto"
              >
                Address
              </th>
              <th
                scope="col"
                className="px-6 py-3 md:text-base text-[12px]  font-roboto"
              >
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {users?.map((ele:userType,i) => {
              return (
                <tr
                key={ele._id ? ele._id : i.toString() as any}
                  className="bg-white border-b  dark:bg-gray-800 dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-inter capitalize md:text-base text-[12px]   font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                   {ele?.name}
                  </th>
                  <td className="px-6 py-4 md:text-base text-[12px]   font-poppins">
                  {ele.email}
                  </td>
                  <td className="px-6 py-4 md:text-base text-[12px]  font-poppins">
                   {ele.phone}
                  </td>
                  <td className="px-6 capitalize md:text-base text-[12px]  py-4 font-poppins ">
                   {ele.address}
                  </td>
                  <td className="px-6 md:text-base text-[12px]  py-4 font-poppins">
                   {ele.role===1?"Admin":"User"}
                  </td>
                </tr>
              );
            })}
          
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AlluserList;
