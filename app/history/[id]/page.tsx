import { historyData } from "@/data/history";

export default async function HistoryDetail({ params }: any) {
  const resolvedParams = await params;
  const id = Number(resolvedParams.id);

  const item = historyData.find((h) => h.id === id);

  if (!item) return <p>No encontrado</p>;

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-4">{item.title}</h1>

      <div className="space-y-4">
        {item.sections.map((section: any, index: number) => (
          <div key={index} className="p-4 border rounded-xl">
            <h2 className="text-xl font-semibold">{section.title}</h2>
            <p className="text-gray-600">{section.content}</p>
          </div>
        ))}
      </div>
    </main>
  );
}