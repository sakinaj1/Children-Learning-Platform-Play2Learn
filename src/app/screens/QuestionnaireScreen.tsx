import { useState } from "react";
import { useNavigate } from "react-router";
import { Card } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { Checkbox } from "../components/ui/checkbox";
import { motion } from "motion/react";
import { Baby, Sparkles } from "lucide-react";

/**
 * QuestionnaireScreen - Parent questionnaire for child profile
 * All questions displayed on one page
 * 
 * HCI Principles Applied:
 * 1. Progressive Disclosure - All questions visible at once
 * 2. Visual Grouping - Questions grouped by section
 * 3. Clear Labels - Descriptive headings and instructions
 * 4. Immediate Feedback - Visual selection states
 */
export function QuestionnaireScreen() {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    childName: "",
    ageGroup: "",
    interests: [] as string[],
    learningGoals: [] as string[],
  });

  const ageGroups = [
    { value: "3-5", label: "3-5 years", emoji: "👶" },
    { value: "6-8", label: "6-8 years", emoji: "🧒" },
    { value: "9-12", label: "9-12 years", emoji: "👦" },
  ];

  const interests = [
    { value: "animals", label: "Animals", emoji: "🦁" },
    { value: "art", label: "Art & Drawing", emoji: "🎨" },
    { value: "music", label: "Music", emoji: "🎵" },
    { value: "sports", label: "Sports", emoji: "⚽" },
    { value: "science", label: "Science", emoji: "🔬" },
    { value: "reading", label: "Reading", emoji: "📚" },
  ];

  const learningGoals = [
    { value: "alphabet", label: "Learn Alphabet", emoji: "🔤" },
    { value: "numbers", label: "Learn Numbers", emoji: "🔢" },
    { value: "colors", label: "Learn Colors", emoji: "🌈" },
    { value: "shapes", label: "Learn Shapes", emoji: "⭐" },
    { value: "reading", label: "Reading Skills", emoji: "📖" },
    { value: "math", label: "Basic Math", emoji: "➕" },
  ];

  const handleInterestToggle = (value: string) => {
    setFormData({
      ...formData,
      interests: formData.interests.includes(value)
        ? formData.interests.filter((i) => i !== value)
        : [...formData.interests, value],
    });
  };

  const handleGoalToggle = (value: string) => {
    setFormData({
      ...formData,
      learningGoals: formData.learningGoals.includes(value)
        ? formData.learningGoals.filter((g) => g !== value)
        : [...formData.learningGoals, value],
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.childName || !formData.ageGroup) {
      alert("Please fill in your child's name and age group!");
      return;
    }
    
    // Save profile
    localStorage.setItem("childProfile", JSON.stringify(formData));
    navigate("/dashboard");
  };

  return (
    <div className="h-screen bg-gradient-to-br from-blue-300 via-purple-200 to-pink-200 p-4 overflow-hidden flex flex-col">
      <div className="max-w-6xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-3">
          <h1 className="text-3xl font-bold text-purple-700 mb-1">
            👨‍👩‍👧 Parent Questionnaire 👧
          </h1>
          <p className="text-sm text-purple-600">
            Tell us about your child to personalize their learning experience
          </p>
        </div>

        {/* Form Card - Scrollable */}
        <Card className="flex-1 p-6 overflow-y-auto shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Section 1: Child's Name */}
            <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
              <div className="flex items-center gap-2 mb-3">
                <Baby className="w-6 h-6 text-blue-500" />
                <h2 className="text-xl font-bold text-gray-800">
                  1. What's your child's name?
                </h2>
              </div>
              <Input
                type="text"
                value={formData.childName}
                onChange={(e) =>
                  setFormData({ ...formData, childName: e.target.value })
                }
                placeholder="Enter child's name"
                className="w-full p-3 text-base border-2 border-purple-300 focus:border-purple-500"
                required
              />
            </div>

            {/* Section 2: Age Group */}
            <div className="bg-purple-50 p-4 rounded-lg border-2 border-purple-200">
              <h2 className="text-xl font-bold text-gray-800 mb-3">
                2. How old is {formData.childName || "your child"}? 🎂
              </h2>
              <RadioGroup
                value={formData.ageGroup}
                onValueChange={(value) =>
                  setFormData({ ...formData, ageGroup: value })
                }
              >
                <div className="grid grid-cols-3 gap-3">
                  {ageGroups.map((age) => (
                    <Label
                      key={age.value}
                      htmlFor={age.value}
                      className="cursor-pointer"
                    >
                      <div
                        className={`p-4 rounded-lg border-2 transition-all ${
                          formData.ageGroup === age.value
                            ? "border-purple-500 bg-purple-200 scale-105"
                            : "border-gray-300 bg-white hover:border-purple-300"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value={age.value} id={age.value} />
                          <div className="flex-1">
                            <div className="text-3xl mb-1">{age.emoji}</div>
                            <div className="text-base font-bold">
                              {age.label}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Label>
                  ))}
                </div>
              </RadioGroup>
            </div>

            {/* Section 3: Interests */}
            <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                3. What does {formData.childName || "your child"} like? ✨
              </h2>
              <p className="text-sm text-gray-600 mb-3">
                Select all that apply
              </p>
              <div className="grid grid-cols-3 gap-3">
                {interests.map((interest) => (
                  <Label
                    key={interest.value}
                    htmlFor={interest.value}
                    className="cursor-pointer"
                  >
                    <div
                      className={`p-3 rounded-lg border-2 transition-all ${
                        formData.interests.includes(interest.value)
                          ? "border-green-500 bg-green-200 scale-105"
                          : "border-gray-300 bg-white hover:border-green-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={interest.value}
                          checked={formData.interests.includes(interest.value)}
                          onCheckedChange={() =>
                            handleInterestToggle(interest.value)
                          }
                          className="w-5 h-5"
                        />
                        <div className="flex-1">
                          <div className="text-2xl">{interest.emoji}</div>
                          <div className="text-sm font-bold">
                            {interest.label}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Label>
                ))}
              </div>
            </div>

            {/* Section 4: Learning Goals */}
            <div className="bg-orange-50 p-4 rounded-lg border-2 border-orange-200">
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                4. What should {formData.childName || "your child"} learn? 🎯
              </h2>
              <p className="text-sm text-gray-600 mb-3">
                Select your learning goals
              </p>
              <div className="grid grid-cols-3 gap-3">
                {learningGoals.map((goal) => (
                  <Label
                    key={goal.value}
                    htmlFor={goal.value}
                    className="cursor-pointer"
                  >
                    <div
                      className={`p-3 rounded-lg border-2 transition-all ${
                        formData.learningGoals.includes(goal.value)
                          ? "border-orange-500 bg-orange-200 scale-105"
                          : "border-gray-300 bg-white hover:border-orange-300"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Checkbox
                          id={goal.value}
                          checked={formData.learningGoals.includes(goal.value)}
                          onCheckedChange={() => handleGoalToggle(goal.value)}
                          className="w-5 h-5"
                        />
                        <div className="flex-1">
                          <div className="text-2xl">{goal.emoji}</div>
                          <div className="text-sm font-bold">{goal.label}</div>
                        </div>
                      </div>
                    </div>
                  </Label>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white text-xl px-8 py-6 rounded-xl shadow-xl"
              >
                <Sparkles className="w-6 h-6 mr-2" />
                Start Learning Journey! 🚀
              </Button>
            </motion.div>
          </form>
        </Card>
      </div>
    </div>
  );
}
