export default function SearchPage({ params }: any) {
  const query = params.query;

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">
        Resultados para: {query}
      </h1>

      <div className="space-y-4">
        <div className="p-5 rounded-xl bg-gray-900">
          <h2 className="text-xl font-semibold mb-2">Resumen</h2>
          <p className="text-gray-400">
            Aquí aparecerá la historia generada dinámicamente sobre {query}.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-gray-900">
          <h2 className="text-xl font-semibold mb-2">Eventos clave</h2>
          <p className="text-gray-400">
            En esta sección se mostrarán los eventos más importantes relacionados con {query}.
          </p>
        </div>
      </div>
    </main>
  );
}