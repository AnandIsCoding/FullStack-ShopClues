import React from "react";
import {
  FaSearch,
  FaHeart,
  FaUser,
  FaShoppingCart,
} from "react-icons/fa";
import { IoMdHeartEmpty, IoMdNotificationsOutline } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function MobileOptions() {
  const navigate = useNavigate()
  return (
    <div className="fixed md:hidden bottom-0 left-0 right-0 bg-white border-t border-gray-300 shadow-md z-50 flex justify-around items-center py-2 sm:py-3 text-sm sm:text-sm">
      {/* Account */}
      <div className="flex flex-col items-center justify-center text-[#24A3B5] cursor-pointer">
        <FaUser className="text-xl sm:text-2xl" />
        <span className="mt-1">Account</span>
      </div>

      {/* Wishlist */}
      <div  onClick={()=>navigate('/wishlist')} className="flex flex-col items-center justify-center text-[#24A3B5] cursor-pointer">
        <IoMdHeartEmpty className="text-xl sm:text-2xl" />
        <span className="mt-1">Wishlist</span>
      </div>

      {/* Notifications */}
      <div className="flex flex-col items-center justify-center text-[#24A3B5] cursor-pointer">
        <IoMdNotificationsOutline className="text-xl sm:text-2xl" />
        <span className="mt-1">Alerts</span>
      </div>

      {/* Cart */}
      <div  onClick={()=>navigate('/cart')} className="flex flex-col items-center justify-center text-[#24A3B5] cursor-pointer">
        <IoCartOutline className="text-xl sm:text-2xl" />
        <span className="mt-1">Cart</span>
      </div>

      
    </div>
  );
}

export default MobileOptions;
