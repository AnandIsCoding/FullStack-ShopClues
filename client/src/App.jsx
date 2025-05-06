import React from 'react'
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

function App() {
  const disableContextMenu = (event) => {
    event.preventDefault();  // Disable the right-click menu
  };
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
      <Routes>
        <Route path='/' element={<Home/>} />
        {/* <Route path='/:category' element={<SpecificCategory/>} />
        <Route path="/product/:id" element={<ProductPage/>} /> */}
        <Route path='/cart' element={<Cart/>} />
        <Route path='/wishlist' element={<Wishlist/>} />
        {/* <Route path='/profile' element={<Profile/>} />
        <Route path='/orders' element={ <Orders/> } /> */}
        <Route path="/product/:id" element={<ProductPage/>} />
      </Routes>

{/* Footerfor all pages */}
<MobileOptions/>
      <Footer/> 
      </Suspense>
           

    </div>

  )
}

export default App
