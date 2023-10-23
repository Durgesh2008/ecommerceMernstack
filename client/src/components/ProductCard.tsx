import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

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
  rating: number;
};

interface ProductCardProps {
  item: itemType;
}

const ProductCard: React.FC<ProductCardProps> = ({ item }) => {
   
  return (
    <Link to={`/admin_dashboard/mange_product/${item.slug}`} ><div className="flex flex-col h-min w-full p-1 border-box bg-white rounded xl">
    <div className="flex rounded flex-col w-ful w-full h-48 bg-gray-200">
      <img src={`${process.env.REACT_APP_HOST}/api/v1/product/product-photo/${item._id}`} className="w-full h-full" alt="Product_Image" />
    </div>
    <div className="flex border-box p-1 flex-col">
      <p className="text-sm text-gray-500 font-roboto capitalize">{item.category.name}</p>
      <p className='font-inter '>{item.name}</p>
      <p className='font-poppins font-medium'>${item.price.toFixed(2)}</p>
     
    </div>
    </div>
    </Link>
  );
};

export default ProductCard;
