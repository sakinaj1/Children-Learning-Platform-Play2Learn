import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Home, Star, RotateCcw } from "lucide-react";
import { motion } from "motion/react";
import confetti from "canvas-confetti";

interface MemoryCard {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export function MemoryGameScreen() {
  const navigate = useNavigate();
  const [cards, setCards] = useState<MemoryCard[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);

  const emojis = ["🐶", "🐱", "🐼", "🦁", "🐸", "🦊", "🐨", "🐯"];

  useEffect(() => {
    initializeGame();
  }, []);

  const initializeGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({
        id: index,
        emoji,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffled);
    setFlippedCards([]);
    setScore(0);
    setMoves(0);
  };

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2 || cards[id].isFlipped || cards[id].isMatched) {
      return;
    }

    const newCards = [...cards];
    newCards[id].isFlipped = true;
    setCards(newCards);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;

      if (cards[first].emoji === cards[second].emoji) {
        // Match found!
        setTimeout(() => {
          const updatedCards = [...newCards];
          updatedCards[first].isMatched = true;
          updatedCards[second].isMatched = true;
          setCards(updatedCards);
          setFlippedCards([]);
          setScore(score + 10);
          confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });

          // Check if game is complete
          if (updatedCards.every((card) => card.isMatched)) {
            setTimeout(() => {
              confetti({ particleCount: 200, spread: 100, origin: { y: 0.5 } });
              alert(`🎉 You Won! Score: ${score + 10} | Moves: ${moves + 1}`);
              navigate("/rewards");
            }, 500);
          }
        }, 500);
      } else {
        // No match
        setTimeout(() => {
          const updatedCards = [...newCards];
          updatedCards[first].isFlipped = false;
          updatedCards[second].isFlipped = false;
          setCards(updatedCards);
          setFlippedCards([]);
        }, 1000);
      }
    }
  };

  return (
    <div className="h-screen bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-300 p-4 overflow-hidden">
      <div className="max-w-4xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-3xl font-bold text-indigo-800">🧠 Memory Game</h1>
          <div className="flex gap-3">
            <Card className="px-4 py-2 bg-yellow-400 border-4 border-yellow-600">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-600 text-yellow-600" />
                <span className="text-xl font-bold text-yellow-900">{score}</span>
              </div>
            </Card>
            <Card className="px-4 py-2 bg-blue-400 border-4 border-blue-600">
              <div className="text-center">
                <div className="text-xs text-white">Moves</div>
                <div className="text-xl font-bold text-white">{moves}</div>
              </div>
            </Card>
            <Button onClick={initializeGame} variant="outline" className="bg-white/80 px-4">
              <RotateCcw className="w-5 h-5" />
            </Button>
            <Button onClick={() => navigate("/games")} variant="outline" className="bg-white/80 px-4">
              <Home className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Game Board */}
        <Card className="p-4 flex-1 shadow-2xl">
          <div className="h-full flex items-center justify-center">
            <div className="grid grid-cols-4 gap-3 w-full max-w-2xl">
              {cards.map((card) => (
                <motion.div
                  key={card.id}
                  whileHover={{ scale: card.isMatched ? 1 : 1.05 }}
                  whileTap={{ scale: card.isMatched ? 1 : 0.95 }}
                  onClick={() => handleCardClick(card.id)}
                  className="aspect-square"
                >
                  <Card
                    className={`w-full h-full flex items-center justify-center cursor-pointer transition-all ${
                      card.isMatched
                        ? "bg-green-200 border-4 border-green-500"
                        : card.isFlipped
                        ? "bg-white border-4 border-purple-500"
                        : "bg-gradient-to-br from-purple-400 to-pink-500 border-4 border-purple-600"
                    }`}
                  >
                    {card.isFlipped || card.isMatched ? (
                      <div className="text-5xl">{card.emoji}</div>
                    ) : (
                      <div className="text-4xl">❓</div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>

        {/* Instructions */}
        <div className="text-center mt-2">
          <p className="text-lg text-indigo-800 font-bold">
            🎯 Match all pairs to win! Click cards to flip them.
          </p>
        </div>

        {/* Helper Character */}
        <motion.div
          className="fixed bottom-4 right-4 text-5xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🧩
        </motion.div>
      </div>
    </div>
  );
}
