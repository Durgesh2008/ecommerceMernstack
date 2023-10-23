import React, { ReactNode, createContext, useState,useEffect } from 'react'


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

 type userContext={
    Auth:authUser |null,
    setAuth:React.Dispatch<React.SetStateAction<authUser | null>>,
    location: string,
    setlocation:React.Dispatch<React.SetStateAction<string>>,
    AllCategory:[],
    setAllCategory:React.Dispatch<React.SetStateAction<[]>>
}


export const SHOPCONTAEXT=createContext<userContext|null>(null);
const ShopProvider = ({children}:ChildrenProps) => {
  const [Auth, setAuth] = useState<authUser | null>(null)
const [location,setlocation]=useState<string >('');
const [AllCategory, setAllCategory] = useState<[]>([]);
  useEffect(() => {
   const data=localStorage.getItem('auth');
   if(data!==null){
    setAuth(JSON.parse(data))
   }
   // eslint-disable-next-line 
  }, [])
  
  return (
  <SHOPCONTAEXT.Provider value={{Auth,setAuth,location,setlocation,AllCategory,setAllCategory}  }>
  {children}
  </SHOPCONTAEXT.Provider>
  )
}

export default ShopProvider