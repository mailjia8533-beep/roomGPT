"use client";  
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useState } from "react";
import { UrlBuilder } from "@bytescale/sdk";
import { UploadWidgetConfig } from "@bytescale/upload-widget";
import { UploadDropzone } from "@bytescale/upload-widget-react";
import { CompareSlider } from "../../components/CompareSlider";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import LoadingDots from "../../components/LoadingDots";
import ResizablePanel from "../../components/ResizablePanel";
import Toggle from "../../components/Toggle";
import appendNewToName from "../../utils/appendNewToName";
import downloadPhoto from "../../utils/downloadPhoto";
import DropDown from "../../components/DropDown";

const themes = ["K-Pop Style", "Clean Fit", "Vintage High-End", "Minimalist"];
const rooms = ["Street Shot", "Studio", "Magazine Cover", "Daily Look"];

const options: UploadWidgetConfig = {
  apiKey: !!process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    ? process.env.NEXT_PUBLIC_UPLOAD_API_KEY
    : "free",
  maxFileCount: 1,
  mimeTypes: ["image/jpeg", "image/png", "image/jpg"],
  editor: { images: { crop: false } },
  styles: {
    colors: {
      primary: "#000000",
      error: "#d23f4d",
      shade100: "#fff",
      shade200: "#fffe",
      shade300: "#fffd",
      shade400: "#fffc",
      shade500: "#fff9",
      shade600: "#fff7",
      shade700: "#fff2",
      shade800: "#fff1",
      shade900: "#ffff",
    },
  },
};

