import Image from "next/image";
import Link from "next/link";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SquigglyLines from "../components/SquigglyLines";

export default function HomePage() {
  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen bg-[#0a0a0a] text-white">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 sm:mt-20 mt-20">
        {/* 顶部小标签 */}
        <div className="border border-gray-800 rounded-full py-1 px-4 text-gray-500 text-sm mb-5">
          由 <span className="text-blue-600">RunningHub</span> 提供算力支持
        </div>

        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-tight text-gray-100 sm:text-7xl">
          打造你的{" "}
          <span className="relative whitespace-nowrap text-blue-600">
            <SquigglyLines />
            <span className="relative">韩系穿搭</span>
          </span>{" "}
          AI 视觉大片
        </h1>

        <h2 className="mx-auto mt-12 max-w-xl text-lg text-gray-400 leading-7">
          上传穿搭照片，通过 AI 技术一键切换多种韩系流行风格。
          100% 自动化生成 —— 开启你的私人 AI 时尚模特之旅。
        </h2>

        <Link
          className="bg-blue-600 rounded-full text-white font-bold px-8 py-4 sm:mt-10 mt-8 hover:bg-blue-500 transition shadow-lg shadow-blue-600/20"
          href="/dream"
        >
          立即开始生成
        </Link>

        {/* 案例展示区 - 修复后的完整结构 */}
        <div className="flex justify-between items-center w-full flex-col sm:mt-20 mt-10">
          <div className="flex flex-col space-y-10 mt-4 mb-16">
            <div className="flex sm:space-x-12 sm:flex-row flex-col">
              {/* 原始图卡片 */}
              <div>
                <h3 className="mb-3 font-medium text-gray-500 uppercase tracking-widest text-sm">
                  Original Style / 原始图
                </h3>
                <Image
                  alt="Original fashion photo"
                  src="/original-pic.jpg"
                  className="w-full object-cover h-[450px] rounded-2xl border border-gray-800"
                  width={400}
                  height={400}
                />
              </div>

              {/* 生成图卡片 */}
              <div className="sm:mt-0 mt-8">
                <h3 className="mb-3 font-medium text-blue-500 uppercase tracking-widest text-sm">
                  AI K-Fashion / 生成图
                </h3>
                <Image
                  alt="Generated fashion photo"
                  src="/generated-pic-2.jpg"
                  className="w-full object-cover h-[450px] rounded-2xl border border-blue-900/30 sm:mt-0 mt-2"
                  width={400}
                  height={400}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
