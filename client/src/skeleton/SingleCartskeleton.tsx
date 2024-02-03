import React from "react";
import Skeleton from "react-loading-skeleton";

const SingleCartskeleton: React.FC = () => {
  return (
    <section className="text-gray-700 body-font overflow-hidden bg-white">
      <div className="container px-5 py-24 mx-auto">
        <div className="lg:w-4/5 mx-auto flex flex-wrap">
          {/* Image Placeholder */}
          <img alt="ecommerce" className="lg:w-[33%] p-5 w-full object-cover object-center rounded border border-gray-200" />

          <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
            {/* Category Placeholder */}
            <h2 className="text-sm title-font text-gray-500 tracking-widest">
              <Skeleton width={100} />
            </h2>

            {/* Product Name Placeholder */}
            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
              <Skeleton width={200} />
            </h1>

            {/* Rating and Reviews Placeholder */}
            <div className="flex mb-4">
              <span className="flex items-center">
                <Skeleton width={50} height={20} />
                <span className="text-gray-600 ml-3">
                  <Skeleton width={50} />
                </span>
              </span>

              <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200">
                <Skeleton width={30} height={30} />
                <Skeleton width={30} height={30} />
                <Skeleton width={30} height={30} />
              </span>
            </div>

            {/* Description Placeholder */}
            <p className="leading-relaxed">
              <Skeleton count={4} />
            </p>

            {/* Color and Size Placeholder */}
            <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-200 mb-5">
              <div className="flex">
                <span className="mr-3">Color</span>
                <Skeleton width={30} height={30} />
                <Skeleton width={30} height={30} />
                <Skeleton width={30} height={30} />
              </div>

              <div className="flex ml-6 items-center">
                <span className="mr-3">Size</span>
                <Skeleton width={50} />
              </div>
            </div>

            {/* Price Placeholder */}
            <div className="flex">
              <span className="title-font font-medium text-2xl text-gray-900">
                <Skeleton width={80} />
              </span>

              {/* Edit, Delete, Like buttons Placeholder */}
              <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                <Skeleton width={50} />
              </button>

              <button className="flex ml-auto text-white bg-red-500 border-0 py-2 px-6 focus:outline-none hover:bg-red-600 rounded">
                <Skeleton width={70} />
              </button>

              <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
                <Skeleton width={30} height={30} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SingleCartskeleton;
