import React from "react";
import Slider from "../MiniUi/Slider";

const BannerSection = () => {
  return (
    <div className="w-full  px-2 py-1 ">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row gap-4">
        {/* Left Section - Slider */}
        <div className="flex-1  rounded  overflow-hidden">
          
            {/* Slider Placeholder */}
            <Slider/>
         
        </div>

        {/* Right Section - Vertical Ads */}
        <div className="w-full lg:w-[250px] flex flex-row overflow-x-scroll md:flex-col  gap-4 ">
          {[
            {
              title: "Refurb Store",
              image: "https://cdn.shopclues.com/images/banners/2023/Apr/14/2Platinum_Srushty_14April23.jpg",
            },
            {
              title: "Fashion Store",
              image: "https://cdn.shopclues.com/images/banners/2023/Apr/14/1Platinum_Srushty_14April23.jpg",
            },
            {
              title: "Best of Home",
              image: "https://cdn.shopclues.com/images/banners/2023/Apr/14/3Platinum_Srushty_14April23.jpg",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded shadow p-0 md:p-2 flex flex-col items-center text-center"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full md:w-[80%] md:h-auto object-cover md:object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BannerSection;
