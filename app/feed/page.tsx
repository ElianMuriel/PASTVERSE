"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const baseTopics = [
    "Imperio Romano",
    "Segunda Guerra Mundial",
    "Revolución Francesa",
    "Batalla de Pichincha",
    "Imperio Azteca",
    "Guerra Fría",
    "Napoleón Bonaparte",
    "Antiguo Egipto",
];

export default function FeedPage() {
    const [topics, setTopics] = useState(baseTopics);
    const [loadingMore, setLoadingMore] = useState(false);

    const addMoreTopics = () => {
        if (loadingMore) return;

        setLoadingMore(true);

        const random = [...baseTopics]
            .sort(() => 0.5 - Math.random())
            .filter((topic) => !topics.includes(topic)) // 🔥 clave
            .slice(0, 3);

        setTopics((prev) => [...prev, ...random]);

        setTimeout(() => {
            setLoadingMore(false);
        }, 500);
    };

    useEffect(() => {
        const handleScroll = () => {
            const bottom =
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 200;

            if (bottom) {
                addMoreTopics();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);
    useEffect(() => {
        const handleScroll = () => {
            const bottom =
                window.innerHeight + window.scrollY >=
                document.body.offsetHeight - 300;

            if (bottom) {
                addMoreTopics();
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [topics, loadingMore]);

    return (
        <main className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black text-white">
            {topics.map((topic, index) => (
                <Section
                    key={index}
                    topic={topic}
                    isLast={index === topics.length - 1}
                    onReachEnd={addMoreTopics}
                />
            ))}
        </main>
    );
}

function Section({
    topic,
    isLast,
    onReachEnd,
}: {
    topic: string;
    isLast: boolean;
    onReachEnd: () => void;
}) {
    const [data, setData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch("/api/generate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: topic }),
            });

            const result = await res.json();
            setData(result);
        };

        fetchData();
    }, [topic]);

    return (
        <Link href={`/search/${encodeURIComponent(topic)}`}>
            <section className="h-screen snap-start flex flex-col justify-center items-center p-6 cursor-pointer hover:bg-gray-900 transition">
                {!data ? (
                    <p>Cargando...</p>
                ) : (
                    <>
                        <h1 className="text-3xl font-bold mb-4 text-center">
                            {data.title}
                        </h1>

                        {data.image && (
                            <img
                                src={data.image}
                                alt={data.title}
                                className="w-full max-w-md h-60 object-cover rounded-2xl mb-4"
                            />
                        )}

                        <p className="text-gray-300 text-center max-w-md">
                            {data.extract?.slice(0, 200)}...
                        </p>

                        {/* 👇 indicador visual */}
                        <p className="text-sm text-gray-500 mt-4">
                            Toca para explorar 👆
                        </p>
                    </>
                )}
            </section>
        </Link>
    );
}