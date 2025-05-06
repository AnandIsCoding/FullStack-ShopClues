import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchResultTab({ search, setSearch }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${BASE_URL}/product/all`);
        const data = await res.json();
        setProducts(data?.products);
      } catch (error) {
        console.log("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (!search) return setFilteredProducts([]);
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [search, products]);

  const handleNavigationToProduct = (id) => {
    setSearch("");
    navigate(`/product/${id}`);
  };

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute top-full mt-2 left-0 right-0 z-50 bg-white border border-gray-300 rounded-md shadow-xl text-gray-800 p-4 sm:px-6 sm:py-5 overflow-y-auto max-h-[500px] text-sm"
    >
      <div className="flex justify-end mb-2">
        <button
          onClick={() => setSearch("")}
          className="text-gray-500 text-lg hover:text-black transition-colors cursor-pointer"
          aria-label="Close"
        >
          ✕
        </button>
      </div>

      {filteredProducts?.length === 0 && search ? (
        <div className="text-gray-400 text-center">No products found.</div>
      ) : (
        filteredProducts?.slice(0, 20)?.map((item) => (
          <div
            key={item?._id}
            onClick={() => handleNavigationToProduct(item?._id)}
            className="flex items-center gap-4 mt-1 md:mt-0 px-2 sm:p-3 rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <img
              src={item?.thumbnail}
              alt={item?.title}
              className="h-12 w-12 object-contain rounded-md"
            />
            <span className="text-sm font-light text-gray-700 line-clamp-1">
              {item?.title}
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default SearchResultTab;
