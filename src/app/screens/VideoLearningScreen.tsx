import { useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import { Home, Play, Clock, CheckCircle2 } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

export function VideoLearningScreen() {
  const navigate = useNavigate();
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null);

  const videoCategories = [
    { id: "alphabet", label: "ABC", emoji: "🔤" },
    { id: "numbers", label: "123", emoji: "🔢" },
    { id: "science", label: "Science", emoji: "🔬" },
  ];

  const videos = {
    alphabet: [
      {
        id: "abc-song",
        title: "ABC Song & Phonics",
        duration: "5:30",
        completed: true,
        thumbnail: "https://images.unsplash.com/photo-1676552053124-e8dbd747a468?w=400",
      },
      {
        id: "letter-sounds",
        title: "Letter Sounds for Kids",
        duration: "8:15",
        completed: false,
        thumbnail: "https://images.unsplash.com/photo-1676552053124-e8dbd747a468?w=400",
      },
    ],
    numbers: [
      {
        id: "count-1-10",
        title: "Counting 1 to 10",
        duration: "6:45",
        completed: false,
        thumbnail: "https://images.unsplash.com/photo-1676552053124-e8dbd747a468?w=400",
      },
      {
        id: "number-song",
        title: "Number Song & Dance",
        duration: "4:30",
        completed: false,
        thumbnail: "https://images.unsplash.com/photo-1676552053124-e8dbd747a468?w=400",
      },
    ],
    science: [
      {
        id: "water-cycle",
        title: "The Water Cycle",
        duration: "9:10",
        completed: false,
        thumbnail: "https://images.unsplash.com/photo-1676552053124-e8dbd747a468?w=400",
      },
      {
        id: "solar-system",
        title: "Planets in Solar System",
        duration: "11:30",
        completed: false,
        thumbnail: "https://images.unsplash.com/photo-1676552053124-e8dbd747a468?w=400",
      },
    ],
  };

  return (
    <div className="h-screen bg-gradient-to-br from-red-200 via-pink-200 to-purple-200 p-4 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <h1 className="text-4xl font-bold text-red-700 mb-1">
              📺 Watch & Learn 📺
            </h1>
            <p className="text-lg text-red-600">
              Fun educational videos!
            </p>
          </motion.div>
          <Button
            onClick={() => navigate("/dashboard")}
            variant="outline"
            className="bg-white/80 px-4 py-4 text-lg"
          >
            <Home className="w-5 h-5 mr-1" />
            Home
          </Button>
        </div>

        {/* Stats Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-3 mb-3 bg-gradient-to-r from-purple-400 to-pink-400 text-white">
            <div className="flex items-center justify-around">
              <div className="text-center">
                <div className="text-4xl font-bold">15</div>
                <div className="text-sm">Videos Watched</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold">2h 30m</div>
                <div className="text-sm">Learning Time</div>
              </div>
              <div className="text-center">
                <div className="text-4xl">🏆</div>
                <div className="text-sm">Video Master!</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Video Categories */}
        <Tabs defaultValue="alphabet" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="grid w-full grid-cols-3 mb-3">
            {videoCategories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="text-base py-2"
              >
                <span className="text-2xl mr-1">{category.emoji}</span>
                {category.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.entries(videos).map(([category, categoryVideos]) => (
            <TabsContent key={category} value={category} className="flex-1 overflow-y-auto">
              <div className="grid grid-cols-2 gap-3">
                {categoryVideos.map((video, index) => (
                  <motion.div
                    key={video.id}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <Card className="overflow-hidden hover:scale-105 transition-transform cursor-pointer shadow-xl">
                      <div className="relative">
                        <ImageWithFallback
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-32 object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Button
                            onClick={() => setSelectedVideo(video.id)}
                            className="bg-white/90 hover:bg-white text-red-600 rounded-full w-16 h-16 p-0"
                          >
                            <Play className="w-8 h-8 fill-red-600" />
                          </Button>
                        </div>
                        {video.completed && (
                          <div className="absolute top-2 right-2 bg-green-500 text-white rounded-full px-2 py-1 flex items-center gap-1 text-xs">
                            <CheckCircle2 className="w-3 h-3" />
                            Done!
                          </div>
                        )}
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white rounded px-2 py-1 flex items-center gap-1 text-xs">
                          <Clock className="w-3 h-3" />
                          {video.duration}
                        </div>
                      </div>
                      <div className="p-3 bg-white">
                        <h3 className="text-base font-bold text-gray-800 mb-2">
                          {video.title}
                        </h3>
                        <Button
                          onClick={() => setSelectedVideo(video.id)}
                          className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white text-sm"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Watch Now
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Video Player Modal */}
        {selectedVideo && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedVideo(null)}
          >
            <Card className="w-full max-w-2xl" onClick={(e) => e.stopPropagation()}>
              <div className="p-6">
                <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg aspect-video flex items-center justify-center mb-3">
                  <div className="text-center text-white">
                    <Play className="w-16 h-16 mx-auto mb-2" />
                    <p className="text-xl">Video Player</p>
                  </div>
                </div>
                <Button
                  onClick={() => setSelectedVideo(null)}
                  className="w-full bg-red-500 hover:bg-red-600 text-white text-lg py-4"
                >
                  Close
                </Button>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
