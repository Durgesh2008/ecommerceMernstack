import React, { ReactNode, createContext, useState,useEffect } from 'react'
import { itemType } from '../Pages/SingleProductDetails'
import { getCart } from '../Api/CartApicall'


type ChildrenProps={
    children:ReactNode
}
 type authUser={
    name:string,
    email:string,
    id:string,
    phone:string,
    address:string, 
    role:number,
    Islogin:boolean
    token:string,
    productId:string[] ,
 
}
type ItemType = {
  _id: string,
  name: string,
  slug: string,
  description: string,
  price: number,
  category: string,
  quantity: number,
  shipping: boolean,
  rating: number,
}

export type cartType = {
  _id: string,
  name: string ,
  slug: string,
  description: string,
  price: number,
  category: string,
  quantity: number,
  shipping: boolean,
  rating: number,
  userid:string,
  pid:string
}
 type userContext={
    Auth:authUser |null,
    setAuth:React.Dispatch<React.SetStateAction<authUser | null>>,
    keyword:string,
    setKeyword:React.Dispatch<React.SetStateAction<string>>,
    serachdata:ItemType[],
    setSearchData:React.Dispatch<React.SetStateAction<ItemType[]>>,
    cart:cartType[],
    setcart:React.Dispatch<React.SetStateAction<cartType[]>>,
    getCartData: () => Promise<void>,
    isfilter:Boolean,
    setisfilter:React.Dispatch<React.SetStateAction<boolean>>
}

export const SHOPCONTAEXT=createContext<userContext|null>(null);
const ShopProvider = ({children}:ChildrenProps) => {
  const [Auth, setAuth] = useState<authUser | null>(null)
const [isfilter,setisfilter] =useState(false)
const  [keyword,setKeyword]=useState<string>('');
const [serachdata,setSearchData]=useState<ItemType[]>([])
const [cart,setcart]=useState<cartType[]>([])
  useEffect(() => {
   const data=localStorage.getItem('auth');
   if(data!==null){
    setAuth(JSON.parse(data))
   }
   // eslint-disable-next-line 
  }, [])
  
  const getCartData=async()=>{
    const id = JSON.parse(localStorage.getItem("auth") as string)?.id ;
    if (id){
      let x=await getCart(id);
      setcart(x.carts);
      let local=JSON.parse(localStorage.getItem("auth") as string)
      const existingAuth: authUser = {
        name:local?.name,
        email:local?.email ,
        id:local?.id,
        phone: local?.phone,
        address:local?.address,
        role: local?.role,
        Islogin: true,
        token:local?.token,
        productId: x.productId,
      };
        setAuth(existingAuth)
    }
   
 
   
  }
  useEffect(()=>{
  getCartData();
  },[])

  return (
  <SHOPCONTAEXT.Provider value={{Auth,setAuth,keyword,setKeyword,serachdata,setSearchData,cart,setcart,getCartData,isfilter,setisfilter}  }>
  {children}
  </SHOPCONTAEXT.Provider>
  )
}

export default ShopProvider