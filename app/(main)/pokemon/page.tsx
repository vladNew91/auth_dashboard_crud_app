export default async function Pokemon() {
  const products = Array.from({ length: 20 });
  const error = null;

  if (!products) return null;
  if (error) console.error(error);

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="grid auto-rows-min gap-4 md:grid-cols-5">
        {products.map((_, i) => (
          <div key={i} className="bg-muted/50 aspect-square rounded-xl" />
        ))}
      </div>
    </div>
  );
}
