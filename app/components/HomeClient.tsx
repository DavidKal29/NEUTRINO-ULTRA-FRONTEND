import React from 'react'
import Header from './Header';
import Footer from './Footer';
import { useEffect, useState } from "react";
import {Product} from '../types/product'
import {User} from '../types/user'
import Products from './Products';
import MenuCategories from './MenuCategories';
import Advantages from './Advantages';
import ProductsSwiper from './ProductsSwiper';
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

export default function HomeClient() {

    type RequiredProduct = Required<Product>

    const [products,setProducts] = useState<RequiredProduct[]>([])

    const [popularProducts,setPopularProducts] = useState<RequiredProduct[]>([])

    const searchParams = useSearchParams()

    const categories = ['inicio','moviles','tablets','portatiles','ordenadores']
    
    const initialCategoryFromQuery = searchParams.get('category') || 'inicio'

    const initialCategory = categories.includes(initialCategoryFromQuery) ? initialCategoryFromQuery : 'inicio'

    const [category, setCategory] = useState(initialCategory)

    
    const [user,setUser] = useState<User| null>(null)

    const router = useRouter()

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

    const getProfile = () => {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/profile`, {
        method: 'GET',
        credentials: 'include'
      })
        .then(res => res.json())
        .then(data => {
          if (data.success){
            console.log(data.user);
            
            setUser(data.user)
          }
        })
        .catch(() => toast.error('Error al enviar los datos'));
    };


    useEffect(()=>{
      document.title = 'Home'
    })


    useEffect(()=>{
      getMostPopularProducts()
      getProfile()
    },[])

    useEffect(()=>{
      getProducts(category)

      //Borrar los parámetros
      const params = new URLSearchParams(searchParams.toString())
      params.delete("category")
      router.replace(`/?${params.toString()}`)
    
    },[category])
    return (
        <div className="flex flex-col justify-start items-center min-h-screen bg-gray-200 relative overflow-hidden">
            <Header router={router} user={user} setUser={setUser} getProfile={getProfile} />

            <MenuCategories categories={categories} category={category} changeCategory={changeCategory} getProducts={getProducts}/>

            {category === 'inicio' ? (
            <>
                <ProductsSwiper products={products} sectionName="NUEVOS PRODUCTOS" nuevo={true}></ProductsSwiper>
                <Advantages/>
                <ProductsSwiper products={popularProducts} sectionName="MÁS VENDIDOS" nuevo={false}></ProductsSwiper>
            
            </>) : 
            
            
            (<><Products products={products} category={category}></Products></>)
            
            }

            <Footer router={router} user={user} setUser={setUser} getProfile={getProfile}/>
            
        </div>

    )
}
