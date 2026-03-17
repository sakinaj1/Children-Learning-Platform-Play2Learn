import { useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import { Home, Trophy, Star, Crown } from "lucide-react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";

export function RewardsScreen() {
  const navigate = useNavigate();
  const [currentLevel] = useState(5);
  const [currentXP] = useState(285);
  const [nextLevelXP] = useState(350);

  const badges = [
    { id: 1, name: "Alphabet Master", icon: "🔤", earned: true, color: "from-blue-400 to-blue-600" },
    { id: 2, name: "Number Ninja", icon: "🔢", earned: true, color: "from-green-400 to-green-600" },
    { id: 3, name: "Creative Artist", icon: "🎨", earned: true, color: "from-purple-400 to-purple-600" },
    { id: 4, name: "Video Scholar", icon: "📺", earned: true, color: "from-red-400 to-red-600" },
    { id: 5, name: "7-Day Streak", icon: "🔥", earned: true, color: "from-orange-400 to-orange-600" },
    { id: 6, name: "Shape Expert", icon: "⭐", earned: true, color: "from-yellow-400 to-yellow-600" },
    { id: 7, name: "Memory Master", icon: "🧠", earned: false, color: "from-pink-400 to-pink-600" },
    { id: 8, name: "Math Wizard", icon: "➕", earned: false, color: "from-indigo-400 to-indigo-600" },
  ];

  const rewards = [
    { id: 1, title: "Unicorn", cost: 100, icon: "🦄", unlocked: true },
    { id: 2, title: "Superhero", cost: 150, icon: "🦸", unlocked: true },
    { id: 3, title: "Magic Wand", cost: 200, icon: "🪄", unlocked: true },
    { id: 4, title: "Dragon", cost: 250, icon: "🐉", unlocked: false },
    { id: 5, title: "Crown", cost: 300, icon: "👑", unlocked: false },
    { id: 6, title: "Rocket", cost: 350, icon: "🚀", unlocked: false },
  ];

  const earnedBadges = badges.filter((b) => b.earned);
  const lockedBadges = badges.filter((b) => !b.earned);
  const levelProgress = (currentXP / nextLevelXP) * 100;

  const celebrateClick = () => {
    confetti({ particleCount: 150, spread: 100, origin: { y: 0.6 } });
  };

  return (
    <div className="h-screen bg-gradient-to-br from-yellow-200 via-orange-200 to-pink-200 p-4 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <h1 className="text-4xl font-bold text-orange-700 mb-1">
              🏆 My Rewards 🏆
            </h1>
            <p className="text-lg text-orange-600">
              Look at all you've earned!
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

        {/* Level & Progress */}
        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
          <Card className="p-4 mb-3 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-2xl">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <Crown className="w-12 h-12 mx-auto mb-2" />
                <div className="text-5xl font-bold mb-1">{currentLevel}</div>
                <div className="text-base">Level</div>
              </div>
              <div className="col-span-2 flex flex-col justify-center">
                <div className="flex justify-between mb-1">
                  <span className="text-base font-bold">Progress to Level 6</span>
                  <span className="text-base font-bold">{currentXP} / {nextLevelXP} XP</span>
                </div>
                <Progress value={levelProgress} className="h-6 mb-2" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-2 gap-3 flex-1 overflow-y-auto">
          {/* Earned Badges */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Trophy className="w-6 h-6" />
              My Achievements ({earnedBadges.length})
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {earnedBadges.map((badge, index) => (
                <motion.div
                  key={badge.id}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.05 * index }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="overflow-hidden cursor-pointer shadow-xl" onClick={celebrateClick}>
                    <div className={`bg-gradient-to-br ${badge.color} p-3 text-white`}>
                      <div className="text-4xl text-center mb-1">{badge.icon}</div>
                      <div className="flex justify-center gap-1">
                        {[...Array(3)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-yellow-300 text-yellow-300" />
                        ))}
                      </div>
                    </div>
                    <div className="p-2 bg-white">
                      <h3 className="text-xs font-bold text-gray-800 text-center">{badge.name}</h3>
                      <Badge className="w-full mt-1 bg-green-500 text-white text-xs justify-center">✓ Earned</Badge>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-3 mb-2">
              Next Challenges ({lockedBadges.length})
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {lockedBadges.map((badge) => (
                <Card key={badge.id} className="overflow-hidden opacity-70">
                  <div className={`bg-gradient-to-br ${badge.color} p-3 text-white relative`}>
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <div className="text-3xl">🔒</div>
                    </div>
                    <div className="text-4xl text-center opacity-50">{badge.icon}</div>
                  </div>
                  <div className="p-2 bg-gray-50">
                    <h3 className="text-xs font-bold text-gray-800 text-center">{badge.name}</h3>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Rewards Shop */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2 flex items-center gap-2">
              <Star className="w-6 h-6" />
              Rewards Shop (Stars: {currentXP})
            </h2>
            <div className="grid grid-cols-3 gap-2">
              {rewards.map((reward, index) => (
                <motion.div key={reward.id} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.05 * index }}>
                  <Card className={`p-3 text-center ${reward.unlocked ? "bg-green-100 border-2 border-green-400" : "bg-gray-100"}`}>
                    <div className="text-4xl mb-1">{reward.icon}</div>
                    <div className="text-xs font-bold text-gray-800 mb-1">{reward.title}</div>
                    <div className="flex items-center justify-center gap-1">
                      <Star className="w-3 h-3 text-yellow-600 fill-yellow-600" />
                      <span className="text-xs font-bold">{reward.cost}</span>
                    </div>
                    {reward.unlocked && (
                      <Badge className="mt-1 bg-green-500 text-white text-xs">Unlocked!</Badge>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Encouragement */}
            <Card className="p-4 mt-3 bg-gradient-to-r from-blue-400 to-purple-400 text-white text-center shadow-xl">
              <div className="text-4xl mb-2">🌟</div>
              <h3 className="text-2xl font-bold mb-2">You're Amazing!</h3>
              <p className="text-base">Keep learning to unlock more rewards!</p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
