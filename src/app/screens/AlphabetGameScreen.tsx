import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Home, Volume2, Star, Trophy } from "lucide-react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";

/**
 * AlphabetGameScreen - Interactive alphabet learning game
 * 
 * HCI Principles Applied:
 * 1. Immediate Feedback - Visual and audio responses to actions
 * 2. Error Prevention - No wrong answers, only learning opportunities
 * 3. Positive Reinforcement - Celebrations and encouragement
 * 4. Progressive Learning - One letter at a time
 * 5. Multimodal Learning - Visual, auditory, and interactive
 * 6. Gamification - Points, progress, and rewards
 * 7. User Control - Can replay sounds and navigate freely
 */
export function AlphabetGameScreen() {
  const navigate = useNavigate();
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const alphabetData = [
    { letter: "A", word: "Apple", emoji: "🍎", color: "from-red-400 to-red-600" },
    { letter: "B", word: "Ball", emoji: "⚽", color: "from-blue-400 to-blue-600" },
    { letter: "C", word: "Cat", emoji: "🐱", color: "from-orange-400 to-orange-600" },
    { letter: "D", word: "Dog", emoji: "🐕", color: "from-yellow-400 to-yellow-600" },
    { letter: "E", word: "Elephant", emoji: "🐘", color: "from-gray-400 to-gray-600" },
    { letter: "F", word: "Fish", emoji: "🐠", color: "from-cyan-400 to-cyan-600" },
    { letter: "G", word: "Grapes", emoji: "🍇", color: "from-purple-400 to-purple-600" },
    { letter: "H", word: "House", emoji: "🏠", color: "from-green-400 to-green-600" },
  ];

  const currentLetter = alphabetData[currentLetterIndex];
  const progress = ((currentLetterIndex + 1) / alphabetData.length) * 100;

  const playSound = (text: string) => {
    // Use Web Speech API for text-to-speech
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleLetterClick = () => {
    playSound(`${currentLetter.letter} for ${currentLetter.word}`);
    setScore(score + 10);
    setShowCelebration(true);

    // Confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });

    setTimeout(() => {
      setShowCelebration(false);
      if (currentLetterIndex < alphabetData.length - 1) {
        setCurrentLetterIndex(currentLetterIndex + 1);
      } else {
        // Game completed
        confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.5 },
        });
        setTimeout(() => {
          navigate("/rewards");
        }, 2000);
      }
    }, 2000);
  };

  useEffect(() => {
    // Auto-play sound when letter changes
    playSound(`Letter ${currentLetter.letter}`);
  }, [currentLetterIndex]);

  return (
    <div className="h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300 p-4 overflow-hidden">
      <div className="max-w-5xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <div>
            <h1 className="text-3xl font-bold text-purple-700">
              🔤 Alphabet Adventure
            </h1>
          </div>
          <div className="flex gap-3">
            <Card className="px-4 py-2 bg-yellow-400 border-4 border-yellow-600">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-600 text-yellow-600" />
                <span className="text-xl font-bold text-yellow-900">{score}</span>
              </div>
            </Card>
            <Button
              onClick={() => navigate("/games")}
              variant="outline"
              className="bg-white/80 px-4"
            >
              <Home className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Progress Bar */}
        <Card className="p-3 mb-3">
          <div className="flex items-center gap-3">
            <span className="text-base font-bold text-gray-700">Progress:</span>
            <Progress value={progress} className="flex-1 h-4" />
            <span className="text-base font-bold text-purple-600">
              {currentLetterIndex + 1}/{alphabetData.length}
            </span>
          </div>
        </Card>

        {/* Main Game Area */}
        <motion.div
          key={currentLetterIndex}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="flex-1"
        >
          <Card className="p-8 shadow-2xl h-full flex flex-col">
            <div className="text-center flex-1 flex flex-col justify-center">
              {/* Letter Display */}
              <motion.div
                className={`bg-gradient-to-br ${currentLetter.color} rounded-3xl p-8 mb-4 cursor-pointer`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLetterClick}
              >
                <motion.div
                  animate={showCelebration ? { rotate: [0, -10, 10, -10, 0] } : {}}
                  transition={{ duration: 0.5 }}
                  className="text-white"
                >
                  <div className="text-7xl font-bold mb-3">
                    {currentLetter.letter}
                  </div>
                  <div className="text-6xl mb-3">{currentLetter.emoji}</div>
                  <div className="text-4xl font-bold">{currentLetter.word}</div>
                </motion.div>
              </motion.div>

              {/* Instructions */}
              <div className="flex justify-center gap-3 mb-3">
                <Button
                  onClick={() =>
                    playSound(`${currentLetter.letter} for ${currentLetter.word}`)
                  }
                  className="bg-blue-500 hover:bg-blue-600 text-white text-base px-6 py-4"
                >
                  <Volume2 className="w-5 h-5 mr-2" />
                  Hear it again!
                </Button>
                <Button
                  onClick={handleLetterClick}
                  className="bg-green-500 hover:bg-green-600 text-white text-base px-6 py-4"
                >
                  I Know It! ✓
                </Button>
              </div>

              <p className="text-base text-gray-600">
                👆 Click the letter to learn and move forward!
              </p>
            </div>
          </Card>
        </motion.div>

        {/* Alphabet Preview Strip */}
        <div className="mt-3">
          <Card className="p-2">
            <div className="flex gap-1 overflow-x-auto">
              {alphabetData.map((letter, index) => (
                <div
                  key={letter.letter}
                  className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold transition-all ${
                    index < currentLetterIndex
                      ? "bg-green-400 text-white"
                      : index === currentLetterIndex
                      ? "bg-purple-500 text-white scale-125 border-4 border-purple-700"
                      : "bg-gray-200 text-gray-400"
                  }`}
                >
                  {letter.letter}
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Celebration Message */}
        {showCelebration && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none"
          >
            <Card className="p-8 bg-gradient-to-r from-yellow-400 to-orange-400 text-white shadow-2xl">
              <div className="text-center">
                <div className="text-6xl mb-2">🎉</div>
                <div className="text-4xl font-bold mb-1">Great Job!</div>
                <div className="text-2xl">+10 Stars!</div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Helper Character */}
        <motion.div
          className="fixed bottom-4 right-4 text-5xl"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🦜
        </motion.div>
      </div>
    </div>
  );
}