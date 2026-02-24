import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex flex-col xs:flex-row justify-between items-center w-full mt-3 border-b pb-7 sm:px-4 px-2 border-gray-200 gap-2">
      <Link href="/" className="flex space-x-2 items-center">
        {/* 这里换成了一个更具时尚感的图标，或者暂时保持文字 */}
        <div className="bg-black text-white p-1 rounded-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"></path>
            <line x1="16" y1="8" x2="2" y2="22"></line>
            <line x1="17.5" y1="15" x2="9" y2="15"></line>
          </svg>
        </div>
        <h1 className="sm:text-2xl text-xl font-extrabold ml-2 tracking-tighter uppercase">
          K-Fashion <span className="text-blue-600">AI</span>
        </h1>
      </Link>
      
      {/* 右侧按钮：从原来的 GitHub 按钮改成了更像品牌入口的样式 */}
      <div className="flex gap-4 items-center">
        <a
          className="hidden sm:flex max-w-fit items-center justify-center space-x-2 text-gray-600 hover:text-black text-sm font-medium transition"
          href="#"
        >
          <span>穿搭灵感</span>
        </a>
        <a
          className="flex max-w-fit items-center justify-center space-x-2 rounded-full border border-black bg-black text-white px-5 py-2 text-sm shadow-sm hover:bg-gray-800 transition"
          href="https://www.xiaohongshu.com" // 这里以后可以改成你的小红书主页
          target="_blank"
          rel="noopener noreferrer"
        >
          <p>关注博主</p>
        </a>
      </div>
    </header>
  );
}
