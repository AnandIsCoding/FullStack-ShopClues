import React, { useEffect, useState } from 'react'
import BannerSection from '../components/BannerSection'
import ProductCarousel from '../components/ProductCarousel';

function Home() {
  const [electronics, setElectronics] = useState([]);
  const [clothing, setClothing] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("https://myshopclues.onrender.com/api/v1/product/all");
        const data = await res.json();
        const allProducts = data?.products || [];

        // Filter by category name
        const electronicsProducts = allProducts.filter(
          (product) => product?.category?.name === "Electronics"
        );

        const clothingProducts = allProducts.filter(
          (product) => product?.category?.name === "Men"
        );

        setElectronics(electronicsProducts);
        setClothing(clothingProducts);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  

  return (
    <div className='pt-4'>
      <BannerSection/>
      <ProductCarousel name="Your Gadgets Store" products={electronics} />
      <ProductCarousel name="Your Gadgets Store" products={electronics} />
      <ProductCarousel name="Your Gadgets Store" products={electronics} />
    </div>
  )
}

export default Home
