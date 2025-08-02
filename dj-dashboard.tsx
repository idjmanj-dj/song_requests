"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Music,
  Play,
  Check,
  X,
  ExternalLink,
  Clock,
  User,
  MessageSquare,
  ChevronUp,
  ChevronDown,
  Disc3,
  Radio,
} from "lucide-react"
import DJBanner from "./dj-banner"

interface SongRequest {
  id: string
  songTitle: string
  artist: string
  songLink?: string
  requesterName?: string
  specialMessage?: string
  status: "pending" | "playing" | "completed" | "rejected"
  timestamp: Date
  priority: number
}

// Mock data for demonstration
const mockRequests: SongRequest[] = [
  {
    id: "1",
    songTitle: "Blinding Lights",
    artist: "The Weeknd",
    songLink: "https://open.spotify.com/track/0VjIjW4GlULA4LGoDOLVKN",
    requesterName: "Sarah",
    specialMessage: "For my birthday! 🎉",
    status: "pending",
    timestamp: new Date(Date.now() - 5 * 60000),
    priority: 1,
  },
  {
    id: "2",
    songTitle: "Good 4 U",
    artist: "Olivia Rodrigo",
    songLink: "https://www.youtube.com/watch?v=gNi_6U5Pm_o",
    requesterName: "Mike",
    status: "playing",
    timestamp: new Date(Date.now() - 10 * 60000),
    priority: 2,
  },
  {
    id: "3",
    songTitle: "Levitating",
    artist: "Dua Lipa",
    requesterName: "Jessica",
    specialMessage: "Please play this for our anniversary dance!",
    status: "pending",
    timestamp: new Date(Date.now() - 15 * 60000),
    priority: 3,
  },
  {
    id: "4",
    songTitle: "Stay",
    artist: "The Kid LAROI & Justin Bieber",
    status: "completed",
    timestamp: new Date(Date.now() - 30 * 60000),
    priority: 4,
  },
]

