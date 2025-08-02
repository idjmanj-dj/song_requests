"use client"

import { Disc3, Music, Radio, Zap } from "lucide-react"

export default function DJBanner() {
  return (
    <div className="relative mb-8 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-pink-600/20 via-purple-600/30 to-cyan-600/20 rounded-2xl"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent rounded-2xl"></div>

      {/* Animated Elements */}
      <div className="absolute top-4 left-4">
        <Disc3 className="w-8 h-8 text-pink-400 animate-spin opacity-60" />
      </div>
      <div className="absolute top-4 right-4">
        <Radio className="w-6 h-6 text-cyan-400 animate-pulse opacity-60" />
      </div>
      <div className="absolute bottom-4 left-8">
        <Music className="w-5 h-5 text-purple-400 animate-bounce opacity-40" />
      </div>
      <div className="absolute bottom-4 right-8">
        <Zap className="w-5 h-5 text-yellow-400 animate-pulse opacity-40" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center py-8 px-6">
        <div className="mb-4">
          <h1 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 animate-pulse">
            DJ MANJ
          </h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-1 w-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full animate-pulse"></div>
            <Disc3 className="w-6 h-6 text-pink-400 animate-spin" />
            <div className="h-1 w-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        <p className="text-lg md:text-xl font-bold text-cyan-300 tracking-wider">
          🎵 GETS YOU MOVING ON THE DANCE FLOOR 🎵
        </p>

        {/* Pulsing Beat Effect */}
        <div className="flex justify-center items-center gap-1 mt-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={`w-1 bg-gradient-to-t from-pink-500 to-purple-500 rounded-full animate-pulse`}
              style={{
                height: `${Math.random() * 20 + 10}px`,
                animationDelay: `${i * 0.1}s`,
                animationDuration: "0.8s",
              }}
            ></div>
          ))}
          <span className="mx-2 text-pink-400 font-bold">♪</span>
          {[...Array(5)].map((_, i) => (
            <div
              key={i + 5}
              className={`w-1 bg-gradient-to-t from-cyan-500 to-blue-500 rounded-full animate-pulse`}
              style={{
                height: `${Math.random() * 20 + 10}px`,
                animationDelay: `${(i + 5) * 0.1}s`,
                animationDuration: "0.8s",
              }}
            ></div>
          ))}
        </div>
      </div>

      {/* Glowing Border Effect */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-pink-500/50 via-purple-500/50 to-cyan-500/50 opacity-60 animate-pulse"></div>
      <div className="absolute inset-1 rounded-2xl bg-black/20 backdrop-blur-sm"></div>
    </div>
  )
}
