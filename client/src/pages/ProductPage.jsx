import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  FaHeart,
  FaTruck,
  FaMoneyBillAlt,
  FaUndoAlt,
  FaShareAlt,
} from "react-icons/fa";
import ShareDialog from "../components/ShareDialog";
import ProductCarousel from "../components/ProductCarousel";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUser, setUserCart } from "../redux/slices/user.slice";
import { setShowSignup } from "../redux/slices/modal.slice";

function ProductPage() {
  
  const {id} = useParams()
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showShareDialog, setShowshareDialog] = useState(false);
  const [showMoreoffer, setShowmoreoffer] = useState(false);
  // import baseUrl from .env
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const cartItems = useSelector(state => state.user.cart)
  const user = useSelector((state) => state.user.user);

  // product that will be shown in products page as suggestion, related products
  const [relatedProducts, setRelatedProducts] = useState([]);
  const dispatch = useDispatch()

  


  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${BASE_URL}/product/${id}`);
        const data = await res.json();
        setProduct(data.product);

        // Fetch all products
        const allRes = await fetch(`${BASE_URL}/product/all`);
        const allData = await allRes.json();
  
        // filter products where category name is same as product fetched by Id and filtered products must not include that product id
        const sameCategory = allData.products.filter(
          (p) =>
            p.category.name === data.product.category.name &&
            p._id !== data.product._id
        );
  
        setRelatedProducts(sameCategory);
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();

  }, [id, BASE_URL]);

  const handleAddTocart = async (productId) => {
    if(!user){
      toast.error('Please Register with us !!')
      dispatch(setShowSignup(true));
      return ;
    }
    const loadingToast = toast.loading("Processing cart ...");
    try {
      const res = await axios.post(
        `${BASE_URL}/cart/addorremovecart`,
        { productId },
        { withCredentials: true }
      );
      // Fetch the updated cart
    const resp = await axios.get(`${BASE_URL}/cart/all`, {
      withCredentials: true,
    });

    dispatch(setUserCart(resp?.data?.cart?.items));
  
      if (res.data.success) {

        toast.success(res.data.message || "Product added to cart!");
      } else {
        toast.error(res.data.error || "Add to cart failed.");
      }
    } catch (error) {
      console.error("AddToCart error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Add to cart failed.");
    } finally {
      toast.dismiss(loadingToast);
    }
  };
  

  // if loading show a loading text
  if (loading) {
    return (
      <div className="text-center flex items-center justify-center py-34 bg-white font-semibold text-lg">
        <img src='/Fidget-spinner.gif' alt="loader" className="w-24 h-24" />
      </div>
    );
  }

  // fallback if no product found than show a text PRoduct Not Found
  if (!product) {
    return (
      <div className="text-center min-h-[70vh] py-10 font-semibold text-lg">
        Product not found
      </div>
    );
  }

  

  return (
    <div className="max-w-7xl mx-0 md:mx-auto p-4 md:p-8 overflow-x-hidden min-h-[70vh]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Side - Images */}
        <div className="grid grid-cols-2 gap-2">
          {[...Array(5)].map((_, idx) => (
            <div key={idx} className=" p-2 rounded-md bg-white">
              <img
                src={product?.thumbnail}
                alt={product?.title}
                className="w-full h-48 object-contain"
              />
            </div>
          ))}
        </div>

        {/* Right Side - Details */}
        <div className="flex flex-col gap-4 overflow-x-hidden">
          {/* Title + Heart */}
          <div className="flex items-start justify-between">
            <h1 className="text-2xl font-bold">{product?.title}</h1>
            <button
              onClick={(event) => handleWishlist(event, product)}
              className="p-2 rounded-full  cursor-pointer"
            >
                            <FaHeart size={20} className="text-[#24A3B5]" />
              {/* {wishlistItems.some((item) => item._id === product._id) ? (
                <FaHeart size={20} className="text-red-600" />
              ) : (
                <FaHeart size={20} className="text-gray-500" />
              )} */}
            </button>
          </div>

          <div className="text-gray-600">{product?.category?.name}</div>

          {/* Price */}
          <div className="flex items-center gap-3">
            <div className="text-2xl font-bold text-black">
              ₹{product?.price}
            </div>
            <div className="text-gray-400 line-through">
              ₹{product?.price+200}
            </div>
            <div className="text-green-600 font-semibold text-sm">10% off</div>
          </div>

          {/* Offers */}
          <div className="bg-gray-100 p-4 rounded-md text-sm text-gray-700 space-y-2">
            <p>🎉 10% off on ICICI Bank Cards</p>
            <p>🎉 15% off on HSBC Premier Cards</p>
            <p>🎉 Flat 12% off on ₹3999 | Use Code: SUMMER12</p>
            <p>🎉 25% off for New Customers | Use Code: NEW25</p>
            <p
              onClick={() => setShowmoreoffer((prev) => !prev)}
              className="text-[#24A3B5] font-semibold cursor-pointer"
            >
              {showMoreoffer ? "See less" : "See 3 More Offers"}
            </p>
            <p className={`${showMoreoffer ? "block" : "hidden"}`}>
              🎉 10% off on Hii Bank Cards
            </p>
            <p className={`${showMoreoffer ? "block" : "hidden"}`}>
              🎉 15% off on Byee Premier Cards
            </p>
            <p className={`${showMoreoffer ? "block" : "hidden"}`}>
              🎉 Flat 19% off on ₹3999 | Use Code: SUMMER12
            </p>
          </div>

        

          {/* Shipping Details */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Ship To</h3>
              <label
                className="text-[#24A3B5] text-sm font-semibold cursor-pointer"
                htmlFor="pincode"
              >
                Change Pincode
              </label>
            </div>
            <input
              type="text"
              placeholder="Delhi, 110001"
              className="border rounded-md p-2  text-gray-700"
              id="pincode"
            />

            <div className="flex items-center gap-3 text-sm mt-2">
              <FaTruck />
              <p>
                Delivery by{" "}
                <span className="font-semibold text-black">
                  {new Date(
                    Date.now() + 5 * 24 * 60 * 60 * 1000
                  ).toDateString()}
                </span>
              </p>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <FaMoneyBillAlt />
              <p>
                Cash on Delivery |{" "}
                <span className="text-green-600 font-semibold">Available</span>
              </p>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <FaUndoAlt />
              <p>7 Days Return and Replacement available</p>
            </div>
          </div>

          {/* Share + Buy + Add to Bag */}
          <div className="flex gap-2 mt-6">
            <button
              onClick={() => setShowshareDialog((prev) => !prev)}
              className="p-3 border rounded-md cursor-pointer"
            >
              <FaShareAlt size={20} />
            </button>
            <button
              onClick={(event) => handleWishlist(event, product)}
              className="p-3 border cursor-pointer rounded-md"
            >
            <FaHeart size={20} color="#24A3B5" />
              {/* {wishlistItems.some((item) => item._id === product?._id) ? (
                <FaHeart size={20} color="red" />
              ) : (
                <FaHeart size={20} />
              )} */}
            </button>
            {/* buy now button with custom toast  */}
            <button
              onClick={() =>
                toast.custom((t) => (
                  <div
                    className={`${
                      t.visible ? "animate-enter" : "animate-leave"
                    } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
                  >
                    <div className="flex-1 w-0 p-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 pt-0.5">
                          <img
                            className="h-10 w-10 rounded-full"
                            src="https://www.tatacliq.com/images/icons/icon-144x144.png"
                            alt="App_Logo"
                          />
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm font-medium text-gray-900">
                            Shop Clues
                          </p>
                          <p className="mt-1 text-sm text-gray-500 capitalize">
                            Sorry !! We are not accepting new Order Right Now
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex border-l border-gray-200">
                      <button
                        onClick={() => toast.dismiss(t.id)}
                        className="w-full border border-transparent cursor-pointer bg-zinc-50 rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ))
              }
              className="flex-1 cursor-pointer bg-[#24A3B5] hover:scale-95 duration-300 text-white py-3 rounded-md font-semibold"
            >
              Buy Now
            </button>
            <button
              onClick={() => handleAddTocart(product._id)} // pass only product._id
              className="flex-1 border cursor-pointer border-[#24A3B5] text-[#24A3B5] hover:scale-95 duration-300 py-3 rounded-md font-semibold"
            >
          
             {cartItems?.some((item) => item?.productId?._id === product?._id)
                ? "Remove From Bag"
                : "Add To Bag"} 
            </button>
          </div>
        </div>
      </div>
      {showShareDialog && (
        <ShareDialog
          showShareDialog={showShareDialog}
          setShowshareDialog={setShowshareDialog}
        />
      )}


        {/* Related products mapping */}
      {relatedProducts.length > 0 && (
  <ProductCarousel
    name={`Related Products in ${product?.category?.name}`}
    products={relatedProducts}
  />
)}

    </div>
  );
}

export default ProductPage;