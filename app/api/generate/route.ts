import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { query } = await req.json();

        const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-4o",
                messages: [
                    {
                        role: "system",
                        content:
                            "Eres un experto en historia. Responde claro, breve y dividido en secciones.",
                    },
                    {
                        role: "user",
                        content: `Explícame ${query} con:
            - resumen
            - inicio
            - desarrollo
            - impacto`,
                    },
                ],
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            return NextResponse.json({
                content: `
        Resumen:
        ${query} es un tema histórico importante.

        Inicio:
        Aquí comienza la historia de ${query}...

        Desarrollo:
        Se desarrolló a lo largo del tiempo con eventos clave...

        Impacto:
        Tuvo un gran impacto en la historia mundial.
            `,
            });
        }

        return NextResponse.json({
            content: data.choices?.[0]?.message?.content || "Sin contenido",
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: "Error interno del servidor" },
            { status: 500 }
        );
    }
}