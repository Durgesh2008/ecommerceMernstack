import  { useEffect, useState } from 'react'
import { getAllProducts } from '../../Api/ProductApicall';
import ProductCard from '../../components/ProductCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import DataLoader from './DataLoader';
import ScrollToTop from "react-scroll-to-top";
import {SlArrowUp} from 'react-icons/sl'
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import ProductCardSkeleton from '../../skeleton/ProductCardSkeleton';
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

const MangeProduct = ({path}:any) => {
  const [page, setPage] = useState(1);
  const limit =6;
  const [Products, setProducts] = useState<itemType[]>([]);
  const [size, setSize] = useState<number>(1);

  const GetProduct = async () => {
    const res = await getAllProducts(page, limit);
    setSize(res.totalCount);
    setProducts(res.Product);

  }

 useEffect(()=>{
  GetProduct();
 },[])

  const fetchMoreData = async () => {
     setPage(pre=>pre+1);
     const res = await getAllProducts(page+1, limit);
     setProducts( [...Products, ...res.Product]);
   
  }

  return (
    <>
      <InfiniteScroll
        dataLength={Products.length} 
        next={fetchMoreData}
        hasMore={Products.length < size} 
        loader={<ProductCardSkeleton />}
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
          {Products?.map((item) => {
            return (<ProductCard key={item._id} item={item} path={path}/>)
          })
          }

      <ScrollToTop className='flex items-center justify-center text-[30px] m-2' component={<SlArrowUp/>}  smooth />
        </div>
      </InfiniteScroll>
      
    </>
  )
}

export default MangeProduct;
