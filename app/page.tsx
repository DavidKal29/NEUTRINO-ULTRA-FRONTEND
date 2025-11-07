"use client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import {Product} from './types/product'
import Products from "./components/Products";
import MenuCategories from "./components/MenuCategories";
import Advantages from "./components/Advantages";
import ProductsSwiper from "./components/ProductsSwiper";
import { toast } from "sonner";

export default function Home() {

    type RequiredProduct = Required<Product>

    const [products,setProducts] = useState<RequiredProduct[]>([])

    const [popularProducts,setPopularProducts] = useState<RequiredProduct[]>([])

    const [category,setCategory] = useState('inicio')

    const categories = ['inicio','moviles','tablets','portatiles','ordenadores']

    const changeCategory = (c:string)=>{
      setCategory(c)
    }

    const getProducts = (c:string)=>{
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/${c === 'inicio' ? 'getNewProducts' : `getProducts/${c}`}`)
      .then(res=>res.json())
      .then(data=>{
        if (data.products) {
          setProducts(data.products)
        }else{
          toast.error(data.error)
        }
      })
    }

    const getMostPopularProducts = ()=>{
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/getMostPopularProducts`)
      .then(res=>res.json())
      .then(data=>{
        if (data.products) {
          setPopularProducts(data.products)
        }else{
          toast.error(data.error)
        }
      })
    }


    useEffect(()=>{
      document.title = 'Home'
    })


    useEffect(()=>{
      getProducts(category)
      getMostPopularProducts()
    },[])

    return (
      <div className="flex flex-col justify-start items-center min-h-screen bg-gray-200 relative overflow-hidden">
        <Header />

        <MenuCategories categories={categories} category={category} changeCategory={changeCategory} getProducts={getProducts}/>

        {category === 'inicio' ? (
          <>
            <ProductsSwiper products={products} sectionName="NUEVOS PRODUCTOS" nuevo={true}></ProductsSwiper>
            <Advantages/>
            <ProductsSwiper products={popularProducts} sectionName="MÁS VENDIDOS" nuevo={false}></ProductsSwiper>
          
          </>) : 
           
          
          (<><Products products={products} category={category}></Products></>)
        
        }

          <Footer/>
        
      </div>


      

    );
}

