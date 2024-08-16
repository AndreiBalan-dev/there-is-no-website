import React from "react";
import MatterComponent from "./components/WorldEntity";
import SorryComponent from "./components/(pages)/FirstPage";
import SwordMiniGameComponent from "./components/(pages)/SecondPage";

const App: React.FC = () => {
  return (
    <div className="dark flex justify-center dark:bg-background">
      {/* <MatterComponent /> */}
      {/* <SorryComponent /> */}
      <SwordMiniGameComponent />
    </div>
  );
};

export default App;
