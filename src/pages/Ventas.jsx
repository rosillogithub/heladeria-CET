const venderProducto = async (producto) => {
  try {
    const { error } = await supabase.rpc('procesar_venta', {
      p_producto_id: producto.id,
      p_cantidad: 1
    })

    if (error) {
      console.error(error)
      alert(error.message)
      return
    }

    alert('Producto vendido 🍦')
  } catch (error) {
    console.error(error)
    alert('Error inesperado')
  }
}