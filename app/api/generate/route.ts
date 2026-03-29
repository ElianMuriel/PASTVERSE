import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    const res = await fetch(
      `https://es.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`
    );

    if (!res.ok) {
      return NextResponse.json({
        content: "No se encontró información para esta búsqueda.",
      });
    }

    const data = await res.json();

    return NextResponse.json({
      title: data.title,
      extract: data.extract,
      image: data.thumbnail?.source || null,
    });
  } catch (error) {
    return NextResponse.json({
      content: "Error al obtener datos.",
    });
  }
}