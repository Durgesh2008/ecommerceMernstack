import  { useEffect, useState } from 'react'
import { getAllProducts } from '../../Api/ProductApicall';
import ProductCard from '../../components/ProductCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import DataLoader from './DataLoader';
import ScrollToTop from "react-scroll-to-top";
import {SlArrowUp} from 'react-icons/sl'
type itemType = {
  _id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  category: {
    _id: string;
    name: string;
    slug: string;
    __v: number;
  };
  quantity: number;
  shipping: boolean;
  size:number,
  rating: number;
};
  
 
// ...

const MangeProduct = () => {
  const [page, setPage] = useState(1);
  const limit =6;
  const [Products, setProducts] = useState<itemType[]>([]);
  const [size, setSize] = useState<number>(1);

  const GetProduct = async () => {
    const res = await getAllProducts(page, limit);
    setSize(res.totalCount);
    if(Products.length===0)
    setProducts(res.Product);
  else{
    
      setProducts( [...Products, ...res.Product]);
    
  }
  }

 useEffect(()=>{
  GetProduct();
 },[page])

  const fetchMoreData = async () => {
     setPage(pre=>pre+1);
   
   
  }

  return (
    <>
      <InfiniteScroll
        dataLength={Products.length} 
        next={fetchMoreData}
        hasMore={Products.length < size} 
        loader={<DataLoader/>}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {Products?.map((item) => {
            return (<ProductCard key={item._id} item={item} />)
          })
          }

      <ScrollToTop className='flex items-center justify-center text-[30px] m-2' component={<SlArrowUp/>}  smooth />
        </div>
      </InfiniteScroll>
      
    </>
  )
}

export default MangeProduct;
