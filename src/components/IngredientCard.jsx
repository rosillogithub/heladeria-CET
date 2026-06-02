function IngredientCard({
  ingrediente,
  onEditar,
  onEliminar
}) {
  return (
    <div className="bg-white border-2 border-black shadow-xl rounded-xl p-6">
      <h2 className="text-2xl font-bold text-black">
        {ingrediente.nombre}
      </h2>

      <p className="text-black mt-2">
        Precio: ${ingrediente.precio}
      </p>

      <p className="text-black">
        Calorías: {ingrediente.calorias}
      </p>

      <p className="text-black">
        Inventario: {ingrediente.inventario}
      </p>

      <p className="text-black">
        Tipo: {ingrediente.tipo}
      </p>

      <p className="text-black">
        Sabor: {ingrediente.sabor || 'N/A'}
      </p>

      <p className="text-black">
        Vegetariano:{' '}
        {ingrediente.es_vegetariano
          ? 'Sí'
          : 'No'}
      </p>

      <p className="text-black">
        Saludable:{' '}
        {ingrediente.es_sano
          ? 'Sí'
          : 'No'}
      </p>

      <div className="flex gap-2 mt-4">
        <button
          onClick={() => onEditar(ingrediente)}
          className="bg-yellow-500 text-white px-4 py-2 rounded"
        >
          Editar
        </button>

        <button
          onClick={() => onEliminar(ingrediente.id)}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default IngredientCard