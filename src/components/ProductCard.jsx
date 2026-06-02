function ProductCard({ producto, user }) {
  return (
    <div className="bg-white border-2 border-black shadow-xl rounded-xl p-6">
      <h2 className="text-2xl font-bold text-black">
        {producto.nombre}
      </h2>

      <p className="text-black mt-2">
        Precio: ${producto.precio_publico}
      </p>

      <div className="mt-3">
        <p className="font-semibold text-black">
          Ingredientes:
        </p>

        <ul className="list-disc list-inside text-black">
          {producto.ingredientes.map((ingrediente, index) => (
            <li key={index}>
              {ingrediente}
            </li>
          ))}
        </ul>
      </div>

      {user && (
        <p className="text-black mt-3">
          Calorías: {producto.calorias}
        </p>
      )}

      {(user?.rol === 'empleado' ||
        user?.rol === 'admin') && (
        <p className="text-black">
          Costo: ${producto.costo}
        </p>
      )}

      {user?.rol === 'admin' && (
        <p className="text-black">
          Rentabilidad: ${producto.rentabilidad}
        </p>
      )}
    </div>
  )
}

export default ProductCard