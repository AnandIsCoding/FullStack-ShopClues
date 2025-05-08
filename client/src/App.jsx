import React, { useEffect } from 'react'
import { Suspense } from 'react'
import ScrollToTop from '../src/components/ScrollToTop'
import Navbar from './components/Navbar';
import MobileOptions from './components/MobileOptions';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart'
import Wishlist from './pages/Wishlist'
import Footer from './components/Footer';
import ProductPage from '../src/pages/ProductPage'
import { useDispatch, useSelector } from 'react-redux';
import Signup from './MiniUi/Signup';
import axios from 'axios';
import { setUser, setUserCart } from './redux/slices/user.slice';
import ProfilePage from './pages/ProfilePage';
const BASE_URL = import.meta.env.VITE_BASE_URL


function App() {
 
  const isshowSignupPage = useSelector(state => state.modal.showSignupPage)
  const dispatch = useDispatch()
  // console.log(isshowSignupPage)
  const disableContextMenu = (event) => {
    event.preventDefault();  // Disable the right-click menu
   
  };

  
  const ProfileHandler = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/profile`, {
        withCredentials: true,
      });
      dispatch(setUser(res.data.user))
      // You can update user state or Redux here
    } catch (error) {
      console.error("Error in ProfileHandler:", error.response?.data || error.message);
    }
  };

  const GetCartHandler = async() =>{
    try {
      const res = await axios.get(`${BASE_URL}/cart/all`, {
        withCredentials: true,
      });
      console.log(res?.data?.cart?.items)
      dispatch(setUserCart(res?.data?.cart?.items))
    } catch (error) {
      console.error("Error in GetCartHandler :", error.response?.data || error.message); 
    }
  }


  
  useEffect(() => {
    ProfileHandler();
    GetCartHandler()
  }, []);
  
  
  return (
    <div className='select-none' onContextMenu={disableContextMenu} > 
    <ScrollToTop/> 
     <Suspense
      // Fallback loader while components are loading
        fallback={
          <div className="absolute top-0 left-0 bottom-0 right-0 bg-white flex justify-center items-center duration-[4s]">
            <img src='/Fidget-spinner.gif' alt="loader" className="w-24 h-24" />
          </div>
        }
      >
{/* fixed  Navbar Component for all pages*/}

<Navbar/>
      {/* all routes defined */}
      {
        isshowSignupPage && <Signup/>
      }
      <Routes>
        <Route path='/' element={<Home/>} />
        {/* <Route path='/:category' element={<SpecificCategory/>} />
        <Route path="/product/:id" element={<ProductPage/>} /> */}
        <Route path='/cart' element={<Cart/>} />
        <Route path='/wishlist' element={<Wishlist/>} />
        {/* <Route path='/profile' element={<Profile/>} />
        <Route path='/orders' element={ <Orders/> } /> */}
        <Route path="/product/:id" element={<ProductPage/>} />
        <Route path='/profile' element={<ProfilePage/>} />
      </Routes>

{/* Footerfor all pages */}
<MobileOptions/>
      <Footer/> 
      </Suspense>
           

    </div>

  )
}

export default App
