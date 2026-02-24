import React, { useState } from "react";

// 定义一个最简单的 Header，防止因为外部组件找不到而报错
const SimpleHeader = () => (
  <header className="py-8 text-2xl font-bold text-blue-600 uppercase tracking-widest">
    K-Fashion AI Lab
  </header>
);

export default function HomePage() {
  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen bg-black text-white font-sans">
      <SimpleHeader />
      
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4">
        <h1 className="mx-auto max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl mb-8">
          打造你的 <span className="text-blue-600">韩系穿搭</span> 视觉大片
        </h1>

        <div className="mt-10 p-12 border-2 border-dashed border-gray-800 rounded-3xl w-full max-w-2xl bg-[#0a0a0a]">
          <p className="text-gray-500 mb-6">系统初始化成功！</p>
          <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold transition">
            准备接入上传组件
          </button>
        </div>

        <p className="mt-12 text-gray-500 text-sm italic">
          由 RunningHub 算力驱动 · 专属时尚博主工具
        </p>
      </main>

      <footer className="py-8 text-gray-700 text-xs">
        © 2026 K-Fashion AI Laboratory
      </footer>
    </div>
  );
}
