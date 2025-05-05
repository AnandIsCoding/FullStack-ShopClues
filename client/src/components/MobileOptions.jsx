import React from "react";
import {
  FaSearch,
  FaHeart,
  FaUser,
  FaShoppingCart,
  FaHome,
} from "react-icons/fa";
import { IoHomeOutline } from "react-icons/io5";
import { IoMdHeartEmpty, IoMdNotificationsOutline } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { BsPerson } from "react-icons/bs";

function MobileOptions() {
  const navigate = useNavigate();

  return (
    <div className="fixed md:hidden bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-md z-50 flex justify-around items-center py-2 sm:py-3 text-sm sm:text-sm">
      
      {/* Home */}
      <div
        onClick={() => navigate('/')}
        className="flex flex-col items-center justify-center text-[#24A3B5] cursor-pointer hover:text-[#1a7c8c] active:scale-95 transition-transform duration-150"
      >
        <IoHomeOutline className="text-2xl sm:text-3xl" />
        <span className="mt-1 text-xs sm:text-sm font-medium">Home</span>
      </div>

      {/* Account */}
      <div className="flex flex-col items-center justify-center text-[#24A3B5] cursor-pointer hover:text-[#1a7c8c] active:scale-95 transition-transform duration-150">
        <BsPerson className="text-2xl sm:text-3xl" />
        <span className="mt-1 text-xs sm:text-sm font-medium">Account</span>
      </div>

      {/* Wishlist */}
      <div
        onClick={() => navigate('/wishlist')}
        className="flex flex-col items-center justify-center text-[#24A3B5] active:scale-95 transition-transform duration-150 cursor-pointer"
      >
        <IoMdHeartEmpty className="text-xl sm:text-2xl" />
        <span className="mt-1 text-xs sm:text-sm font-medium">Wishlist</span>
      </div>

      {/* Notifications */}
      <div className="flex flex-col items-center justify-center text-[#24A3B5] cursor-pointer active:scale-95 transition-transform duration-150">
        <IoMdNotificationsOutline className="text-xl sm:text-2xl" />
        <span className="mt-1 text-xs sm:text-sm font-medium">Alerts</span>
      </div>

      {/* Cart */}
      <div
        onClick={() => navigate('/cart')}
        className="flex flex-col items-center justify-center text-[#24A3B5] cursor-pointer active:scale-95 transition-transform duration-150"
      >
        <IoCartOutline className="text-xl sm:text-2xl" />
        <span className="mt-1 text-xs sm:text-sm font-medium">Cart</span>
      </div>
      
    </div>
  );
}

export default MobileOptions;
