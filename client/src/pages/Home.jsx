import React, { useEffect, useState } from "react";
import BannerSection from "../components/BannerSection";
import ProductCarousel from "../components/ProductCarousel";

function Home() {
  const [electronics, setElectronics] = useState([]);
  const [mensProduct, setMensProduct] = useState([]);
  const [womenProduct, setWomenProduct] = useState([])
  const [Grocery, setGrocery] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          "https://myshopclues.onrender.com/api/v1/product/all"
        );
        const data = await res.json();
        const allProducts = data?.products || [];

        // Filter by category name
        const electronicsProducts = allProducts.filter(
          (product) => product?.category?.name === "Electronics"
        );

        const MenProducts = allProducts.filter(
          (product) => product?.category?.name === "Men"
        );

        const filteredwomensProduct = allProducts.filter(
          (product) => product?.category?.name === "Women"
        );

        const groceryProducts = allProducts.filter((product) => product?.category?.name === 'Grocery');

        setElectronics(electronicsProducts);
        setMensProduct(MenProducts);
        setWomenProduct(filteredwomensProduct)
        setGrocery(groceryProducts)
      } catch (err) {
        console.error("Failed to fetch products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="pt-4">
      <BannerSection />
      <ProductCarousel name="Your Gadgets Store" products={electronics} />
      <ProductCarousel name="Explore Mens Styling" products={mensProduct} />
      <ProductCarousel name="Explore Beauty" products={womenProduct} />
      <ProductCarousel name="Groceries" products={Grocery} />
    </div>
  );
}

export default Home;
