"use client";

import { useEffect, useState } from "react";

export default function SearchClient({ query }: { query: string }) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });

      const result = await res.json();
      setData(result);
    };

    fetchData();
  }, [query]);

  if (!data) return <p className="text-white p-6">Cargando...</p>;

  return (
    <main className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bold mb-4">{data.title || query}</h1>

      {data.image && (
        <img
          src={data.image}
          alt={data.title}
          className="w-full max-w-md rounded-xl mb-4"
        />
      )}

      <p className="text-gray-300">{data.extract}</p>
    </main>
  );
}