-- VISTA RENTABILIDAD

create view v_rentabilidad_producto as
select
  id as producto_id,
  nombre,
  precio_publico,
  costo,
  (precio_publico - costo) as rentabilidad
from productos;