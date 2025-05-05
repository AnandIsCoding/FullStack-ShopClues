import React, { useState } from "react";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaHeart,
  FaUser,
  FaShoppingCart,
} from "react-icons/fa";
import { IoMdHeartEmpty, IoMdNotificationsOutline } from "react-icons/io";
import { IoCartOutline } from "react-icons/io5";

import { NavCategoryItems } from "../utils/HelperData.js";
import MegaDropDown from "./MegaDropDown.jsx";
import SearchResultTab from "./SearchResultTab.jsx";
import { useNavigate } from "react-router-dom";


export default function Navbar() {
  const [search, setSearch] = useState("");
  const [hoveredCategoryId, setHoveredCategoryId] = useState(null);
  const [hoveredCategoryName, setHoveredCategoryName] = useState(null);


  const navigate = useNavigate()

  return (
    <nav className="w-full sticky top-0 z-50 text-sm font-sans bg-white">
      {/* Top Info Bar */}
      <div className="w-full  text-xs flex justify-between md:justify-end pl-2 pr-1 py-1 gap-4 bg-white!">
        <div onClick={()=>navigate('/')} className="text-xl font-bold text-teal-600 md:hidden">
          <span className="text-black">SHOP</span>
          <span className="text-teal-600">CLUES</span>
        </div>
        <div className="flex gap-2">
          <a href="#" className="hover:underline text-gray-600 ">
            Sell With Us
          </a>
          <a href="#" className="hover:underline text-gray-600 ">
            Contact Us
          </a>
          <a href="#" className="hover:underline text-gray-600 ">
            Download App
          </a>
        </div>
      </div>

      {/* Main Navbar */}
      {/* Mobile screen hidden 🌿🌿🌿🌿✅✅✅✅✅✅✅ */}
      <div className="bg-white shadow-md w-full">
        <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between py-3 pl-4 lg:px-0">
          {/* Logo */}
          <div onClick={()=>navigate('/')} className="text-xl cursor-pointer font-bold text-teal-600 hidden lg:flex">
            <span className="text-black">SHOP</span>
            <span className="text-teal-600">CLUES</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 mx-4 flex relative">
            {" "}
            {/* Make this relative so SearchResultTab is positioned relative to input */}
            <div className="w-full flex border border-gray-300 bg-[#E9F6F7] rounded overflow-hidden">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="What is on your mind today?"
                className="px-4 py-[0.6rem] w-full focus:outline-none"
              />
              <button className="searchbg text-white font-semibold px-8 flex items-center cursor-pointer">
                Search
              </button>
            </div>
            {/* Put it here so it appears below input, relative to this wrapping div */}
            {search.length > 0 && (
              <SearchResultTab search={search} setSearch={setSearch} />
            )}
          </div>


              {/* mOBILE SCREEN hidden 🌿🌿🌿🌿✅✅✅✅✅✅✅ */}
          {/* Right Icons */}
          <div className=" items-center gap-5 text-gray-600 text-lg hidden lg:flex">
            <div className="flex items-center gap-1 text-sm text-blue-600 cursor-pointer">
              <FaMapMarkerAlt className="text-[#24A3B5] text-2xl font-bold" />
              <span className="hidden sm:inline text-[#24A3B5] text-xxs">
                Location
              </span>
            </div>
            <IoMdHeartEmpty onClick={()=>navigate('/wishlist')} className="cursor-pointer text-[#24A3B5] text-2xl font-bold" />
            <IoMdNotificationsOutline className="cursor-pointer text-[#24A3B5] text-2xl font-bold" />
            <IoCartOutline onClick={()=>navigate('/cart')} className="cursor-pointer text-[#24A3B5] text-2xl font-bold" />
            <button className="text-sm bg-white  border border-blue-600 px-3 py-1 rounded">
              Sign In / Account
            </button>
          </div>
        </div>
      </div>

      {/* Category Menu */}
      <div className="w-full bg-[#24A3B5] text-white text-xxs sm:text-xs font-thin uppercase">
        <div className="overflow-x-auto md:overflow-x-hidden">
          <div
            className="flex flex-nowrap md:flex-wrap gap-4 px-4 py-2 w-max md:w-full 
                    justify-start md:justify-center"
          >
            {NavCategoryItems.map((item, index) => (
              <span
                key={index}
                onMouseEnter={() => {
                  setHoveredCategoryId(index);
                  setHoveredCategoryName(item);
                }}
                onMouseLeave={() => {
                  setHoveredCategoryId(null);
                  setHoveredCategoryName(null);
                }}
                className="cursor-pointer whitespace-nowrap px-2 py-1"
              >
                {item}
              </span>
            ))}
          </div>
        </div>

        {hoveredCategoryId !== null && (
          <div className="absolute left-0 top-36 md:top-32 w-full z-50">
            <MegaDropDown
              categoryId={hoveredCategoryId}
              categoryName={hoveredCategoryName}
            />
          </div>
        )}
      </div>
    </nav>
  );
}
