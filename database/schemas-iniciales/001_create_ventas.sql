-- TABLA VENTAS

create table ventas (
  id bigint generated always as identity primary key,
  producto_id bigint references productos(id),
  cantidad integer not null,
  total numeric(10,2) not null,
  fecha timestamp default now()
);
