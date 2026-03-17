import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Star, Sun, Sparkles } from "lucide-react";
import { motion } from "motion/react";

/**
 * WelcomeScreen - Login page with email and password
 * 
 * HCI Principles Applied:
 * 1. Clear Form Design - Simple login form
 * 2. Visual Hierarchy - Important elements are larger and centered
 * 3. Friendly Design - Cartoon characters and bright colors
 * 4. User Feedback - Clear labels and placeholders
 */
export function WelcomeScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp) {
      // Sign up flow - go to questionnaire
      localStorage.setItem("userEmail", email);
      navigate("/questionnaire");
    } else {
      // Login flow - check if profile exists
      const profile = localStorage.getItem("childProfile");
      if (profile) {
        navigate("/dashboard");
      } else {
        alert("No profile found! Please sign up first.");
        setIsSignUp(true);
      }
    }
  };

  const floatingStars = [
    { x: 10, y: 20, delay: 0 },
    { x: 80, y: 15, delay: 0.5 },
    { x: 15, y: 70, delay: 1 },
    { x: 85, y: 75, delay: 1.5 },
    { x: 50, y: 10, delay: 2 },
  ];

  return (
    <div className="h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-yellow-300 relative overflow-hidden">
      {/* Animated background elements */}
      {floatingStars.map((star, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{ left: `${star.x}%`, top: `${star.y}%` }}
          animate={{
            y: [0, -20, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 3,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Star className="w-6 h-6 text-yellow-200 fill-yellow-200" />
        </motion.div>
      ))}

      <div className="relative z-10 flex flex-col items-center justify-center h-screen p-6">
        {/* Sun character */}
        <motion.div
          animate={{
            rotate: [0, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mb-4"
        >
          <div className="relative">
            <Sun className="w-20 h-20 text-yellow-400 fill-yellow-400" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl">😊</span>
            </div>
          </div>
        </motion.div>

        {/* Title */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-6"
        >
          <h1 className="text-5xl font-bold text-white mb-2 drop-shadow-lg">
            🌈 Play2Learn 🌈
          </h1>
          <p className="text-xl text-white drop-shadow-md">
            Let's Learn, Play, and Grow Together!
          </p>
        </motion.div>

        {/* Login Form */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="p-8 bg-white/95 backdrop-blur shadow-2xl">
            <div className="flex justify-center gap-4 mb-6">
              <Button
                type="button"
                onClick={() => setIsSignUp(false)}
                className={`px-6 py-2 ${
                  !isSignUp
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Login
              </Button>
              <Button
                type="button"
                onClick={() => setIsSignUp(true)}
                className={`px-6 py-2 ${
                  isSignUp
                    ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Sign Up
              </Button>
            </div>

            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
              {isSignUp ? "Create New Account" : "Welcome Back!"}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email" className="text-base font-bold text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="parent@example.com"
                  required
                  className="mt-2 p-3 text-base border-2 border-purple-300 focus:border-purple-500"
                />
              </div>

              <div>
                <Label htmlFor="password" className="text-base font-bold text-gray-700">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="mt-2 p-3 text-base border-2 border-purple-300 focus:border-purple-500"
                />
              </div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-lg px-8 py-6 rounded-xl shadow-xl"
                >
                  {isSignUp ? (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Sign Up & Continue
                    </>
                  ) : (
                    <>
                      Login
                    </>
                  )}
                </Button>
              </motion.div>
            </form>

            <p className="text-center text-sm text-gray-600 mt-4">
              {isSignUp ? (
                <>Already have an account? Click Login above</>
              ) : (
                <>New user? Click Sign Up above</>
              )}
            </p>
          </Card>
        </motion.div>

        {/* Cartoon characters */}
        <div className="flex gap-6 mt-6">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-4xl"
          >
            🦁
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, delay: 0.3, repeat: Infinity }}
            className="text-4xl"
          >
            🐘
          </motion.div>
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 1.5, delay: 0.6, repeat: Infinity }}
            className="text-4xl"
          >
            🦒
          </motion.div>
        </div>
      </div>
    </div>
  );
}