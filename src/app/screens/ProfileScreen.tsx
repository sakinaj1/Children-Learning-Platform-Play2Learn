import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Label } from "../components/ui/label";
import { Switch } from "../components/ui/switch";
import { Slider } from "../components/ui/slider";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { Home, User, Settings, Volume2, Palette, Lock, LogOut, Edit } from "lucide-react";
import { motion } from "motion/react";

export function ProfileScreen() {
  const navigate = useNavigate();
  const [childName, setChildName] = useState("Explorer");
  const [ageGroup, setAgeGroup] = useState("6-8");
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [volume, setVolume] = useState([70]);
  const [selectedAvatar, setSelectedAvatar] = useState("🦁");

  useEffect(() => {
    const profile = localStorage.getItem("childProfile");
    if (profile) {
      const data = JSON.parse(profile);
      setChildName(data.childName || "Explorer");
      setAgeGroup(data.ageGroup || "6-8");
    }
  }, []);

  const avatars = ["🦁", "🐘", "🦒", "🦊", "🐻", "🐼", "🐨", "🐯", "🦝", "🦓", "🦄", "🐶"];

  const themes = [
    { name: "Rainbow", colors: "from-red-400 via-yellow-400 to-green-400" },
    { name: "Ocean", colors: "from-blue-400 via-cyan-400 to-teal-400" },
    { name: "Sunset", colors: "from-orange-400 via-pink-400 to-purple-400" },
    { name: "Forest", colors: "from-green-400 via-emerald-400 to-lime-400" },
  ];

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("childProfile");
      navigate("/");
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 p-4 overflow-hidden">
      <div className="max-w-6xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <h1 className="text-4xl font-bold text-purple-700 mb-1">
              👤 My Profile
            </h1>
            <p className="text-lg text-purple-600">
              Customize your experience
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

        <div className="grid grid-cols-4 gap-3 flex-1 overflow-y-auto">
          {/* Profile Card */}
          <div className="col-span-1">
            <Card className="p-4">
              <div className="text-center mb-4">
                <Avatar className="w-24 h-24 bg-gradient-to-br from-purple-400 to-pink-400 text-white text-5xl flex items-center justify-center mx-auto mb-2">
                  <AvatarFallback className="bg-transparent text-5xl">{selectedAvatar}</AvatarFallback>
                </Avatar>
                <h2 className="text-2xl font-bold text-gray-800 mb-1">{childName}</h2>
                <p className="text-sm text-gray-600">Age: {ageGroup} years</p>
              </div>

              {/* Stats */}
              <div className="space-y-2">
                <div className="bg-blue-100 p-3 rounded-lg">
                  <div className="text-xs text-gray-600">Level</div>
                  <div className="text-2xl font-bold text-blue-600">5</div>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <div className="text-xs text-gray-600">Total Stars</div>
                  <div className="text-2xl font-bold text-green-600">285</div>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <div className="text-xs text-gray-600">Days Active</div>
                  <div className="text-2xl font-bold text-purple-600">14</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Settings */}
          <div className="col-span-3 space-y-3">
            {/* Avatar Selection */}
            <Card className="p-4">
              <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                <User className="w-5 h-5" />
                Choose Avatar
              </h3>
              <div className="grid grid-cols-6 gap-2">
                {avatars.map((avatar) => (
                  <button
                    key={avatar}
                    onClick={() => setSelectedAvatar(avatar)}
                    className={`text-4xl p-3 rounded-lg transition-all ${
                      selectedAvatar === avatar
                        ? "bg-purple-200 scale-110 border-2 border-purple-500"
                        : "bg-gray-100 hover:bg-gray-200"
                    }`}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-2 gap-3">
              {/* Theme Selection */}
              <Card className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Theme
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {themes.map((theme) => (
                    <button
                      key={theme.name}
                      className={`bg-gradient-to-r ${theme.colors} p-4 rounded-lg text-white font-bold text-sm hover:scale-105 transition-transform`}
                    >
                      {theme.name}
                    </button>
                  ))}
                </div>
              </Card>

              {/* Sound Settings */}
              <Card className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Volume2 className="w-5 h-5" />
                  Sound
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sound" className="text-base">Effects</Label>
                    <Switch id="sound" checked={soundEnabled} onCheckedChange={setSoundEnabled} />
                  </div>
                  <div>
                    <Label htmlFor="volume" className="text-base mb-2 block">Volume: {volume[0]}%</Label>
                    <Slider id="volume" value={volume} onValueChange={setVolume} max={100} disabled={!soundEnabled} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="hints" className="text-base">Show Hints</Label>
                    <Switch id="hints" defaultChecked />
                  </div>
                </div>
              </Card>
            </div>

            {/* Parental Controls & Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Card className="p-4 bg-yellow-50 border-2 border-yellow-300">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Lock className="w-5 h-5 text-yellow-600" />
                  Parental Controls
                </h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full justify-start text-base py-3"
                    onClick={() => navigate("/progress")}
                  >
                    📊 View Progress
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-base py-3">
                    ⏰ Set Time Limits
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-base py-3">
                    🔒 Restrictions
                  </Button>
                </div>
              </Card>

              <Card className="p-4">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Settings className="w-5 h-5" />
                  Account
                </h3>
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    className="w-full text-base py-3 border-2"
                    onClick={() => navigate("/questionnaire")}
                  >
                    <Edit className="w-5 h-5 mr-2" />
                    Edit Profile
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-base py-3 border-2 border-red-300 text-red-600 hover:bg-red-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="w-5 h-5 mr-2" />
                    Logout
                  </Button>
                </div>
              </Card>
            </div>
          </div>
        </div>

        {/* Fun Character */}
        <motion.div
          className="fixed bottom-4 right-4 text-6xl"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          ⚙️
        </motion.div>
      </div>
    </div>
  );
}
