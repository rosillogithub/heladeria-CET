alter table ingredientes enable row level security;
alter table productos enable row level security;
alter table ventas enable row level security;

create policy "public read ingredientes"
on ingredientes
for select
to anon
using (true);

create policy "public read productos"
on productos
for select
to anon
using (true);

create policy "public insert ventas"
on ventas
for insert
to anon
with check (true);

create policy "public read ventas"
on ventas
for select
to anon
using (true);