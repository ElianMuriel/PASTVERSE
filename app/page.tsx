"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-4">PastVerse</h1>

      <p className="text-gray-400 text-center mb-8 max-w-md">
        Explora la historia como nunca antes. Descubre eventos, civilizaciones y personajes en un formato interactivo.
      </p>

      {/* 🔍 Buscador */}
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" && searchQuery.trim() !== "") {
            window.location.href = `/search/${encodeURIComponent(searchQuery)}`;
          }
        }}
        placeholder="Buscar historia..."
        className="p-3 rounded bg-gray-800 w-full max-w-sm mb-6 outline-none"
      />

      <div className="space-y-4 w-full max-w-sm">
        <Link href="/feed">
          <div className="p-4 bg-gray-900 rounded-xl text-center hover:bg-gray-800 cursor-pointer">
            Explorar Feed 🚀
          </div>
        </Link>
      </div>
    </main>
  );
}