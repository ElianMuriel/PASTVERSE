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
    const paragraphs = data.extract
        ? data.extract.split(". ")
        : [];

    return (
        <main className="min-h-screen bg-black text-white p-6">
            <p className="text-sm text-blue-400 mb-2">
                Explorando historia
            </p>
            <h1 className="text-3xl font-bold mb-4">{data.title || query}</h1>

            {data.image && (
                <img
                    src={data.image}
                    alt={data.title}
                    className="w-full max-w-md h-60 object-cover rounded-2xl mb-6 shadow-lg"
                />
            )}

            <div className="space-y-4">
                {paragraphs.map((text: string, index: number) => (
                    <div
                        key={index}
                        className="p-4 bg-gray-900 rounded-xl border border-gray-800"
                    >
                        <p className="text-gray-300">{text}.</p>
                    </div>
                ))}
            </div>
        </main>
    );
}