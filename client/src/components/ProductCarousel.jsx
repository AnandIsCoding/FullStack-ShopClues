import { FaArrowRight } from "react-icons/fa";
import React from "react";

const shimmerCount = 9;

const ProductCarousel = ({ name, products }) => {
  const isLoading = !products || products.length === 0;

  return (
    <div className="my-8">
      <h2 className="text-xl font-semibold mb-4 px-4">{name}</h2>
      <div
        className={`flex overflow-x-auto gap-4 px-4 scrollbar-hide ${
          isLoading ? "bg-none" : "bg-white"
        } `}
      >
        {isLoading
          ? Array.from({ length: shimmerCount }).map((_, index) => (
              <div
                key={index}
                className="min-w-[150px] h-[200px] px-6 py-8 rounded bg-gray-300 animate-pulse "
              ></div>
            ))
          : products.map((product) => (
              <div
                key={product?._id}
                className="group min-w-[150px] px-6 py-8 rounded-md cursor-pointer bg-white hover:shadow-md  transition duration-200"
              >
                <img
                  src={product?.thumbnail}
                  alt={product?.name}
                  className="w-full h-28 object-contain mb-2 transition-transform duration-200 group-hover:scale-105"
                />
                <p className="text-sm font-extralight truncate">
                  {product?.title}
                </p>
                <p className="text-sm font-normal">₹{product?.price}</p>
                <p className="text-sm font-normal">Stock : {product?.stock}</p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default ProductCarousel;
