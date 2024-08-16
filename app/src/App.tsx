import React from "react";
import MatterComponent from "./components/WorldEntity";
import SorryComponent from "./components/(pages)/FirstPage";
import SwordMiniGameComponent from "./components/(pages)/SecondPage";
import CookieClickerGameComponent from "./components/(pages)/ThirdPage";

const App: React.FC = () => {
  return (
    <div className="dark flex justify-center dark:bg-background">
      {/* <MatterComponent /> */}
      {/* <SorryComponent /> */}
      {/* <SwordMiniGameComponent /> */}
      <CookieClickerGameComponent />
    </div>
  );
};

export default App;
