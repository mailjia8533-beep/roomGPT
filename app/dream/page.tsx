"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import LoadingDots from "../components/LoadingDots";
import ResizablePanel from "../components/ResizablePanel";

export default function DreamPage() {
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  async function generatePhoto(fileUrl: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ imageUrl: fileUrl }),
      });
      const data = await res.json();
      if (res.status !== 200) {
        setError(data.error || "生成失败");
      } else {
        setRestoredImage(data.output_url || data[1]);
      }
    } catch (e) {
      setError("连接服务失败");
    }
    setLoading(false);
  }

  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen bg-black text-white">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4 sm:mb-0 mb-8">
        <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-tighter text-slate-100 sm:text-6xl mb-5 uppercase">
          AI 韩系穿搭 <span className="text-blue-600">视觉</span> 实验室
        </h1>
        
        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="flex justify-between items-center w-full flex-col mt-4">
              {/* 这里放你的上传组件逻辑 */}
              {!originalPhoto && !loading && (
                <div className="py-10 border-2 border-dashed border-gray-700 rounded-xl w-full">
                  <p className="text-gray-500">等待上传组件接入...</p>
                  {/* 如果你有具体上传按钮代码可以加在这里 */}
                </div>
              )}

              {loading && (
                <div className="flex flex-col items-center py-10">
                  <LoadingDots color="white" style="large" />
                  <p className="mt-4 text-blue-500 animate-pulse">RunningHub 算力调度中...</p>
                </div>
              )}

              {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-xl mt-8">
                  {error}
                </div>
              )}

              {restoredImage && (
                <div className="mt-8">
                  <img src={restoredImage} alt="Generated" className="rounded-2xl w-full max-w-lg border-2 border-blue-600" />
                  <button 
                    onClick={() => {setOriginalPhoto(null); setRestoredImage(null);}}
                    className="mt-6 bg-white text-black px-6 py-2 rounded-full font-bold"
                  >
                    重新生成
                  </button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
      <Footer />
    </div>
  );
}
