"use client";

import { historyData } from "@/data/history";
import { useState } from "react";
import { motion } from "framer-motion";

export default function Feed() {
  const [index, setIndex] = useState(0);

  const item = historyData[index];

  const handleDragEnd = (_: any, info: any) => {
    if (info.offset.y < -50) {
      // swipe arriba → siguiente
      if (index < historyData.length - 1) {
        setIndex(index + 1);
      }
    }

    if (info.offset.y > 50) {
      // swipe abajo → anterior
      if (index > 0) {
        setIndex(index - 1);
      }
    }
  };

  return (
    <div className="h-screen bg-black text-white flex items-center justify-center overflow-hidden">
      
      <motion.div
        key={index}
        drag="y"
        onDragEnd={handleDragEnd}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.3 }}
      >
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-64 object-cover rounded-xl mb-4"
        />

        <h1 className="text-2xl font-bold mb-2">{item.title}</h1>
        <p className="text-gray-400">{item.summary}</p>
      </motion.div>

    </div>
  );
}