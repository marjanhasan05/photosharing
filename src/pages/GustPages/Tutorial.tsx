import { useState } from "react";
import {
  PlayCircle,
  Smartphone,
  Download,
  FolderOpen,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Apple,
  Tablet,
  ArrowLeft,
} from "lucide-react";

import tutorialVideo from "@/assets/instruction.mp4"

const iPhoneSteps = [
  { icon: <CheckCircle size={16} />, text: "Zaznacz zdjęcia" },
  { icon: <Download size={16} />, text: 'Kliknij „Download with ZIP"' },
  { icon: <FolderOpen size={16} />, text: "Otwórz plik ZIP w aplikacji Pliki" },
  { icon: <FolderOpen size={16} />, text: "Otwórz wypakowany folder" },
  { icon: <CheckCircle size={16} />, text: "Zaznacz zdjęcia" },
  {
    icon: <Smartphone size={16} />,
    text: 'Kliknij Udostępnij → „Zachowaj obrazki"',
  },
];

const androidSteps = [
  { icon: <CheckCircle size={16} />, text: "Zaznacz zdjęcia" },
  { icon: <Download size={16} />, text: 'Kliknij „Download with ZIP"' },
  { icon: <FolderOpen size={16} />, text: "Otwórz pobrany plik ZIP" },
  { icon: <FolderOpen size={16} />, text: "Wypakuj/Otwórz folder" },
  { icon: <CheckCircle size={16} />, text: "Zaznacz zdjęcia" },
  {
    icon: <Smartphone size={16} />,
    text: "Kliknij Udostępnij / Zapisz do galerii",
  },
];

export default function Tutorial() {
  const [openSection, setOpenSection] = useState<"ios" | "android" | null>(
    "ios",
  );
  const [videoPlaying, setVideoPlaying] = useState(false);

  const toggle = (section: "ios" | "android") => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl overflow-hidden shadow-lg max-w-3xl w-full">
        {/* HEADER GRADIENT BAR */}
        <div
          className="h-2 w-full"
          style={{ background: "linear-gradient(90deg, #a855f7, #f97316)" }}
        />

        <div className="p-6 sm:p-10">
          {/* PAGE TITLE */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">
              📖 Tutorial
            </h1>
            <p className="text-sm text-gray-500">
              {/* Learn how to download and save your photos on mobile devices. */}
              Dowiedz się, jak pobierać i zapisywać zdjęcia na urządzeniach mobilnych.
            </p>
          </div>

          {/* VIDEO SECTION */}
          <div className="mb-8">
            <h2 className="text-base font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <PlayCircle size={18} className="text-purple-500" />
              {/* Video Tutorial */}
              Samouczek wideo
            </h2>

            <div
              className="relative w-full rounded-2xl overflow-hidden bg-gray-900 flex items-center justify-center cursor-pointer group"
              style={{ aspectRatio: "16/9" }}
              onClick={() => setVideoPlaying(true)}
            >
              {!videoPlaying ? (
                <>
                  {/* Thumbnail placeholder */}
                  <div
                    className="absolute inset-0 w-full h-full opacity-30"
                    style={{
                      background:
                        "linear-gradient(135deg, #a855f7 0%, #f97316 100%)",
                    }}
                  />
                  <div className="relative z-10 flex flex-col items-center gap-3">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200"
                      style={{
                        background: "linear-gradient(90deg, #a855f7, #f97316)",
                      }}
                    >
                      <PlayCircle size={36} className="text-white" />
                    </div>
                    <span className="text-white text-sm font-medium">
                      {/* Click to play tutorial */}
                      Kliknij, aby odtworzyć samouczek
                    </span>
                  </div>
                </>
              ) : (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={tutorialVideo}
                  title="Tutorial Video"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                />
              )}
            </div>
          </div>

          {/* INSTRUCTIONS TITLE */}
          <div className="mb-4">
            <h2 className="text-base font-semibold text-gray-700 flex items-center gap-2">
              <Smartphone size={18} className="text-orange-500" />
              {/* INSTRUCTION TO DOWNLOAD MOBILE */}
              INSTRUKCJA POBRANIA WERSJI MOBILNEJ
            </h2>
            <p className="text-xs text-gray-400 mt-1">
              {/* Follow the steps below for your device. */}
              Wykonaj poniższe czynności dla swojego urządzenia.
            </p>
          </div>

          {/* iOS ACCORDION */}
          <div className="mb-3 border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <button
              onClick={() => toggle("ios")}
              className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                  style={{
                    background: "linear-gradient(90deg, #a855f7, #f97316)",
                  }}
                >
                  <Apple size={16} />
                </div>
                <span className="font-semibold text-gray-800 text-sm">
                   iPhone (iOS)
                </span>
              </div>
              {openSection === "ios" ? (
                <ChevronUp size={18} className="text-gray-400" />
              ) : (
                <ChevronDown size={18} className="text-gray-400" />
              )}
            </button>

            {openSection === "ios" && (
              <div className="px-5 py-4 bg-white">
                <ol className="space-y-3">
                  {iPhoneSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div
                        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5"
                        style={{
                          background:
                            "linear-gradient(90deg, #a855f7, #f97316)",
                        }}
                      >
                        {i + 1}
                      </div>
                      <span className="text-sm text-gray-700">{step.text}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-4 flex items-center gap-2 bg-purple-50 border border-purple-100 rounded-xl px-4 py-2.5">
                  <CheckCircle
                    size={16}
                    className="text-purple-500 flex-shrink-0"
                  />
                  <span className="text-sm text-purple-700 font-medium">
                    Zdjęcia pojawią się w galerii
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Android ACCORDION */}
          <div className="mb-6 border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
            <button
              onClick={() => toggle("android")}
              className="w-full flex items-center justify-between px-5 py-4 bg-gray-50 hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm"
                  style={{
                    background: "linear-gradient(90deg, #a855f7, #f97316)",
                  }}
                >
                  <Tablet size={16} />
                </div>
                <span className="font-semibold text-gray-800 text-sm">
                   Android
                </span>
              </div>
              {openSection === "android" ? (
                <ChevronUp size={18} className="text-gray-400" />
              ) : (
                <ChevronDown size={18} className="text-gray-400" />
              )}
            </button>

            {openSection === "android" && (
              <div className="px-5 py-4 bg-white">
                <ol className="space-y-3">
                  {androidSteps.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div
                        className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5"
                        style={{
                          background:
                            "linear-gradient(90deg, #a855f7, #f97316)",
                        }}
                      >
                        {i + 1}
                      </div>
                      <span className="text-sm text-gray-700">{step.text}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-4 flex items-center gap-2 bg-orange-50 border border-orange-100 rounded-xl px-4 py-2.5">
                  <CheckCircle
                    size={16}
                    className="text-orange-500 flex-shrink-0"
                  />
                  <span className="text-sm text-orange-700 font-medium">
                    Zdjęcia pojawią się w galerii
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* BACK BUTTON */}
          <button
            onClick={() => window.history.back()}
            className="w-full py-3 rounded-full cursor-pointer text-white text-sm font-medium flex items-center justify-center"
            style={{ background: "linear-gradient(90deg, #a855f7, #f97316)" }}
          >
            <ArrowLeft /> Powrót do pulpitu nawigacyjnego
          </button>
        </div>
      </div>
    </div>
  );
}
