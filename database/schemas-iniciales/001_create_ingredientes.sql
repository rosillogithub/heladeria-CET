-- TABLA INGREDIENTES

create table ingredientes (
  id bigint generated always as identity primary key,
  nombre text not null,
  precio numeric(10,2) not null,
  calorias integer not null,
  inventario integer not null,
  tipo text,
  es_vegetariano boolean default false,
  es_sano boolean default false
);