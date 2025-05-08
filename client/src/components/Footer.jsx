import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";
import { SiAndroid, SiApple } from "react-icons/si"; 
import { NavLink } from "react-router-dom";

const ShopCluesFooter = () => {
  return (
    <footer className="bg-gray-100 text-gray-700 py-10 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-3 md:grid-cols-3 gap-8">
          {/* ShopClues Marketplace */}
          <div>
            <h4 className="font-semibold mb-4">ShopClues Marketplace</h4>
            <ul className="space-y-2">
              <li>
              <NavLink to='/contactus' className="hover:underline text-gray-600 ">
            Contact Us
          </NavLink>
              </li>
              <li>
                <a href="#">Careers</a>
              </li>
              <li>
                <a href="#">Terms of Use</a>
              </li>
              <li>
                <a href="#">Privacy Policy</a>
              </li>
              <li>
                <a href="#">Affiliates</a>
              </li>
              <li>
                <a href="#">Sitemap</a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <a href="#">Shopping</a>
              </li>
              <li>
                <a href="#">Offers & Promotions</a>
              </li>
              <li>
                <a href="#">Payments</a>
              </li>
              <li>
                <a href="#">Cancellation</a>
              </li>
              <li>
                <a href="#">Returns & Refunds</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>

          {/* My ShopClues */}
          <div>
            <h4 className="font-semibold mb-4">My ShopClues</h4>
            <ul className="space-y-2">
              <li>
                <NavLink to='/profile' className="hover:underline text-gray-600 ">
                            My Account
                          </NavLink>
              </li>
              <li>
                <a href="#">My Orders</a>
              </li>
              <li>
                <a href="#">My Shopping Bag</a>
              </li>
              <li>
                <a href="#">My Wishlist</a>
              </li>
            </ul>
          </div>

          {/* ShopClues Offerings */}
          {/* <div>
            <h4 className="font-semibold mb-4">ShopClues Offerings</h4>
            <div className="flex flex-wrap gap-2 text-gray-600">
              {[
                "Watches for Men",
                "Shoes for Men",
                "T-Shirts",
                "Jackets",
                "Laptops",
                "Smartphones",
                "Gaming Consoles",
                "Watches for Women",
                "Home Decor",
                "Jewelry",
                "Kids Wear",
                "Sports Gear",
                "Beauty Products",
                "Toys",
                "Furniture",
                "Groceries",
              ].map((item, index) => (
                <p key={index}>
                  <a href="#" className="text-sm">
                    {item} |{" "}
                  </a>
                </p>
              ))}
            </div>
          </div> */}
        </div>

        <div className="mt-10 pt-6 text-center flex flex-col md:flex-row bg-zinc-100 justify-between">
          {/* App Download Section android and iOS icon */}
          <div className="mb-4 flex justify-center items-center space-x-4">
            <span className="font-semibold">Download App</span>
            <SiAndroid size={24} className="text-green-500" />
            <SiApple size={24} className="text-black" />
          </div>

          {/* Social Media Links */}
          <div className="flex justify-center space-x-4 mb-4">
            <a href="#" aria-label="Facebook">
              <FaFacebookF size={20} className="text-blue-600" />
            </a>
            <a href="#" aria-label="Twitter">
              <FaTwitter size={20} className="text-blue-400" />
            </a>
            <a href="#" aria-label="Instagram">
              <FaInstagram size={20} className="text-pink-500" />
            </a>
            <a href="#" aria-label="YouTube">
              <FaYoutube size={20} className="text-red-600" />
            </a>
            <a href="#" aria-label="LinkedIn">
              <FaLinkedin size={20} className="text-blue-700" />
            </a>
          </div>

          {/* Copyright */}
          <p className="text-gray-500">
            © 2025 ShopClues | All rights reserved
          </p>
        </div>
      </div>

      {/* text content */}
      <div className="space-y-8 text-gray-700 text-md mx-2 md:mx-24 leading-relaxed mt-14">
        <div>
          <h4 className="font-semibold mb-2">
            ShopClues FASHION: Shop Online with India's most trusted destination
          </h4>
          <p>
            Genuine products from all the top brands get delivered right to your
            doorstep. Our sleek, immersive design allows you to easily navigate
            between categories and brand stores so that you can find a wide
            selection of
            <a href="#" className="underline mx-1">
              womenswear
            </a>
            ,
            online. You can also check our great offers and get the best prices
            on various products across lifestyle, fashion, and more.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">
            Online Shopping: Fast & convenient with the click of a button
          </h4>
          <p>
            The upside of online shopping at ShopClues FASHION online store, is
            that you'll save on time and most importantly money with ShopClues offers. 
            It's as simple as comparing products and prices online before making the right buy. 
            What's more, you also have the option to pay for your favourite brands and products 
            using our easy EMI options. Of course, you can buy and try – in the convenience of
            your home. Returns are easy too: We'll pick up your returns for free
            or you can also drop off the goods at the nearest brand store.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">
            ShopClues Shopping App: just a few clicks on Android & iOS
          </h4>
          <p>
            Download the Android app from the
            <a href="#" className="underline mx-1">
              Play Store
            </a>
            or the iOS app from
            <a href="#" className="underline mx-1">
              Apple App Store
            </a>
            and get set to enjoy a range of benefits. Apart from the best deals,
            amazing offers and the latest styles online, the app also gives you
            the flexibility to shop at your convenience. Use the easy share
            options to share your shopping with your friends and family to
            ensure you're buying something perfect.
          </p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">
            ShopClues: The most genuine place for Fashion and Lifestyle
          </h4>
          <p>
            With an exclusive Brand Store for
            <a href="#" className="underline mx-1">
              Westside Online
            </a>
            we have most of your trendy shopping needs taken care of. Make ShopClues 
            your online shopping destination and get the best deals on your favourite brands, 
            with 100% genuine products. Be it jewelry or makeup, you can count on ShopClues 
            for receiving only the most authentic products.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default ShopCluesFooter;
