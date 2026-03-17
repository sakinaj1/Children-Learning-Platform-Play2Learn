import { useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Home, Lock } from "lucide-react";
import { motion } from "motion/react";
import { ImageWithFallback } from "../components/figma/ImageWithFallback";

/**
 * GamesScreen - Collection of educational games
 * 
 * HCI Principles Applied:
 * 1. Categorization - Games organized by subject/skill
 * 2. Visual Cues - Icons, colors, and badges for difficulty
 * 3. Progressive Disclosure - Lock advanced games until ready
 * 4. Affordance - Clear playable vs locked states
 * 5. Feedback - Visual indicators for progress
 * 6. Age-appropriate content - Different games for different ages
 */
export function GamesScreen() {
  const navigate = useNavigate();

  const games = [
    {
      id: "alphabet",
      title: "Alphabet Adventure",
      description: "Learn your ABCs with fun!",
      difficulty: "Easy",
      emoji: "🔤",
      color: "from-blue-400 to-cyan-500",
      locked: false,
      stars: 3,
      category: "Language",
      path: "/games/alphabet",
    },
    {
      id: "numbers",
      title: "Number Ninja",
      description: "Master counting 1-10",
      difficulty: "Easy",
      emoji: "🔢",
      color: "from-green-400 to-emerald-500",
      locked: false,
      stars: 2,
      category: "Math",
      path: "/games/numbers",
    },
    {
      id: "shapes",
      title: "Shape Sorter",
      description: "Match the shapes!",
      difficulty: "Easy",
      emoji: "⭐",
      color: "from-purple-400 to-pink-500",
      locked: false,
      stars: 3,
      category: "Logic",
      path: "/games/shapes",
    },
    {
      id: "colors",
      title: "Color Splash",
      description: "Learn colors through play",
      difficulty: "Easy",
      emoji: "🌈",
      color: "from-red-400 to-orange-500",
      locked: false,
      stars: 1,
      category: "Art",
      path: "/games/colors",
    },
    {
      id: "memory",
      title: "Memory Match",
      description: "Find the pairs!",
      difficulty: "Medium",
      emoji: "🧠",
      color: "from-yellow-400 to-amber-500",
      locked: false,
      stars: 0,
      category: "Memory",
      path: "/games/memory",
    },
    {
      id: "math",
      title: "Math Master",
      description: "Addition & Subtraction",
      difficulty: "Medium",
      emoji: "➕",
      color: "from-indigo-400 to-blue-500",
      locked: false,
      stars: 0,
      category: "Math",
      path: "/games/math",
    },
    {
      id: "spelling",
      title: "Spelling Bee",
      description: "Build words letter by letter",
      difficulty: "Hard",
      emoji: "🐝",
      color: "from-teal-400 to-cyan-500",
      locked: true,
      stars: 0,
      category: "Language",
      path: "/games/alphabet",
    },
    {
      id: "puzzle",
      title: "Puzzle Master",
      description: "Solve fun puzzles!",
      difficulty: "Medium",
      emoji: "🧩",
      color: "from-rose-400 to-pink-500",
      locked: true,
      stars: 0,
      category: "Logic",
      path: "/games/memory",
    },
  ];

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500";
      case "Medium":
        return "bg-yellow-500";
      case "Hard":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-orange-200 via-yellow-200 to-pink-200 p-4 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <h1 className="text-4xl font-bold text-orange-700 mb-1">
              🎮 Learning Games 🎮
            </h1>
            <p className="text-lg text-orange-600">
              Choose a game and start learning!
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

        {/* Featured Game Banner */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4 mb-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-2xl overflow-hidden relative">
            <div className="relative z-10">
              <Badge className="bg-yellow-400 text-yellow-900 text-sm px-3 py-1 mb-2">
                ⭐ Featured Game
              </Badge>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h2 className="text-2xl font-bold mb-2">
                    🔤 Alphabet Adventure
                  </h2>
                  <p className="text-sm mb-3">
                    Join our friendly characters on an exciting journey through
                    the alphabet!
                  </p>
                  <Button
                    onClick={() => navigate("/games/alphabet")}
                    className="bg-white text-purple-600 hover:bg-gray-100 text-base px-6 py-3"
                  >
                    Play Now! →
                  </Button>
                </div>
                <div className="flex items-center justify-center">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1628605007510-696cd5731961?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxraWRzJTIwcGxheWluZyUyMGdhbWVzJTIwdGFibGV0fGVufDF8fHx8MTc3MzM4OTY3NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Kids playing games"
                    className="w-full h-32 object-cover rounded-xl shadow-xl"
                  />
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Games Grid */}
        <div className="grid grid-cols-4 gap-3 flex-1 overflow-y-auto">
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.05 * index }}
            >
              <Card
                className={`overflow-hidden cursor-pointer transition-all ${
                  game.locked
                    ? "opacity-60"
                    : "hover:scale-105 hover:shadow-2xl"
                }`}
                onClick={() => {
                  if (!game.locked) {
                    navigate(game.path);
                  }
                }}
              >
                <div className={`bg-gradient-to-br ${game.color} p-3 relative`}>
                  {game.locked && (
                    <div className="absolute top-2 right-2 bg-white/90 rounded-full p-1">
                      <Lock className="w-4 h-4 text-gray-600" />
                    </div>
                  )}
                  <div className="text-4xl mb-2 text-center">{game.emoji}</div>
                  <div className="flex justify-center gap-1 mb-1">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-4 h-4 rounded-full ${
                          i < game.stars
                            ? "bg-yellow-400"
                            : "bg-white/30"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="p-2 bg-white">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="text-sm font-bold text-gray-800">
                      {game.title}
                    </h3>
                    <Badge className={`text-xs ${getDifficultyColor(game.difficulty)}`}>
                      {game.difficulty}
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">{game.description}</p>
                  <Badge variant="outline" className="text-xs">
                    {game.category}
                  </Badge>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}