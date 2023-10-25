import React, { ReactNode, createContext, useState,useEffect } from 'react'
import { itemType } from '../Pages/SingleProductDetails'


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
    token:string
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

 type userContext={
    Auth:authUser |null,
    setAuth:React.Dispatch<React.SetStateAction<authUser | null>>,
    location: string,
    setlocation:React.Dispatch<React.SetStateAction<string>>,
    keyword:string,
    setKeyword:React.Dispatch<React.SetStateAction<string>>,
    serachdata:ItemType[],
    setSearchData:React.Dispatch<React.SetStateAction<ItemType[]>>,
    cart:itemType[],
    setcart:React.Dispatch<React.SetStateAction<itemType[]>>,

}


export const SHOPCONTAEXT=createContext<userContext|null>(null);
const ShopProvider = ({children}:ChildrenProps) => {
  const [Auth, setAuth] = useState<authUser | null>(null)
const [location,setlocation]=useState<string >('');
const  [keyword,setKeyword]=useState<string>('');
const [serachdata,setSearchData]=useState<ItemType[]>([])
const [cart,setcart]=useState<itemType[]>([])
  useEffect(() => {
   const data=localStorage.getItem('auth');
   if(data!==null){
    setAuth(JSON.parse(data))
   }
   // eslint-disable-next-line 
  }, [])
  
  return (
  <SHOPCONTAEXT.Provider value={{Auth,setAuth,location,setlocation,keyword,setKeyword,serachdata,setSearchData,cart,setcart}  }>
  {children}
  </SHOPCONTAEXT.Provider>
  )
}

export default ShopProvider