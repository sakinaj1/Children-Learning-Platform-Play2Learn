import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Home, Eraser, Download, Trash2, Palette } from "lucide-react";
import { motion } from "motion/react";

export function DrawingScreen() {
  const navigate = useNavigate();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState("#FF6B6B");
  const [brushSize, setBrushSize] = useState(5);
  const [tool, setTool] = useState<"brush" | "eraser">("brush");

  const colors = [
    { name: "Red", value: "#FF6B6B", emoji: "❤️" },
    { name: "Blue", value: "#4D96FF", emoji: "💙" },
    { name: "Green", value: "#6BCF7F", emoji: "💚" },
    { name: "Yellow", value: "#FFD93D", emoji: "💛" },
    { name: "Purple", value: "#9B59B6", emoji: "💜" },
    { name: "Black", value: "#000000", emoji: "🖤" },
  ];

  const brushSizes = [
    { size: 3, label: "S" },
    { size: 8, label: "M" },
    { size: 15, label: "L" },
  ];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx) ctx.beginPath();
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing && e.type !== "mousedown" && e.type !== "touchstart") return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";

    if (tool === "eraser") {
      ctx.globalCompositeOperation = "destination-out";
    } else {
      ctx.globalCompositeOperation = "source-over";
      ctx.strokeStyle = currentColor;
    }

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    ctx.fillStyle = "#FFFFFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const saveDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `my-drawing-${Date.now()}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="h-screen bg-gradient-to-br from-yellow-200 via-pink-200 to-purple-200 p-4 overflow-hidden">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-3">
          <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <h1 className="text-4xl font-bold text-purple-700 mb-1">
              🎨 Draw & Create 🎨
            </h1>
            <p className="text-lg text-purple-600">
              Express yourself with colors!
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

        <div className="grid grid-cols-5 gap-3 flex-1">
          {/* Tools Panel */}
          <div className="col-span-1 space-y-2 overflow-y-auto">
            {/* Color Picker */}
            <Card className="p-3">
              <div className="flex items-center gap-1 mb-2">
                <Palette className="w-4 h-4 text-purple-600" />
                <h3 className="text-base font-bold text-gray-800">Colors</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {colors.map((color) => (
                  <button
                    key={color.value}
                    onClick={() => {
                      setCurrentColor(color.value);
                      setTool("brush");
                    }}
                    className={`p-2 rounded-lg border-2 transition-all ${
                      currentColor === color.value && tool === "brush"
                        ? "border-purple-600 scale-110"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.value }}
                  >
                    <div className="text-xl">{color.emoji}</div>
                  </button>
                ))}
              </div>
            </Card>

            {/* Brush Sizes */}
            <Card className="p-3">
              <h3 className="text-base font-bold text-gray-800 mb-2">
                Size
              </h3>
              <div className="space-y-2">
                {brushSizes.map((brush) => (
                  <button
                    key={brush.size}
                    onClick={() => setBrushSize(brush.size)}
                    className={`w-full p-2 rounded-lg border-2 transition-all text-sm font-bold ${
                      brushSize === brush.size
                        ? "border-purple-600 bg-purple-100"
                        : "border-gray-300 bg-white"
                    }`}
                  >
                    {brush.label}
                  </button>
                ))}
              </div>
            </Card>

            {/* Tools */}
            <Card className="p-3">
              <div className="space-y-2">
                <Button
                  onClick={() => setTool("brush")}
                  className={`w-full text-sm py-2 ${
                    tool === "brush"
                      ? "bg-purple-600"
                      : "bg-gray-300"
                  }`}
                >
                  🖌️
                </Button>
                <Button
                  onClick={() => setTool("eraser")}
                  className={`w-full text-sm py-2 ${
                    tool === "eraser"
                      ? "bg-purple-600"
                      : "bg-gray-300"
                  }`}
                >
                  <Eraser className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* Actions */}
            <Card className="p-3 space-y-2">
              <Button
                onClick={saveDrawing}
                className="w-full bg-green-500 text-white text-sm py-2"
              >
                <Download className="w-4 h-4 mr-1" />
                Save
              </Button>
              <Button
                onClick={clearCanvas}
                variant="outline"
                className="w-full border-red-400 text-red-600 text-sm py-2"
              >
                <Trash2 className="w-4 h-4 mr-1" />
                Clear
              </Button>
            </Card>
          </div>

          {/* Canvas */}
          <div className="col-span-4">
            <Card className="p-3 shadow-2xl h-full">
              <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={stopDrawing}
                onMouseLeave={stopDrawing}
                onTouchStart={startDrawing}
                onTouchMove={draw}
                onTouchEnd={stopDrawing}
                className="w-full h-full bg-white rounded-lg cursor-crosshair border-2 border-gray-200"
                style={{ touchAction: "none" }}
              />
            </Card>
          </div>
        </div>

        {/* Floating encouragement */}
        <motion.div
          className="fixed bottom-4 right-4 text-5xl"
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          🎨
        </motion.div>
      </div>
    </div>
  );
}
