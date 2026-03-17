import { createBrowserRouter } from "react-router";
import { WelcomeScreen } from "./screens/WelcomeScreen";
import { QuestionnaireScreen } from "./screens/QuestionnaireScreen";
import { DashboardScreen } from "./screens/DashboardScreen";
import { GamesScreen } from "./screens/GamesScreen";
import { VideoLearningScreen } from "./screens/VideoLearningScreen";
import { DrawingScreen } from "./screens/DrawingScreen";
import { ProgressReportScreen } from "./screens/ProgressReportScreen";
import { RewardsScreen } from "./screens/RewardsScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { AlphabetGameScreen } from "./screens/AlphabetGameScreen";
import { NumbersGameScreen } from "./screens/NumbersGameScreen";
import { ShapesGameScreen } from "./screens/ShapesGameScreen";
import { ColorsGameScreen } from "./screens/ColorsGameScreen";
import { MemoryGameScreen } from "./screens/MemoryGameScreen";
import { MathQuizScreen } from "./screens/MathQuizScreen";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: WelcomeScreen,
  },
  {
    path: "/questionnaire",
    Component: QuestionnaireScreen,
  },
  {
    path: "/dashboard",
    Component: DashboardScreen,
  },
  {
    path: "/games",
    Component: GamesScreen,
  },
  {
    path: "/games/alphabet",
    Component: AlphabetGameScreen,
  },
  {
    path: "/games/numbers",
    Component: NumbersGameScreen,
  },
  {
    path: "/games/shapes",
    Component: ShapesGameScreen,
  },
  {
    path: "/games/colors",
    Component: ColorsGameScreen,
  },
  {
    path: "/games/memory",
    Component: MemoryGameScreen,
  },
  {
    path: "/games/math",
    Component: MathQuizScreen,
  },
  {
    path: "/videos",
    Component: VideoLearningScreen,
  },
  {
    path: "/drawing",
    Component: DrawingScreen,
  },
  {
    path: "/progress",
    Component: ProgressReportScreen,
  },
  {
    path: "/rewards",
    Component: RewardsScreen,
  },
  {
    path: "/profile",
    Component: ProfileScreen,
  },
]);