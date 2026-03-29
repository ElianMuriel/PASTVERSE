"use client";

import { useEffect, useState } from "react";

export default function SearchClient({ query }: { query: string }) {
    const [content, setContent] = useState("Cargando...");

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query }),
            });

            if (!res.ok) {
                setContent("Error cargando contenido...");
                return;
            }

            const data = await res.json();
            setContent(data.content);
        };

        fetchData();
    }, [query]);

    return (
        <main className="min-h-screen bg-black text-white p-6">
            <h1 className="text-3xl font-bold mb-4">{query}</h1>

            <p className="text-gray-300 whitespace-pre-line">
                {content}
            </p>
        </main>
    );
}