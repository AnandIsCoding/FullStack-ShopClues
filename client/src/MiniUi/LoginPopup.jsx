import React, { useState } from "react";
import {
  FiUser,
  FiArchive,
  FiHeart,
  FiBell,
  FiGift,
  FiDollarSign,
} from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import Signup from "./Signup";
import { setShowSignup, toggleSignupModal } from "../redux/slices/modal.slice";
import { useDispatch } from "react-redux";

function LoginPopup() {
  const navigate = useNavigate();
  let user = null
  const dispatch = useDispatch()

  const handleTogleSignup = () =>{
    dispatch(toggleSignupModal())
  }

  

  return (
    <div
      style={{ transition: "transform 1s ease-in-out" }}
      className={`absolute text-xs top-[-35vh] md:top-7 right-30  md:right-0 flex flex-col py-3  px-2 bg-white shadow-lg z-100 min-w-[220px] rounded-md text-black`}
    >
    {/* if user not present show login/signup button and onClick of that loginWithRedirect provided by auth0 */}
    {user ? (
        <div className="flex items-center justify-between mb-4">
          <img
            src={user?.picture}
            alt={user?.name}
            className="w-10 h-10 rounded-full"
          />
          <button
            className="w-full ml-2 px-4 py-2 bg-[#FF0C22] text-white rounded-full cursor-pointer"
            onClick={() => alert('hii')}
          >
            Logout
          </button>
        </div>
      ) : (
        
        <button onClick={handleTogleSignup}
          className="px-5 py-2 bg-[#FF0C22] text-white rounded-full cursor-pointer mb-4"
        >
          Login / Signup
        </button>
      )}
      {/* Menu Options */}
      <div
        onClick={() => navigate("/profile")}
        className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer"
      >
        <FiUser />
        <span>My Account</span>
      </div>

      <div
        onClick={() => navigate("/orders")}
        className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer"
      >
        <FiArchive />
        <span>Order History</span>
      </div>

      <div
        onClick={() => navigate("/wishlist")}
        className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer"
      >
        <FiHeart />
        <span>My Wishlist</span>
      </div>

      <div className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer">
        <FiBell />
        <span>Alerts & Coupons</span>
      </div>

      <div className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer">
        <FiGift />
        <span>Gift Card</span>
      </div>

      <div className="flex items-center gap-2 p-2 hover:bg-gray-50 cursor-pointer">
        <FiDollarSign />
        <span>Shop CAsh</span>
      </div>


      
    </div>
  );
}

export default LoginPopup;
