import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import HomePage from "./pages/LandingPage";
import AppRoutes from "./Route";

function App() {
  const [count, setCount] = useState(0);

  return <AppRoutes />;
}

export default App;
