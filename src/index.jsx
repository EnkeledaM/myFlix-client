import { createRoot } from "react-dom/client";
import { MainView } from "./components/main-view/main-view"; // ky importon MainView-in tënd

import "./index.scss";

const App = () => {
  return <MainView />; // renderon MainView
};

const container = document.querySelector("#root");
const root = createRoot(container);
root.render(<App />);
