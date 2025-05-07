import React from 'react';
import toast from 'react-hot-toast';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

function Cart() {
  const cartItems = useSelector(state => state.user.cart);
  const navigate = useNavigate();

  const totalProducts = cartItems?.length || 0;

  const totalPrice = cartItems?.reduce((acc, item) => {
    return acc + (item?.productId?.price || 0);
  }, 0);

  return (
    <div className="min-h-screen p-4 md:p-8 bg-gray-50">
      <h1 className="text-3xl font-semibold mb-6">Your Cart</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left side - Product List */}
        <div className="w-full lg:w-2/3 space-y-6">
          {cartItems?.length === 0 ? (
            <p className="text-gray-500">Your cart is empty.</p>
          ) : (
            cartItems?.map((item) => (
              <div
                key={item._id}
                className="bg-white p-4 rounded-xl shadow hover:shadow-md transition cursor-pointer flex gap-4 items-center"
                onClick={() => navigate(`/product/${item?.productId?._id}`)}
              >
                <img
                  src={item?.productId?.thumbnail}
                  alt={item?.productId?.title}
                  className="w-28 h-28 object-contain"
                />
                <div className="flex flex-col">
                  <h2 className="text-lg font-bold">{item?.productId?.title}</h2>
                  <p className="text-gray-600 text-sm">{item?.productId?.description?.slice(0,100)}...</p>
                  <p className="text-xl font-semibold text-green-600 mt-2">
                    ₹{item?.productId?.price}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right side - Summary Panel */}
        <div className="w-full lg:w-1/3 bg-white p-6 rounded-xl shadow space-y-4 h-fit sticky top-20">
          <h2 className="text-xl font-semibold border-b pb-2">Order Summary</h2>
          <p className="text-gray-700 flex justify-between">
            Total Products: <span className="font-medium">{totalProducts}</span>
          </p>
          <p className="text-gray-700 flex justify-between">
            Total Price: <span className="font-medium text-green-600">₹{totalPrice}</span>
          </p>
          <button
            className="w-full bg-[#24A3B5] text-white py-2 rounded-lg mt-4 hover:bg-blue-400 cursor-pointer transition"
            onClick={()=>toast.error('under Construction ...')}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
