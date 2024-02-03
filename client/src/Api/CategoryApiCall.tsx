import axios from "axios";
export const GetAllCategory = async () => {

  try {
    const res = await axios.get(
      `${process.env.REACT_APP_HOST}/api/v1/category/categories`
    );
    const resdata = await res.data;

    return resdata.categories;
  } catch (error) {
    console.log("error in category fetching");
    return error;
  }
};

export const updateCategory = async (id:string, value:string) => {
  const Token = JSON.parse(localStorage.getItem("auth") as string).token ;
  try {
    const config = {
      headers: {
        token: Token,
      },
    };
    const data = {
      name: value,
    };
 
    const res=await axios.put(`${process.env.REACT_APP_HOST}/api/v1/category/update-category/${id}`,data,config);
    const resdata=await res.data.message;
    return resdata;
  } catch (error) {
    return error
  }
};

export const deleteCategory = async (id:string) => {
  const Token = JSON.parse(localStorage.getItem("auth") as string).token ;
    try {
      const config = {
        headers: {
          token: Token,
        },
      };
      
      const res=await axios.delete(`${process.env.REACT_APP_HOST}/api/v1/category/delete-category/${id}`,config);
      const resdata=await res.data.message;
      return resdata;
    } catch (error) {
        return error
    }
  };

 export const addcategory=async(name:string)=>{
  const Token = JSON.parse(localStorage.getItem("auth") as string).token ;
  try {
    const config = {
      headers: {
        token: Token,
      },
    };
    const res=await axios.post(`${process.env.REACT_APP_HOST}/api/v1/category/create-category`,{name},config);
    const resdata=await res.data.message;
    return resdata;
  } catch (error) {
    return error
  }

  }