import React from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Product } from "../types/product";

interface ProductsProps {
  products: Product[],
  sectionName:string,
  nuevo:boolean

}

export default function ProductsSwiper({products,sectionName,nuevo}:ProductsProps) {
    
  return (
    <section className="w-full max-w-7xl px-4 sm:px-6 mt-16 relative z-10 my-12">
          <h2 className="text-[28px] sm:text-3xl md:text-5xl font-extrabold mb-10 text-left bg-gradient-to-r from-black via-red-600 to-red-900 bg-clip-text text-transparent tracking-tight">
            {sectionName}
          </h2>

          <Swiper modules={[Autoplay]} autoplay={{ delay: 1000, disableOnInteraction: false }} loop={true} spaceBetween={20} slidesPerView={1} breakpoints={{ 640: { slidesPerView: 1, spaceBetween: 25 }, 768: { slidesPerView: 2, spaceBetween: 30 }, 1024: { slidesPerView: 4, spaceBetween: 35 } }} className="pb-16">
            {products.map((product:Product, index:number) => (
              <SwiperSlide key={index}>
                <div className="group relative flex flex-col justify-between items-center text-center rounded-3xl shadow-[0_8px_40px_-10px_rgba(0,0,0,0.15)] bg-white overflow-hidden h-[450px] sm:h-[480px] lg:h-[500px] mx-6 sm:mx-0">
                  
                  {/* Etiqueta NUEVO */}
                  {nuevo && (<>
                    <div className="absolute top-3 right-3 bg-red-600 text-white text-[10px] sm:text-[11px] font-bold px-3 py-1 rounded-full z-50">NUEVO</div>
                  </>)}

                  {/* Imagen */}
                  <div className="flex justify-center items-center w-full p-4 sm:p-6 relative h-[55%]">
                    <img src={`/images/products/${product?.image}`} alt={product?.name} className="object-contain max-h-full w-auto drop-shadow-xl transform group-hover:scale-105 transition-all duration-500" />
                  </div>

                  {/* Info */}
                  <div className="p-4 sm:p-5 flex flex-col justify-end items-center h-[45%] w-full bg-gradient-to-t from-white via-gray-50 to-transparent">
                    <p className="text-gray-500 text-xs sm:text-sm font-semibold mb-1 uppercase tracking-wider">{product?.brand}</p>
                    <p className="text-base sm:text-lg font-bold w-full text-gray-900">{product?.name}</p>

                    <div className="mt-2 sm:mt-3 flex items-center justify-center space-x-2">
                      <span className="text-red-600 font-extrabold text-lg sm:text-xl">{product?.price.toFixed(2)}€</span>
                      {product?.oldPrice && <span className="text-gray-400 line-through text-xs sm:text-sm">{product?.oldPrice.toFixed(2)}€</span>}
                    </div>

                    {/* Boton */}
                    <a href={`/product/${product._id}`} className="cursor-pointer mt-4 sm:mt-5 bg-gradient-to-r from-black via-red-700 to-black text-white text-xs sm:text-sm font-semibold py-2 px-5 sm:py-2.5 sm:px-6 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">Ver más</a>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
  )
}
