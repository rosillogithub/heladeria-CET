
-- TABLA PRODUCTOS

create table productos (
  id bigint generated always as identity primary key,
  nombre text not null,
  precio_publico numeric(10,2) not null,
  costo numeric(10,2) not null
);