import Link from "next/link";
import { historyData } from "../data/history";

export default function Home() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">PastVerse</h1>

      <div className="space-y-4">
        {historyData.map((item) => (
          <Link key={item.id} href={`/history/${item.id}`}>
            <div className="p-4 border rounded-xl shadow hover:bg-gray-100 cursor-pointer">
              <h2 className="text-xl font-semibold">{item.title}</h2>
              <p className="text-gray-500">{item.summary}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}