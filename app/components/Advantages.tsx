import React from "react";

export default function Advantages() {
    const ventajas = [
        {
          img: "/images/banners/banner1.png",
          title: "30 Días de Devolución",
          text: "Si algo no te gusta, te compensamos.",
        },
        {
          img: "/images/banners/banner2.png",
          title: "100% Pago Seguro",
          text: "Tu seguridad es nuestra misión.",
        },
        {
          img: "/images/banners/banner3.png",
          title: "Atención 24/7",
          text: "Siempre estamos disponibles para ti.",
        }
    ]
    return (
        <section className="bg-gradient-to-r from-red-600 via-red-700 to-red-800 py-16 w-full">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-4xl md:text-5xl font-extrabold text-center text-white mb-12 tracking-tight">
                    ¿Por qué comprar en Neutrino-Ultra?
                </h2>

                <div className="flex flex-col md:flex-row items-stretch justify-center gap-8">
                {/* Tarjeta */}
                {ventajas.map((item, i) => (
                    <div key={i} className="bg-white rounded-2xl p-8 flex flex-col items-center text-center shadow-lg hover:scale-105 transition-transform duration-300 w-full md:w-1/3  justify-between">
                        {/* Imagen circular */}
                        <div className="w-28 h-28 flex items-center justify-center bg-white rounded-full drop-shadow-md border-4 border-red-500">
                            <img
                            src={item.img}
                            alt={item.title}
                            className="w-24 h-24 object-contain"
                            />
                        </div>

                        {/* Texto */}
                        <div>
                            <h3 className="text-xl font-bold mb-2 text-red-700">
                            {item.title}
                            </h3>
                            <p className="text-gray-600 text-sm sm:text-base">{item.text}</p>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </section>
    )
}
