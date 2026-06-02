function VentaCard({
  producto,
  onVender
}) {
  return (
    <div className="bg-white border-2 border-black p-6 rounded-xl shadow-xl">
      <h2 className="text-2xl font-bold text-black">
        {producto.nombre}
      </h2>

      <p className="mt-2 text-black">
        Precio: ${producto.precio_publico}
      </p>

      <button
        onClick={() => onVender(producto)}
        className="bg-pink-500 text-white px-4 py-2 rounded mt-4"
      >
        Vender
      </button>
    </div>
  )
}

export default VentaCard