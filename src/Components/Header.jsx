import React from "react";
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className="grid grid-cols-2 border border-gray-400 mb-10 max-md:grid-cols-1">
      {/* Left section */}
      <div className="text-[#414141] flex flex-col justify-center ml-25 max-md:m-auto max-md:my-5">
        <div className="flex items-center gap-2">
          <p className="w-10 h-0.5 bg-gray-600"></p>
          <p className="text-md font-medium">OUR BESTSELLERS</p>
        </div>

        <h1 className="prata-regular text-5xl sm:py-3 lg:text-5xl leading-relaxed">Latest Arrivals</h1>

        <div className="flex items-center gap-2">
          <p className="text-xl">SHOP NOW</p>
          <p className="w-10 h-0.5 bg-gray-600"></p>
        </div>
      </div>

      {/* Right section */}
      <div>
        <img src={assets.hero_img} />
      </div>
    </div>
  );
};

export default Header;
