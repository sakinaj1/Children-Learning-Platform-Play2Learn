import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Progress } from "../components/ui/progress";
import { Home, Star } from "lucide-react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";

export function MathQuizScreen() {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);

  const questions = [
    {
      question: "1 + 1 = ?",
      emoji: "🍎 + 🍎",
      options: [1, 2, 3, 4],
      correct: 2,
    },
    {
      question: "3 - 1 = ?",
      emoji: "🌟🌟🌟 - 🌟",
      options: [1, 2, 3, 4],
      correct: 2,
    },
    {
      question: "2 + 2 = ?",
      emoji: "⚽⚽ + ⚽⚽",
      options: [2, 3, 4, 5],
      correct: 4,
    },
    {
      question: "5 - 2 = ?",
      emoji: "🍪🍪🍪🍪🍪 - 🍪🍪",
      options: [2, 3, 4, 5],
      correct: 3,
    },
    {
      question: "3 + 2 = ?",
      emoji: "🐶🐶🐶 + 🐶🐶",
      options: [4, 5, 6, 7],
      correct: 5,
    },
  ];

  const currentQ = questions[currentQuestion];
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleAnswer = (answer: number) => {
    setSelectedAnswer(answer);
    
    if (answer === currentQ.correct) {
      setShowFeedback("correct");
      setScore(score + 20);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setCurrentQuestion(currentQuestion + 1);
          setShowFeedback(null);
          setSelectedAnswer(null);
        } else {
          navigate("/rewards");
        }
      }, 1500);
    } else {
      setShowFeedback("wrong");
      setTimeout(() => {
        setShowFeedback(null);
        setSelectedAnswer(null);
      }, 1000);
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-cyan-300 via-blue-300 to-indigo-300 p-4 overflow-hidden">
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-3xl font-bold text-blue-800">➕ Math Quiz</h1>
          <div className="flex gap-3">
            <Card className="px-4 py-2 bg-yellow-400 border-4 border-yellow-600">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-600 text-yellow-600" />
                <span className="text-xl font-bold text-yellow-900">{score}</span>
              </div>
            </Card>
            <Button onClick={() => navigate("/games")} variant="outline" className="bg-white/80 px-4">
              <Home className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Progress */}
        <Card className="p-3 mb-3">
          <div className="flex items-center gap-3">
            <span className="text-base font-bold text-gray-700">Progress:</span>
            <Progress value={progress} className="flex-1 h-4" />
            <span className="text-base font-bold text-blue-700">
              {currentQuestion + 1}/{questions.length}
            </span>
          </div>
        </Card>

        {/* Question Card */}
        <motion.div
          key={currentQuestion}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="flex-1"
        >
          <Card className="p-6 h-full flex flex-col shadow-2xl">
            <div className="flex-1 flex flex-col justify-center">
              {/* Question */}
              <div className="text-center mb-6">
                <h2 className="text-4xl font-bold text-gray-800 mb-4">
                  {currentQ.question}
                </h2>
                <div className="text-6xl mb-4">{currentQ.emoji}</div>
              </div>

              {/* MCQ Options */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {currentQ.options.map((option) => (
                  <motion.div key={option} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      onClick={() => handleAnswer(option)}
                      disabled={showFeedback !== null}
                      className={`w-full h-24 text-5xl font-bold ${
                        selectedAnswer === option
                          ? showFeedback === "correct"
                            ? "bg-green-500 hover:bg-green-500"
                            : "bg-red-500 hover:bg-red-500"
                          : "bg-gradient-to-br from-cyan-400 to-blue-600 hover:from-cyan-500 hover:to-blue-700"
                      } text-white shadow-xl`}
                    >
                      {option}
                    </Button>
                  </motion.div>
                ))}
              </div>

              {/* Feedback */}
              {showFeedback && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-center"
                >
                  {showFeedback === "correct" ? (
                    <div className="text-3xl font-bold text-green-600">
                      🎉 Excellent! +20 Stars!
                    </div>
                  ) : (
                    <div className="text-3xl font-bold text-red-600">
                      ❌ Try Again!
                    </div>
                  )}
                </motion.div>
              )}
            </div>
          </Card>
        </motion.div>

        {/* Helper Character */}
        <motion.div
          className="fixed bottom-4 right-4 text-5xl"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🦉
        </motion.div>
      </div>
    </div>
  );
}
