import { useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Gamepad2,
  Video,
  Palette,
  Trophy,
  User,
  Star,
  Clock,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

/**
 * DashboardScreen - Main hub for navigation
 * 
 * HCI Principles Applied:
 * 1. Information Architecture - Clear categorization of activities
 * 2. Visual Hierarchy - Important actions are prominent
 * 3. Recognition over Recall - Icons and labels for easy identification
 * 4. Consistency - Uniform card design
 * 5. Accessibility - Large touch targets for children
 * 6. Feedback - Hover effects and animations
 * 7. Personalization - Shows child's name and progress
 */
export function DashboardScreen() {
  const navigate = useNavigate();
  const [childName, setChildName] = useState("Explorer");
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const profile = localStorage.getItem("childProfile");
    if (profile) {
      const data = JSON.parse(profile);
      setChildName(data.childName || "Explorer");
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const activities = [
    {
      title: "Fun Games",
      description: "Learn through play!",
      icon: Gamepad2,
      color: "from-blue-400 to-blue-600",
      emoji: "🎮",
      path: "/games",
    },
    {
      title: "Watch & Learn",
      description: "Educational videos",
      icon: Video,
      color: "from-red-400 to-pink-600",
      emoji: "📺",
      path: "/videos",
    },
    {
      title: "Draw & Create",
      description: "Express yourself!",
      icon: Palette,
      color: "from-purple-400 to-purple-600",
      emoji: "🎨",
      path: "/drawing",
    },
    {
      title: "My Rewards",
      description: "See your achievements",
      icon: Trophy,
      color: "from-yellow-400 to-orange-600",
      emoji: "🏆",
      path: "/rewards",
    },
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-cyan-200 via-blue-200 to-purple-200 p-4 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <motion.h1
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="text-4xl font-bold text-purple-700 mb-1"
            >
              {getGreeting()}, {childName}! 👋
            </motion.h1>
            <p className="text-lg text-purple-600">
              Ready for some fun learning?
            </p>
          </div>
          <Button
            onClick={() => navigate("/profile")}
            variant="outline"
            className="bg-white/80 p-4 rounded-full"
          >
            <User className="w-6 h-6 text-purple-600" />
          </Button>
        </div>

        {/* Daily Progress Card */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-4 mb-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-xl">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold mb-1">
                  Today's Learning Streak 🔥
                </h3>
                <p className="text-sm">Keep up the great work!</p>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold">7</div>
                <div className="text-sm">Days</div>
              </div>
              <div className="flex gap-1">
                {[...Array(7)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-6 h-6 fill-yellow-300 text-yellow-300"
                  />
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Activity Cards */}
        <div className="grid grid-cols-2 gap-3 mb-3 flex-1">
          {activities.map((activity, index) => (
            <motion.div
              key={activity.path}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 * (index + 3) }}
              className="h-full"
            >
              <Card
                className="p-4 cursor-pointer hover:scale-105 transition-transform shadow-xl h-full flex flex-col"
                onClick={() => navigate(activity.path)}
              >
                <div
                  className={`bg-gradient-to-br ${activity.color} text-white rounded-xl p-4 flex-1 flex flex-col`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-5xl">{activity.emoji}</div>
                    <activity.icon className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{activity.title}</h3>
                  <p className="text-sm opacity-90 mb-3">{activity.description}</p>
                  <div className="mt-auto">
                    <Button
                      variant="secondary"
                      className="w-full text-base py-3 bg-white/20 hover:bg-white/30 text-white border-2 border-white/50"
                    >
                      Let's Go! →
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="p-3 bg-white/80 shadow-xl">
            <h3 className="text-lg font-bold text-gray-800 mb-2">
              Today's Activity
            </h3>
            <div className="grid grid-cols-3 gap-2">
              <div className="text-center p-2 bg-blue-100 rounded-lg">
                <Clock className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                <div className="text-2xl font-bold text-blue-600">25</div>
                <div className="text-xs text-gray-600">Minutes</div>
              </div>
              <div className="text-center p-2 bg-green-100 rounded-lg">
                <Star className="w-6 h-6 text-green-600 mx-auto mb-1" />
                <div className="text-2xl font-bold text-green-600">12</div>
                <div className="text-xs text-gray-600">Stars Earned</div>
              </div>
              <div className="text-center p-2 bg-purple-100 rounded-lg">
                <Trophy className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                <div className="text-2xl font-bold text-purple-600">3</div>
                <div className="text-xs text-gray-600">Tasks Done</div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Floating Character */}
        <motion.div
          className="fixed bottom-4 right-4 text-6xl cursor-pointer"
          animate={{
            y: [0, -15, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          onClick={() => {
            alert("Hi! I'm your learning buddy! 🎉");
          }}
        >
          🦊
        </motion.div>
      </div>
    </div>
  );
}