import { useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Progress } from "../components/ui/progress";
import { Home, TrendingUp, Clock, Target, Award, Calendar } from "lucide-react";
import { motion } from "motion/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function ProgressReportScreen() {
  const navigate = useNavigate();

  const weeklyData = [
    { day: "Mon", minutes: 35, stars: 12 },
    { day: "Tue", minutes: 42, stars: 15 },
    { day: "Wed", minutes: 28, stars: 9 },
    { day: "Thu", minutes: 45, stars: 18 },
    { day: "Fri", minutes: 38, stars: 14 },
    { day: "Sat", minutes: 50, stars: 21 },
    { day: "Sun", minutes: 40, stars: 16 },
  ];

  const skillsData = [
    { skill: "Alphabet", progress: 85 },
    { skill: "Numbers", progress: 70 },
    { skill: "Shapes", progress: 90 },
    { skill: "Colors", progress: 95 },
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-slate-100 to-blue-100 p-4 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <h1 className="text-4xl font-bold text-slate-800 mb-1">
              📊 Progress Report
            </h1>
            <p className="text-lg text-slate-600">
              Track your child's learning journey
            </p>
          </motion.div>
          <Button
            onClick={() => navigate("/dashboard")}
            variant="outline"
            className="bg-white px-4 py-4 text-lg"
          >
            <Home className="w-5 h-5 mr-1" />
            Back
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-4 gap-3 mb-3">
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
            <Card className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Time</p>
                  <p className="text-3xl font-bold">12.5h</p>
                </div>
                <Clock className="w-10 h-10 opacity-80" />
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
            <Card className="p-3 bg-gradient-to-br from-green-500 to-green-600 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Activities</p>
                  <p className="text-3xl font-bold">91</p>
                </div>
                <Target className="w-10 h-10 opacity-80" />
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3 }}>
            <Card className="p-3 bg-gradient-to-br from-yellow-500 to-orange-500 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Stars</p>
                  <p className="text-3xl font-bold">285</p>
                </div>
                <Award className="w-10 h-10 opacity-80" />
              </div>
            </Card>
          </motion.div>

          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
            <Card className="p-3 bg-gradient-to-br from-purple-500 to-pink-500 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-90">Streak</p>
                  <p className="text-3xl font-bold">14</p>
                </div>
                <Calendar className="w-10 h-10 opacity-80" />
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-2 gap-3 flex-1">
          <Card className="p-4">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Weekly Activity
            </h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="minutes" fill="#3B82F6" />
                <Bar dataKey="stars" fill="#F59E0B" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-4">
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Skill Progress
            </h3>
            <div className="space-y-4">
              {skillsData.map((skill, index) => (
                <motion.div
                  key={skill.skill}
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.1 * index }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-20 text-sm font-bold text-gray-700">
                      {skill.skill}
                    </div>
                    <Progress value={skill.progress} className="flex-1 h-6" />
                    <div className="w-12 text-right font-bold text-gray-800">
                      {skill.progress}%
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <div className="mt-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Recent Achievements
              </h3>
              <div className="space-y-2">
                {[
                  { title: "Alphabet Master", icon: "🏆" },
                  { title: "7-Day Streak", icon: "🔥" },
                  { title: "Creative Artist", icon: "🎨" },
                ].map((achievement, index) => (
                  <div
                    key={index}
                    className="bg-yellow-100 p-2 rounded-lg flex items-center gap-3"
                  >
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="text-sm font-bold text-gray-800">
                      {achievement.title}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