export default function DJDashboard() {
  const [requests, setRequests] = useState<SongRequest[]>(mockRequests)

  const updateRequestStatus = (id: string, status: SongRequest["status"]) => {
    setRequests((prev) => prev.map((req) => (req.id === id ? { ...req, status } : req)))
  }

  const moveRequest = (id: string, direction: "up" | "down") => {
    setRequests((prev) => {
      const index = prev.findIndex((req) => req.id === id)
      if (index === -1) return prev

      const newRequests = [...prev]
      const targetIndex = direction === "up" ? index - 1 : index + 1

      if (targetIndex >= 0 && targetIndex < newRequests.length) {
        ;[newRequests[index], newRequests[targetIndex]] = [newRequests[targetIndex], newRequests[index]]
      }

      return newRequests
    })
  }

  const getStatusColor = (status: SongRequest["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-400/50"
      case "playing":
        return "bg-green-500/20 text-green-300 border-green-400/50 animate-pulse"
      case "completed":
        return "bg-gray-500/20 text-gray-300 border-gray-400/50"
      case "rejected":
        return "bg-red-500/20 text-red-300 border-red-400/50"
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/50"
    }
  }

  const formatTimeAgo = (date: Date) => {
    const minutes = Math.floor((Date.now() - date.getTime()) / 60000)
    if (minutes < 1) return "Just now"
    if (minutes === 1) return "1 minute ago"
    return `${minutes} minutes ago`
  }

  const pendingRequests = requests.filter((req) => req.status === "pending")
  const playingRequests = requests.filter((req) => req.status === "playing")
  const completedRequests = requests.filter((req) => req.status === "completed")

  const RequestCard = ({ request }: { request: SongRequest }) => (
    <Card className="mb-4 bg-black/40 backdrop-blur-lg border-purple-500/30 shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 transition-all duration-200">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <div className="relative">
                <Music className="w-4 h-4 text-pink-400" />
                {request.status === "playing" && (
                  <div className="absolute inset-0 bg-pink-400 rounded-full blur-sm opacity-50 animate-pulse"></div>
                )}
              </div>
              <h3 className="font-bold text-white">{request.songTitle}</h3>
              <Badge className={`${getStatusColor(request.status)} font-semibold`}>
                {request.status.toUpperCase()}
              </Badge>
            </div>

            {request.artist && <p className="text-cyan-300 mb-1 font-medium">by {request.artist}</p>}

            {request.requesterName && (
              <div className="flex items-center gap-1 text-sm text-gray-300 mb-1">
                <User className="w-3 h-3 text-yellow-400" />
                Requested by <span className="text-yellow-300 font-semibold">{request.requesterName}</span>
              </div>
            )}

            {request.specialMessage && (
              <div className="flex items-start gap-1 text-sm text-gray-300 mb-2">
                <MessageSquare className="w-3 h-3 mt-0.5 text-purple-400" />
                <span className="italic text-purple-300">"{request.specialMessage}"</span>
              </div>
            )}

            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Clock className="w-3 h-3" />
              {formatTimeAgo(request.timestamp)}
            </div>
          </div>

          <div className="flex flex-col gap-2 ml-4">
            {request.status === "pending" && (
              <div className="flex gap-1">
                <Button
                  size="sm"
                  onClick={() => moveRequest(request.id, "up")}
                  variant="outline"
                  className="border-cyan-400/50 text-cyan-300 hover:bg-cyan-600/20"
                >
                  <ChevronUp className="w-3 h-3" />
                </Button>
                <Button
                  size="sm"
                  onClick={() => moveRequest(request.id, "down")}
                  variant="outline"
                  className="border-cyan-400/50 text-cyan-300 hover:bg-cyan-600/20"
                >
                  <ChevronDown className="w-3 h-3" />
                </Button>
              </div>
            )}

            <div className="flex gap-1">
              {request.songLink && (
                <Button
                  size="sm"
                  variant="outline"
                  asChild
                  className="border-purple-400/50 text-purple-300 hover:bg-purple-600/20 bg-transparent"
                >
                  <a href={request.songLink} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </Button>
              )}

              {request.status === "pending" && (
                <>
                  <Button
                    size="sm"
                    onClick={() => updateRequestStatus(request.id, "playing")}
                    className="bg-green-600 hover:bg-green-500 text-white"
                  >
                    <Play className="w-3 h-3" />
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => updateRequestStatus(request.id, "rejected")}
                    className="bg-red-600 hover:bg-red-500"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </>
              )}

              {request.status === "playing" && (
                <Button
                  size="sm"
                  onClick={() => updateRequestStatus(request.id, "completed")}
                  className="bg-blue-600 hover:bg-blue-500 text-white"
                >
                  <Check className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-blue-900/20"></div>

      <div className="container mx-auto p-6 max-w-6xl relative z-10">
        <DJBanner />

        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">🎛️ CONTROL CENTER</h2>
              <p className="text-cyan-300 text-lg">Master your mix • Control the vibe • Keep the party alive</p>
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              asChild
              className="border-cyan-400/50 text-cyan-300 hover:bg-cyan-600/20 font-semibold bg-transparent"
            >
              <a href="/" className="flex items-center gap-2">
                ← BACK TO REQUESTS
              </a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-yellow-600/20 to-orange-600/20 backdrop-blur-lg border-yellow-400/30 shadow-lg shadow-yellow-500/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-yellow-300 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                PENDING REQUESTS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{pendingRequests.length}</div>
              <p className="text-yellow-200 text-sm">tracks in queue</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 backdrop-blur-lg border-green-400/30 shadow-lg shadow-green-500/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-green-300 flex items-center gap-2">
                <div className="relative">
                  <Disc3 className="w-4 h-4 animate-spin" />
                </div>
                NOW PLAYING
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{playingRequests.length}</div>
              <p className="text-green-200 text-sm">tracks spinning</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-600/20 to-indigo-600/20 backdrop-blur-lg border-purple-400/30 shadow-lg shadow-purple-500/10">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-bold text-purple-300 flex items-center gap-2">
                <Check className="w-4 h-4" />
                COMPLETED TODAY
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-white">{completedRequests.length}</div>
              <p className="text-purple-200 text-sm">tracks played</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-black/40 backdrop-blur-lg border border-purple-500/30">
            <TabsTrigger
              value="pending"
              className="data-[state=active]:bg-yellow-600/30 data-[state=active]:text-yellow-300 text-gray-300 font-semibold"
            >
              🔥 PENDING ({pendingRequests.length})
            </TabsTrigger>
            <TabsTrigger
              value="playing"
              className="data-[state=active]:bg-green-600/30 data-[state=active]:text-green-300 text-gray-300 font-semibold"
            >
              🎵 PLAYING ({playingRequests.length})
            </TabsTrigger>
            <TabsTrigger
              value="completed"
              className="data-[state=active]:bg-purple-600/30 data-[state=active]:text-purple-300 text-gray-300 font-semibold"
            >
              ✅ COMPLETED ({completedRequests.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            <Card className="bg-black/40 backdrop-blur-lg border-yellow-500/30 shadow-lg shadow-yellow-500/10">
              <CardHeader>
                <CardTitle className="text-yellow-300 flex items-center gap-2">
                  <Radio className="w-5 h-5" />
                  PENDING REQUESTS
                </CardTitle>
                <CardDescription className="text-gray-300">
                  🎧 Your queue is ready! Use the arrows to reorder and keep the energy flowing.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pendingRequests.length === 0 ? (
                  <div className="text-center text-gray-400 py-12">
                    <Music className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-xl">No pending requests</p>
                    <p className="text-sm">The dance floor is waiting for the next banger!</p>
                  </div>
                ) : (
                  pendingRequests.map((request) => <RequestCard key={request.id} request={request} />)
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="playing" className="mt-6">
            <Card className="bg-black/40 backdrop-blur-lg border-green-500/30 shadow-lg shadow-green-500/10">
              <CardHeader>
                <CardTitle className="text-green-300 flex items-center gap-2">
                  <div className="relative">
                    <Disc3 className="w-5 h-5 animate-spin" />
                    <div className="absolute inset-0 bg-green-400 rounded-full blur-md opacity-50 animate-pulse"></div>
                  </div>
                  NOW PLAYING
                </CardTitle>
                <CardDescription className="text-gray-300">
                  🔊 These tracks are currently pumping through the speakers!
                </CardDescription>
              </CardHeader>
              <CardContent>
                {playingRequests.length === 0 ? (
                  <div className="text-center text-gray-400 py-12">
                    <Radio className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-xl">No songs currently playing</p>
                    <p className="text-sm">Time to drop the next track!</p>
                  </div>
                ) : (
                  playingRequests.map((request) => <RequestCard key={request.id} request={request} />)
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="mt-6">
            <Card className="bg-black/40 backdrop-blur-lg border-purple-500/30 shadow-lg shadow-purple-500/10">
              <CardHeader>
                <CardTitle className="text-purple-300 flex items-center gap-2">
                  <Check className="w-5 h-5" />
                  COMPLETED REQUESTS
                </CardTitle>
                <CardDescription className="text-gray-300">
                  🎉 These bangers have already rocked the crowd!
                </CardDescription>
              </CardHeader>
              <CardContent>
                {completedRequests.length === 0 ? (
                  <div className="text-center text-gray-400 py-12">
                    <Check className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-xl">No completed requests</p>
                    <p className="text-sm">Start playing some tracks to build your history!</p>
                  </div>
                ) : (
                  completedRequests.map((request) => <RequestCard key={request.id} request={request} />)
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
