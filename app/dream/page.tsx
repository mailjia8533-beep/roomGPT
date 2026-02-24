"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DreamPage() {
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen bg-black text-white">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4">
        <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-tighter text-slate-100 sm:text-6xl mb-5 uppercase">
          AI 韩系穿搭视觉实验室
        </h1>
        <div className="py-10 border-2 border-dashed border-gray-700 rounded-xl w-full">
          <p className="text-gray-500">测试编译：如果看到这个界面，说明部署成功了！</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
