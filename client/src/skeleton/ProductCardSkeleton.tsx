import React from "react";
import Skeleton from "react-loading-skeleton";

 const ProductCardSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-5">

    <Cardp/>
    <Cardp/>
    <Cardp/>
    <Cardp/>
    <Cardp/>
    <Cardp/>
    
    </div>
   
  );
};

export  const Cardp = ()=> {
return(
    <div className="drop-shadow-lg   transition-all ease-in">
    <div className="flex flex-col h-min w-full p-1 border-box bg-white rounded xl">
      <div className="flex rounded flex-col w-full h-48 bg-gray-200">
        <Skeleton height={48} width="100%" />
      </div>

      {/* Placeholder for product details */}
      <div className="flex border-box p-1 flex-col">
        <p className="text-sm text-gray-500 font-roboto capitalize">
          <Skeleton width={100} />
        </p>
        <p className="font-inter ">
          <Skeleton width={150} />
        </p>
        <p className="font-poppins font-medium">
          <Skeleton width={50} />
        </p>
      </div>

     
      <div className="flex justify-between mt-3">
        <button className="bg-btn_bg w-full shadow-btn__shadow p-2 font-inter font-semibold text-[#ffffff] rounded">
          <Skeleton  />
        </button>
       
      </div>
    </div>
     </div>
)
}
export default ProductCardSkeleton