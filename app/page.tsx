"use client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import {Product} from './types/product'
import NewProducts from "./components/NewProducts";

export default function Home() {

    type RequiredProduct = Required<Product>

    const [products,setProducts] = useState<RequiredProduct[]>([])

    const getNewProducts = ()=>{
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/getNewProducts`)
      .then(res=>res.json())
      .then(data=>{
        if (data.products) {
          setProducts(data.products)
        }else{
          alert(data.error)
        }
      })
    }


    useEffect(()=>{
      getNewProducts()
    },[])

    return (
      <div className="flex flex-col justify-start items-center min-h-screen bg-gray-200 relative overflow-hidden">
        <Header />

        <NewProducts products={products}></NewProducts>
        
          

        <Footer></Footer>
        
      </div>


      

    );
}

