"use client";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect, useState } from "react";
import { User } from '../types/user';
import CartItem from '../types/cartItem'
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function Home() {

  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  
  const [cart,setCart] = useState<CartItem[] | []>([])

  const [totalPrice,setTotalPrice] = useState<number | 0>(0)
  
  const getCartItems = ()=>{
    const setedCart = localStorage.getItem('cart')
    
    const cartProducts:CartItem[] = setedCart ? JSON.parse(setedCart) : []

    if (cartProducts.length === 0) {
        router.push('/')
    }
    
    setCart(cartProducts)

    let counter = 0

    cartProducts.forEach(product => {
        counter += product.totalPrice
    });

    setTotalPrice(counter)
  }

  const [metodoPago,setMetodoPago] = useState<string | 'PayPal'>('PayPal')

  const [form,setForm] = useState({
    name:'',
    lastname:'',
    dni:'',
    phone:'',
    address:''
  })

  const handleChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{

    e.preventDefault()

    const body = {...form, totalPrice:totalPrice, cart:cart}

    localStorage.clear()



    fetch(`${process.env.NEXT_PUBLIC_API_URL}/orders/createOrder`, {
      method: 'POST',
      credentials: 'include',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(body)
    })
    .then(res=>res.json())
    .then(data=>{
      console.log(data);
      
      if (data.success) {
        toast.success(data.success)
        router.push('/')
      }else{
        if (data.message && Array.isArray(data.message)) {
          toast.error(data.message[0])
        }else{
          toast.error(data.error)
        }
      }
    }).catch(error=>{toast.error('Error al enviar los datos');console.log(error)})
  }

  

  const getProfile = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/profile`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          console.log(data.user);
          setUser(data.user);
          form.name = data.user.name || '',
          form.lastname = data.user.lastname || '',
          form.dni = data.user.dni || '',
          form.phone = data.user.phone || '',
          form.address = data.user.address || ''
        }else{
          toast.error(data.error)
          router.push('/')
        }
      })
      .catch(() => toast.error('Error al enviar los datos'));
  };

  useEffect(() => {
    document.title = 'Home';
  }, []);

  useEffect(() => {
    getProfile();
    getCartItems()
  }, []);

  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-white relative overflow-hidden">
      <Header router={router} user={user} setUser={setUser} getProfile={getProfile} />

      <div className="bg-gray-200 p-4 md:p-8 lg:p-12 flex flex-col justify-center items-start gap-2 drop-shadow-lg w-full">
        <h2 className="text-[25px] sm:text-3xl md:text-5xl font-extrabold text-left bg-gradient-to-r from-black via-red-600 to-red-900 bg-clip-text text-transparent">
          FINALIZAR MI PEDIDO
        </h2>     
      </div>

      <form onSubmit={handleSubmit} className="flex justify-center items-center flex-col md:flex-row md:items-stretch w-full p-4 gap-12 md:px-8 md:py-8 h-full">
        {/* Formulario datos de envio */}
        <div className="w-full flex flex-col justify-center items-start gap-4 h-full max-w-[600px]">
            <p className="font-bold text-[25px]">DATOS DE ENVÍO</p>
            
            <input
              type="text"
              className="bg-white rounded border border-gray-300 p-3 drop-shadow-lg w-full"
              placeholder="Nombre"
              name="name"
              value={form.name}
              onChange={handleChange}
            />
            <input
              type="text"
              className="bg-white rounded border border-gray-300 p-3 drop-shadow-lg w-full"
              placeholder="Apellidos"
              name="lastname"
              value={form.lastname}
              onChange={handleChange}
            />
            
            <input
              type="text"
              className="bg-white rounded border border-gray-300 p-3 drop-shadow-lg w-full"
              placeholder="Domicilio"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
            <input
              type="text"
              className="bg-white rounded border border-gray-300 p-3 drop-shadow-lg w-full"
              placeholder="Teléfono"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              className="bg-white rounded border border-gray-300 p-3 drop-shadow-lg w-full md:col-span-2 lg:col-span-1"
              placeholder="DNI"
              name="dni"
              value={form.dni}
              onChange={handleChange}
            />

          </div>

        {/* Sumario del pedido */}
        <div className="bg-white text-black flex flex-col justify-center items-center rounded w-full border-gray-300 border-2 drop-shadow-lg p-4 gap-8 h-full max-w-[450px]">
          <p className="font-bold text-left text-[25px]">SUMARIO DEL PEDIDO</p>

          <div className="flex flex-col justify-center items-center w-full gap-4 ">
              <div className="flex flex-row justify-between w-full items-start">
                  <p className="font-bold">PRODUCTOS</p>
                  <p className="font-bold">TOTAL</p>
              </div>

              <div className="flex flex-col justify-center items-center w-full gap-4 max-h-[100px] overflow-hidden overflow-y-auto">
                {cart.map((product:CartItem,index:number)=>(
                    <div key={index} className="flex flex-row justify-between w-full items-start gap-12">
                    <p className="text-sm">x{product.quantity}  {product.name}</p>
                    <p className="text-sm">{product.totalPrice.toFixed(2)}€</p>
                    </div>
                ))}
              </div>

              <div className="flex flex-row justify-between w-full items-start gap-12">
                  <p className="text-sm">GASTOS ENVÍO</p>
                  <p className="font-bold text-xs">GRATIS</p>
              </div>

              <div className="flex flex-row justify-between w-full items-start gap-12">
                  <p className="font-bold">TOTAL</p>
                  <p className="font-bold text-red-600">{totalPrice.toFixed(2)}€</p>
              </div>

          </div>

          <div className="flex flex-col justify-center items-start w-full gap-4 ">
              <p className="font-bold">MÉTODO DE PAGO</p>
              {/* PayPal */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="radio"
                    name="metodoPago"
                    value="PayPal"
                    checked={metodoPago === 'PayPal'}
                    onChange={(e)=>{setMetodoPago(e.target.value)}}
                    className="cursor-pointer"
                    required
                />
                PayPal
              </label>

              {/* Tarjeta de crédito */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="radio"
                    name="metodoPago"
                    value="Tarjeta de crédito"
                    checked={metodoPago === 'Tarjeta de crédito'}
                    onChange={(e)=>{setMetodoPago(e.target.value)}}
                    className="cursor-pointer"
                    required
                />
                Tarjeta de crédito
              </label>

              {/* Transferencia bancaria */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="radio"
                    name="metodoPago"
                    value="Transferencia bancaria"
                    checked={metodoPago === 'Transferencia bancaria'}
                    onChange={(e)=>{setMetodoPago(e.target.value)}}
                    className="cursor-pointer"
                    required
                />
                Transferencia bancaria
              </label>
              
          </div>
                
            
          <button type="submit" className="w-full bg-[#C40C0C] text-white rounded py-2 font-bold text-[16px] text-center cursor-pointer">
              Finalizar compra
          </button>
            
        </div>
      </form>

      
      <Footer router={router} user={user} setUser={setUser} getProfile={getProfile} />
    </div>
  );
}