export default function DreamPage() {
  const [originalPhoto, setOriginalPhoto] = useState<string | null>(null);
  const [restoredImage, setRestoredImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [restoredLoaded, setRestoredLoaded] = useState<boolean>(false);
  const [sideBySide, setSideBySide] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [photoName, setPhotoName] = useState<string | null>(null);
  const [theme, setTheme] = useState(themes[0]);
  const [room, setRoom] = useState(rooms[0]);

  const UploadDropZone = () => (
    <UploadDropzone
      options={options}
      onUpdate={({ uploadedFiles }) => {
        if (uploadedFiles.length !== 0) {
          const image = uploadedFiles[0];
          const imageName = image.originalFile.originalFileName;
          const imageUrl = UrlBuilder.url({
            accountId: image.accountId,
            filePath: image.filePath,
            options: {
              transformation: "preset",
              transformationPreset: "thumbnail",
            },
          });
          setPhotoName(imageName);
          setOriginalPhoto(imageUrl);
          generatePhoto(imageUrl);
        }
      }}
      width="100%"
      height="250px"
    />
  );

  async function generatePhoto(fileUrl: string) {
    await new Promise((resolve) => setTimeout(resolve, 200));
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          imageUrl: fileUrl,
          prompt: `A high-end Korean fashion shot, ${theme} style, ${room} setting, 8k resolution`,
        }),
      });

      const data = await res.json();
      if (res.status !== 200) {
        setError(data.error || "生成失败，请检查 RunningHub 配置");
      } else {
        setRestoredImage(data.output_url || data[1]);
      }
    } catch (err) {
      setError("生成过程中出错，请重试");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex max-w-6xl mx-auto flex-col items-center justify-center py-2 min-h-screen bg-black text-white">
      <Header />
      <main className="flex flex-1 w-full flex-col items-center justify-center text-center px-4 mt-4 sm:mb-0 mb-8">
        <h1 className="mx-auto max-w-4xl font-display text-4xl font-bold tracking-tighter text-slate-100 sm:text-6xl mb-5 uppercase">
          AI 韩系穿搭 <span className="text-blue-600">视觉</span> 实验室
        </h1>
        <p className="text-gray-400 mb-10">基于 ComfyUI 算力 · 一键生成高级街拍感</p>

        <ResizablePanel>
          <AnimatePresence mode="wait">
            <motion.div className="flex justify-between items-center w-full flex-col mt-4">
              {!restoredImage && (
                <div className="flex flex-col md:flex-row gap-8 w-full justify-center items-start mb-10">
                  <div className="space-y-4 w-full max-w-sm text-left">
                    <p className="font-medium text-blue-500">01. 选择穿搭风格</p>
                    <DropDown
                      theme={theme}
                      setTheme={(newTheme) => setTheme(newTheme)}
                      themes={themes}
                    />
                  </div>
                  <div className="space-y-4 w-full max-w-sm text-left">
                    <p className="font-medium text-blue-500">02. 选择拍摄场景</p>
                    <DropDown
                      theme={room}
                      setTheme={(newRoom) => setRoom(newRoom)}
                      themes={rooms}
                    />
                  </div>
                </div>
              )}

              {restoredImage && (
                <div className="mb-6 text-lg">
                  ✨ 已为您生成全新的 <b>{theme}</b> 风格大片！
                </div>
              )}

              <div className={restoredLoaded ? "visible mt-6" : "invisible"}>
                <Toggle
                  sideBySide={sideBySide}
                  setSideBySide={(newVal) => setSideBySide(newVal)}
                />
              </div>

              {restoredLoaded && sideBySide && (
                <CompareSlider
                  original={originalPhoto!}
                  restored={restoredImage!}
                />
              )}

              {!originalPhoto && (
                <div className="w-full max-w-2xl border-2 border-dashed border-gray-700 rounded-2xl p-4">
                  <p className="mb-4 text-gray-500">上传您的原始图片开始转换</p>
                  <UploadDropZone />
                </div>
              )}

              {originalPhoto && !restoredImage && !loading && (
                <Image
                  alt="original photo"
                  src={originalPhoto}
                  className="rounded-2xl h-96 object-cover"
                  width={475}
                  height={475}
                />
              )}

              {restoredImage && originalPhoto && !sideBySide && (
                <div className="flex sm:space-x-4 sm:flex-row flex-col">
                  <div>
                    <h2 className="mb-2 font-medium text-gray-400">原始图片</h2>
                    <Image
                      alt="original photo"
                      src={originalPhoto}
                      className="rounded-2xl relative w-full h-96 object-cover"
                      width={475}
                      height={475}
                    />
                  </div>
                  <div className="sm:mt-0 mt-8">
                    <h2 className="mb-2 font-medium text-blue-400">AI 生成大片</h2>
                    <a href={restoredImage} target="_blank" rel="noreferrer">
                      <Image
                        alt="restored photo"
                        src={restoredImage}
                        className="rounded-2xl relative cursor-zoom-in w-full h-96 object-cover border-2 border-blue-600"
                        width={475}
                        height={475}
                        onLoadingComplete={() => setRestoredLoaded(true)}
                      />
                    </a>
                  </div>
                </div>
              )}

              {loading && (
                <div className="flex flex-col items-center py-10">
                  <LoadingDots color="white" style="large" />
                  <p className="mt-4 text-blue-500 animate-pulse">
                    RunningHub 算力调度中...
                  </p>
                </div>
              )}

              {error && (
                <div className="bg-red-900/50 border border-red-500 text-red-200 px-4 py-3 rounded-xl mt-8">
                  {error}
                </div>
              )}

              <div className="flex space-x-4 justify-center mt-8">
                {originalPhoto && !loading && (
                  <button
                    onClick={() => {
                      setOriginalPhoto(null);
                      setRestoredImage(null);
                      setRestoredLoaded(false);
                      setError(null);
                    }}
                    className="bg-white text-black rounded-full font-bold px-6 py-2 hover:bg-gray-200 transition"
                  >
                    重新上传
                  </button>
                )}
                {restoredImage && (
                  <button
                    onClick={() => downloadPhoto(restoredImage, photoName)}
                    className="bg-blue-600 text-white rounded-full font-bold px-6 py-2 hover:bg-blue-500 transition"
                  >
                    下载图片
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </ResizablePanel>
      </main>
      <Footer />
    </div>
  );
}
