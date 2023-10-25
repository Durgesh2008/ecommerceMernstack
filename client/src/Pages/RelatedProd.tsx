import React from 'react'
import { Link } from 'react-router-dom'
import { itemType } from './SingleProductDetails'

const RelatedProd = ({products}:any) => {
    console.log(JSON.stringify(products))
  return (
   <>
   <div className="bg-white ">
  <div className="mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8">
    <h2 className="text-2xl font-bold tracking-tight font-roboto capitalize text-gray-900">Customers also purchased</h2>

    <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
     {
        products?.map((product:itemType)=>{
            return(
                <Link  to={`/product/${product.slug}`} className="group border p-1 relative cursor-pointer">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md  lg:aspect-none group-hover:opacity-75 lg:h-80">
                  <img src={`${process.env.REACT_APP_HOST}/api/v1/product/product-photo/${product?._id}`} alt="Front of men&#039;s Basic Tee in black." className="h-full w-full object-contain object-center p-2"/>
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <div>
                        <span aria-hidden="true" className="absolute inset-0 font-poppins"></span>
                     {product.name}
                      </div>
                    </h3>
                 
                  </div>
                  <p className="text-sm font-medium text-gray-900 font-poppins">${product?.price}</p>
                </div>
              </Link>
            )
        })
     }

     
    </div>
  </div>
</div>
   </>
  )
}

export default RelatedProd