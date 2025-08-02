"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ExternalLink, Heart, DollarSign, Disc3, Radio } from "lucide-react"
import DJBanner from "./dj-banner"

export default function SongRequestForm() {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    songTitle: "",
    artist: "",
    songLink: "",
    requesterName: "",
    specialMessage: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate song request submission
    console.log("Song request submitted:", formData)
    setIsSubmitted(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-blue-900/20"></div>

        <div className="container mx-auto max-w-4xl relative z-10">
          <DJBanner />

          <div className="flex items-center justify-center">
            <Card className="w-full max-w-md mx-auto bg-black/40 backdrop-blur-lg border-purple-500/30 shadow-2xl shadow-purple-500/20">
              <CardHeader className="text-center relative">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-t-lg"></div>
                <div className="relative z-10">
                  <CardTitle className="text-green-400 flex items-center justify-center gap-2 text-2xl font-bold">
                    <div className="relative">
                      <Disc3 className="w-8 h-8 animate-spin text-pink-400" />
                      <div className="absolute inset-0 bg-pink-400 rounded-full blur-md opacity-50 animate-pulse"></div>
                    </div>
                    REQUEST RECEIVED!
                  </CardTitle>
                  <CardDescription className="text-gray-300 mt-2">
                    🎵 Thanks for your request! We'll drop "{formData.songTitle}"
                    {formData.artist && ` by ${formData.artist}`} into the mix soon! 🎵
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <div className="text-center space-y-3">
                  <p className="text-cyan-300 font-semibold animate-pulse">🔥 KEEP THE ENERGY GOING! 🔥</p>

                  <div className="space-y-3">
                    <Button
                      variant="outline"
                      className="w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 border-pink-400 text-white font-bold py-3 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-pink-500/25"
                      asChild
                    >
                      <a
                        href="https://www.instagram.com/accounts/login/?hl=en"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <Heart className="w-5 h-5 animate-pulse" />
                        FOLLOW US ON INSTAGRAM
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-500 hover:to-blue-500 border-green-400 text-white font-bold py-3 transform hover:scale-105 transition-all duration-200 shadow-lg shadow-green-500/25"
                      asChild
                    >
                      <a
                        href="https://venmo.com/u/MeManj"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2"
                      >
                        <DollarSign className="w-5 h-5 animate-bounce" />
                        TIP THE DJ ON VENMO
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </Button>
                  </div>
                </div>

                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="ghost"
                  className="w-full mt-6 text-cyan-300 hover:text-white hover:bg-cyan-600/20 border border-cyan-500/30 font-semibold"
                >
                  🎧 REQUEST ANOTHER BANGER 🎧
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-blue-900/20"></div>

      <div className="container mx-auto max-w-4xl relative z-10">
        <DJBanner />

        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md mx-auto bg-black/40 backdrop-blur-lg border-purple-500/30 shadow-2xl shadow-purple-500/20">
            <CardHeader className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-cyan-500/20 rounded-t-lg"></div>
              <div className="relative z-10">
                <CardTitle className="flex items-center gap-3 text-2xl font-bold text-white">
                  <div className="relative">
                    <Radio className="w-8 h-8 text-pink-400" />
                    <div className="absolute inset-0 bg-pink-400 rounded-full blur-md opacity-50 animate-pulse"></div>
                  </div>
                  SONG REQUEST
                </CardTitle>
                <CardDescription className="text-gray-300 mt-2">
                  🎵 Drop your track request and let's keep this party going! 🎵
                </CardDescription>
                <div className="flex justify-end mt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="text-cyan-300 hover:text-white hover:bg-cyan-600/20"
                  >
                    <a href="/dashboard" className="text-sm font-semibold">
                      🎛️ DJ DASHBOARD →
                    </a>
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="relative z-10">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="songTitle" className="text-pink-300 font-semibold">
                    TRACK TITLE *
                  </Label>
                  <Input
                    id="songTitle"
                    name="songTitle"
                    placeholder="What's the track name?"
                    value={formData.songTitle}
                    onChange={handleInputChange}
                    required
                    className="bg-black/50 border-purple-400/50 text-white placeholder-gray-400 focus:border-pink-400 focus:ring-pink-400/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="artist" className="text-cyan-300 font-semibold">
                    ARTIST
                  </Label>
                  <Input
                    id="artist"
                    name="artist"
                    placeholder="Who's the artist?"
                    value={formData.artist}
                    onChange={handleInputChange}
                    className="bg-black/50 border-purple-400/50 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-cyan-400/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="songLink" className="text-green-300 font-semibold">
                    TRACK LINK
                  </Label>
                  <Input
                    id="songLink"
                    name="songLink"
                    type="url"
                    placeholder="Spotify, YouTube, Apple Music..."
                    value={formData.songLink}
                    onChange={handleInputChange}
                    className="bg-black/50 border-purple-400/50 text-white placeholder-gray-400 focus:border-green-400 focus:ring-green-400/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="requesterName" className="text-yellow-300 font-semibold">
                    YOUR NAME
                  </Label>
                  <Input
                    id="requesterName"
                    name="requesterName"
                    placeholder="What should we call you?"
                    value={formData.requesterName}
                    onChange={handleInputChange}
                    className="bg-black/50 border-purple-400/50 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400/50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="specialMessage" className="text-purple-300 font-semibold">
                    SPECIAL SHOUTOUT
                  </Label>
                  <Textarea
                    id="specialMessage"
                    name="specialMessage"
                    placeholder="Any special message or dedication?"
                    value={formData.specialMessage}
                    onChange={handleInputChange}
                    rows={3}
                    className="bg-black/50 border-purple-400/50 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-purple-400/50"
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 hover:from-pink-500 hover:via-purple-500 hover:to-cyan-500 text-white font-bold py-3 text-lg transform hover:scale-105 transition-all duration-200 shadow-lg shadow-purple-500/50"
                >
                  🚀 DROP THE REQUEST 🚀
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
