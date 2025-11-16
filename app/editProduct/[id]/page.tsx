"use client";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { useEffect, useState } from "react";
import { User } from '../../types/user';
import { Product } from '../../types/product';
import { toast } from "sonner";
import { useParams, useRouter } from "next/navigation";

export default function EditProduct() {

  const [user, setUser] = useState<User | null>(null);
  const [product,setProduct] = useState<Product | null>(null);

  const categories = ['ordenadores','tablets','moviles','portatiles']
  const brands = ['SAMSUNG','APPLE','OPPO','XIAOMI','LENOVO','ALURIN','PCCOM','ASUS','HP','PC RACING','IBERICAVIP'] 
  
  const [form,setForm] = useState({
    name:'',
    category:'',
    price:'',
    stock:'',
    brand:'',
    description:''
  })
  
  const router = useRouter();
  const {id} = useParams()


  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>)=>{
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) =>{

    e.preventDefault()

    const body = {...form, _id:product?._id}

    localStorage.clear()

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/editProduct`, {
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
        router.push('/admin')
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
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/profile`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        
        if (data.success) {
          console.log(data.user);
          setUser(data.user);
        }else{
          toast.error(data.error)
          router.push('/')
          
        }
      })
      .catch(() => toast.error('Error al enviar los datos'));
  };

  const getProduct = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/products/getAllProductData/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        
        if (data.product) {
          setProduct(data.product);
          form.name = data.product?.name
          form.category = data.product?.category
          form.price = data.product?.price
          form.stock = data.product?.stock
          form.brand = data.product?.brand
          form.description = data.product?.description
        } else {
          router.push("/*");
        }
      });
  };

  useEffect(() => {
    document.title = 'Edit Product';
  }, []);

  useEffect(() => {
    getProfile();
    getProduct()
    
  }, []);

  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-white relative overflow-hidden">
        <Header router={router} user={user} setUser={setUser} getProfile={getProfile} />

        {/* Encabezado */}
        <div className="bg-gray-200 p-4 md:p-8 lg:p-12 flex flex-col justify-center items-start gap-2 drop-shadow-lg w-full">
            <h2 className="text-[25px] sm:text-3xl md:text-5xl font-extrabold text-left bg-gradient-to-r from-black via-red-600 to-red-900 bg-clip-text text-transparent">
            EDITAR PRODUCTO
            </h2>     
        </div>

        <div className="w-full flex justify-center items-center p-4 md:p-8 lg:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-[1200px]">

            {/* Formulario */}
            <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-start items-start gap-4 w-full bg-white"
            >

                {/* Nombre */}
                <input
                    type="text"
                    className="bg-white rounded border border-gray-300 p-3 drop-shadow-lg w-full"
                    placeholder="Nombre"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                />

                {/* Descripción */}
                <textarea
                    className="bg-white rounded border border-gray-300 p-3 drop-shadow-lg w-full resize-none h-32"
                    placeholder="Descripción"
                    name="description"
                    value={form.description}
                    onChange={handleChange}
                />

                {/* Precio */}
                <input
                    type="number"
                    className="bg-white rounded border border-gray-300 p-3 drop-shadow-lg w-full"
                    placeholder="Precio del producto"
                    name="price"
                    value={form.price}
                    onChange={handleChange}
                />

                {/* Stock */}
                <input
                    type="number"
                    className="bg-white rounded border border-gray-300 p-3 drop-shadow-lg w-full"
                    placeholder="Stock del producto"
                    name="stock"
                    value={form.stock}
                    onChange={handleChange}
                />

                {/* Categoría y Marca */}
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 w-full">
                    <div className="flex flex-col justify-center items-start w-full">
                        <label className="font-medium mb-1">Categoría</label>
                        <select
                            name="category"
                            value={form.category}
                            onChange={handleChange}
                            className="bg-white rounded border border-gray-300 p-3 drop-shadow w-full"
                        >
                        {categories.map((c, index) => (
                            <option key={index} value={c}>{c}</option>
                        ))}
                        </select>
                    </div>

                    <div className="flex flex-col justify-center items-start w-full">
                        <label className="font-medium mb-1">Marca</label>
                        <select
                            name="brand"
                            value={form.brand}
                            onChange={handleChange}
                            className="bg-white rounded border border-gray-300 p-3 drop-shadow.lg w-full"
                        >
                        {brands.map((b, index) => (
                            <option key={index} value={b}>{b}</option>
                        ))}
                        </select>
                    </div>
                </div>

                {/* Botón de enviar */}
                <button
                    type="submit"
                    className="mt-4 cursor-pointer bg-red-700 text-white font-semibold py-3 px-6 rounded w-full"
                >
                    Guardar Cambios
                </button>
            </form>

            {/* Imagen del producto */}
            <div className="flex justify-center items-center w-full">
                <div className="bg-gray-100 rounded drop-shadow-lg overflow-hidden w-full max-w-[500px] flex justify-center items-center">
                <img
                    src={`/images/products/${product?.image}`}
                    alt={form.name}
                    className="object-contain w-full h-full"
                />
                </div>
            </div>
            </div>
        </div>

        <Footer router={router} user={user} setUser={setUser} getProfile={getProfile} />
    </div>

  );
}
