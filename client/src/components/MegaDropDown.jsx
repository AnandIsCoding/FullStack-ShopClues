import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MegaDropDown = ({ categoryId, categoryName, setHoveredCategoryId }) => {
  const [products, setProducts] = useState([]);
  const [hoveredImage, setHoveredImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate()

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/product/category/${categoryId}`
      );
      setProducts(res.data?.products || []);
      if (res.data?.products?.[0]) {
        setHoveredImage(res.data.products[0].thumbnail); // default preview
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (categoryId) fetchProducts();
  }, [categoryId]);

  return (
    <div className="mega-dropdown" id={`dropdown-${categoryId}`}>
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-6 p-6 text-sm text-gray-700">
        {/* Product List */}
        <div className="col-span-2">
          <h3 className="font-semibold text-black mb-2">{categoryName}</h3>
          {loading ? (
            <p className="animate-pulse text-gray-400">Loading products...</p>
          ) : products.length > 0 ? (
            <ul className="space-y-3 overflow-y-scroll max-h-[40vh]">
              {products?.map((product) => (
                <li
                  key={product?._id}
                  onClick={()=> {
                      navigate(`/product/${product?._id}`)
                      setHoveredCategoryId(null)
                  }}
                  className="flex items-center gap-2 cursor-pointer"
                  onMouseEnter={() => setHoveredImage(product.thumbnail)}
                >
                  <img
                    src={product?.thumbnail}
                    alt={product?.title}
                    className="w-10 h-10 object-cover rounded"
                  />
                  <span className="hover:text-blue-600 truncate max-w-[150px]">
                    {product.title}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-400">No products found.</p>
          )}
        </div>

        {/* Dynamic Image Preview Section */}
        <div className="col-span-2 hidden  md:flex items-center justify-center bg-gray-100 rounded-md p-4">
          {hoveredImage ? (
            <img
              src={hoveredImage}
              alt="Preview"
              className="w-52 h-52 object-contain transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <p className="text-gray-400">Hover over a product to preview</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MegaDropDown;
