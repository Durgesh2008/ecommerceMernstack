import axios from "axios"
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
type FilerArgs={
  checked:string[],
  radio:number[]
}
export const AddProduct=async(item:ProductType)=>{
  const Token = JSON.parse(localStorage.getItem("auth") as string).token ;

  const productdata=new FormData();
    productdata.append("name",item.name)
    productdata.append("description",item.description)
    productdata.append("category",item.category)
    productdata.append("quantity",item.quantity)
    productdata.append("price",item.price)
    productdata.append("rating",item.rating)
    productdata.append("image",item.image)
    
  const config = {
    headers: {
      token: Token,
      "Content-Type": "multipart/form-data"
    },
  };
    try {
        const res=await axios.post(`${process.env.REACT_APP_HOST}/api/v1/product/create-product`,item,config);
        const resdata=await res.data;
        return resdata;
    } catch (error) {
        return error;
    } 
}

export const getAllProducts=async(page:number,limit:number)=>{
  try {
    const res=await axios.get(`${process.env.REACT_APP_HOST}/api/v1/product/getAll-product?page=${page}&limit=${limit}`)
    const resData=await res.data;
    return resData;
  } catch (error) {
    return error;
  }
}
export const deleteProduct=async(id:string)=>{
  try {
    const res=await axios.delete(`${process.env.REACT_APP_HOST}/api/v1/product/delete-product/${id}`)
    const resdata=await res.data;
    return resdata.message;
  } catch (error) {
    return error;
  }
 
}
export const UPdateProduct=async(item:ProductType,id:string)=>{
  const Token = JSON.parse(localStorage.getItem("auth") as string).token ;
  const productdata=new FormData();
  productdata.append("name",item.name)
  productdata.append("description",item.description)
  productdata.append("category",item.category)
  productdata.append("quantity",item.quantity)
  productdata.append("price",item.price)
  productdata.append("rating",item.rating)
  productdata.append("image",item.image?item.image:"")

const config = {
  headers: {
    token: Token,
    "Content-Type": "multipart/form-data"
  },
};
  try {
    const res=await axios.put(`${process.env.REACT_APP_HOST}/api/v1/product/update-product/${id}`,item,config);
    const resdata=await res.data;
    return resdata;
   
  } catch (error) {
    return error;
  }
}

export const FilterProduct=async({checked,radio}:FilerArgs)=>{
  try {
    const res=await axios.post(`${process.env.REACT_APP_HOST}/api/v1/product/filter-product`,{checked,radio});
    const resdata=await res.data.Product;
    return resdata;
  } catch (error) {
    return error;
  }
}

