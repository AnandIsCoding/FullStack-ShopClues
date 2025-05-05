import { useEffect, useState } from 'react';
import React from 'react';

const slides = [
  { image: 'https://cdn.shopclues.com/images/banners/2025/April/21/digimate-web-banner-21-april.jpg' },
  { image: 'https://cdn.shopclues.com/images/banners/2025/April/23/intell-web-banner-23April25.png' },
  { image: 'https://cdn.shopclues.com/images/banners/2025/march/05/Feature-Phone-web-05-march-kaif.jpg' },
  { image: 'https://cdn.shopclues.com/images/banners/2025/Jan/20/Maharaja-sale-web-20Jan.jpg' }
];

export default function Slider() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(prev => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[200px] sm:h-[250px] md:full lg:h-[350px] xl:h-[400px] overflow-hidden rounded cursor-pointer">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-700 ${index === current ? 'opacity-100' : 'opacity-0'}`}
          style={{ backgroundImage: `url(${slide.image})` }}
        />
      ))}
    </div>
  );
}
