"use client";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import React, { useEffect, useState } from "react";
import { Product } from "@/app/types/product";
import { CartItem } from "@/app/types/cartItem";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProductView() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [user,setUser] = useState<User| null>(null)
  const [quantity,setQuantity] = useState<number | 1>(1)

  const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    const value = parseInt(e.target.value)

    setQuantity(value)
  }

  
  const getProduct = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/getProduct/${id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.product) {
          setProduct(data.product);
        } else {
          router.push("/*");
        }
      });
  };

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

  const addCart = ()=>{
    const storedCart = localStorage.getItem('cart')

    if (quantity<1) {
      toast.error('La cantidad mínima es de un producto')
      return
    }

    if (quantity>product.stock) {
      toast.error('Esa cantidad supera el stock total del producto, reducela inmediatamente')
      return
    }

    const cart:CartItem[] = storedCart ? JSON.parse(storedCart) : []

    const index = cart.findIndex(p=>p._id === product._id)

    if (index != -1) {
      if (cart[index].quantity >= product.stock) {
        toast.error('Esa cantidad supera el stock total del producto, reducela inmediatamente')
        return
      }
      cart[index].quantity += quantity
      cart[index].totalPrice = (cart[index].quantity * product.price)
    }else{
      cart.push({...product,quantity:quantity,totalPrice:quantity * product.price})
    }

    localStorage.setItem('cart',JSON.stringify(cart))

    //Para disparar evento en localstorage y el contador del carrito actualize reactivamente
    window.dispatchEvent(new Event('storage'));

    toast.success('Añadido al carrito')

    router.push('/')

  }

  useEffect(() => {
    getProduct();
    getProfile()
  }, []);

  useEffect(() => {
    document.title = "Product";
  });

  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-gray-100 relative overflow-hidden">
      <Header router={router} user={user} setUser={setUser} getProfile={getProfile} />

      {/* Vista del producto */}
      {product && (
        <div className="flex flex-col lg:flex-row justify-center items-center bg-white rounded-3xl shadow-[0_8px_40px_-10px_rgba(0,0,0,0.15)] max-w-6xl w-[90%] mt-12 mb-20 p-5 sm:p-8 lg:p-10">

          {/* Imagen */}
          <div className="flex justify-center items-center w-full lg:w-1/2 p-3 sm:p-6">
            <img
              src={`/images/products/${product.image}`}
              alt={product.name}
              className="object-contain w-full max-h-[320px] sm:max-h-[400px] lg:max-h-[450px] rounded-xl drop-shadow-xl transition-transform duration-500 hover:scale-105"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col justify-start lg:justify-center items-start w-full lg:w-1/2 px-2 sm:px-6 mt-6 lg:mt-0">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-900 mb-3">
              {product.name}
            </h2>

            <div className="flex items-center mb-3 flex-wrap gap-3">
              <span className="text-[26px] sm:text-[28px] font-bold text-red-600">
                {product.price.toFixed(2)}€
              </span>
              {product?.oldPrice && <span className="text-gray-400 line-through text-sm">{product?.oldPrice.toFixed(2)}€</span>}

              {product?.stock > 0 ? 
              (<>
                <span className="text-sm sm:text-base text-green-600 font-semibold">
                  EN STOCK
                </span>
              </>) 
              
              : 
              
              (<>
                <span className="text-sm sm:text-base text-red-600 font-semibold">
                  SIN STOCK
                </span>
              </>)}

              {product?.active === 'off' && (<>
                <span className="text-sm sm:text-base text-red-600 font-semibold">
                  INACTIVO
                </span>
              </>)}
              
            </div>

            <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Cantidad + Botón */}
            <div className="flex items-center space-x-3 sm:space-x-4 w-full sm:w-auto">
              {(user?.rol === 'client' || !user) &&  (<>
                <input
                  type="number"
                  min="1"
                  onChange={onChange}
                  value={quantity}
                  className="border border-gray-300 rounded-lg w-16 sm:w-20 text-center py-1.5 text-gray-800 focus:outline-none focus:ring-2 focus:ring-red-600"
                />
                {(product?.stock > 0 && product?.active === 'on') ? 
                
                (<>
                  <button onClick={()=>{addCart()}} className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    AÑADIR AL CARRITO
                  </button>
                </>) 
                
                : 
                
                (<>
                  <button className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                    NO PUEDES AÑADIR NADA
                  </button>
                </>)}
                
                
              </>)}

              {user?.rol.includes('admin') && (<>
                <a href={`/editProduct/${product._id}`} className="cursor-pointer bg-red-600 hover:bg-red-700 text-white font-semibold px-5 sm:px-6 py-2 sm:py-2.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-300">
                  EDITAR PRODUCTO
                </a>
              </>)}
            </div>

            <div className="flex gap-4 justify-center items-center">
                {/* Categoría */}
                <p className="text-xs sm:text-sm text-gray-400 mt-6">
                  CATEGORÍA:{" "}
                <span className="font-semibold text-gray-500">{product.category}</span>
                </p>

                {/* Marca */}
                <p className="text-xs sm:text-sm text-gray-400 mt-6">
                  MARCA:{" "}
                <span className="font-semibold text-gray-500">{product.brand.toLowerCase()}</span>
                </p>
            </div>
          
          </div>
        </div>
      )}

      <Footer router={router} user={user} setUser={setUser} getProfile={getProfile} />
    </div>
  );
}