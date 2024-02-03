import axios from "axios";
type cartType = {
    userid: string,
    pid:string,
    name: string,
    description: string,
    price: number,
    category: string,
    quantity: number,
    shipping: boolean,
    rating: number,
  }
  
export const saveCart=async(cartdata:cartType)=>{
  const Token = JSON.parse(localStorage.getItem("auth") as string).token ;
  const config = {
    headers: {
      token: Token,
    },
  };
try {
    const res=await axios.post(`${process.env.REACT_APP_HOST}/api/v1/cart/postCart_data`,cartdata,config);
    return res.data;
} catch (error) {
    return []
    
}
}

export const getCart=async(userid:string)=>{
  const Token = JSON.parse(localStorage.getItem("auth") as string)?.token ;
  const config = {
    headers: {
      token: Token,
    },
  };


    try {
        const res=await axios.get(`${process.env.REACT_APP_HOST}/api/v1/cart/getCart_data?userid=${userid}`,config);
        return res.data;    
    } catch (error) {
        return [];
    }
    
}

export const delete_1_Cart=async(userid:string,cartid:string,pid:string)=>{
  const Token = JSON.parse(localStorage.getItem("auth") as string).token ;
  const config = {
    headers: {
      token: Token,
    },
    data: { userid,cartid,pid},
  };
    try {
     
        const response = await axios.delete(`${process.env.REACT_APP_HOST}/api/v1/cart/deleteCart_data`,config);
        if (response.data.success) {
          console.log('Cart deleted successfully');
        
        } else {
          console.error('Error:', response.data.message);
        }
      } catch (error) {
        console.error('Error:');
      }

}
export const deleteManyCart=async(userid:string,cartIdsToDelete:string[])=>{
  const Token = JSON.parse(localStorage.getItem("auth") as string).token ;
  const config = {
    headers: {
      token: Token,
    },
  };
    try {
        
        const response = await axios.delete(`${process.env.REACT_APP_HOST}/api/v1/cart/multideleteCart_data`, {
          data: { userid, cartIdsToDelete }
        });
  
        if (response.data.success) {
          console.log('Cart deleted successfully');
        
        } else {
          console.error('Error:', response.data.message);
        }
      } catch (error) {
        console.error('Error:');
      }
}


export const updatecount=async(id:string,count:Number)=>{
  const Token = JSON.parse(localStorage.getItem("auth") as string).token ;
  const config = {
    headers: {
      token: Token,
    },
  };
try {
    const res=await axios.post(`${process.env.REACT_APP_HOST}/api/v1/cart/updateCount`,{cartid:id,Newcount:count},config);
    console.log(res.data)
    return res.data;
} catch (error) {
  console.log(error)
    return error
    
}
}



