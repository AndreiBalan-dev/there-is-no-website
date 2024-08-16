import React from "react";
import MatterComponent from "./components/WorldEntity";
import SorryTyperComponent from "./components/(pages)/FirstPage";
import SwordMiniGameComponent from "./components/(pages)/SecondPage";
import CookieClickerComponent from "./components/(pages)/ThirdPage";

const App: React.FC = () => {
  return (
    <div className="dark flex justify-center dark:bg-background">
      {/* <MatterComponent /> */}
      {/* <SorryTyperComponent /> */}
      {/* <SwordMiniGameComponent /> */}
      <CookieClickerComponent />
    </div>
  );
};

export default App;
