"use client";
import { useState } from "react";
import Link from "next/link";
import { historyData } from "../data/history";

export default function Home() {
  const [search, setSearch] = useState("");
  const filteredData = historyData.filter((item) =>
    item.title.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">PastVerse</h1>

      <div className="space-y-4">
        <input
          type="text"
          placeholder="Buscar historia..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full p-3 mb-6 rounded-xl bg-gray-800 text-white outline-none"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              window.location.href = `/search/${search}`;
            }
          }}
        />
        {filteredData.map((item) => (
          <Link key={item.id} href={`/history/${item.id}`}>
            <div className="p-4 border rounded-xl shadow hover:bg-gray-100 cursor-pointer">

              <img
                src={item.image}
                alt={item.title}
                className="w-full h-40 object-cover rounded-xl mb-3 transition-transform duration-300 hover:scale-105"
              />

              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-500">{item.summary}</p>

            </div>
          </Link>
        ))}
      </div>
      <a href="/feed" className="text-blue-500 underline">
        Ir al modo exploración →
      </a>
    </main>
  );
}