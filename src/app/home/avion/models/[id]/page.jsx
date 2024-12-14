export default async function ModelPage({ params }) {
  const { id } = await params;
  return (
    <div>
      <h1>MODEL {id}</h1>
    </div>
  );
}
