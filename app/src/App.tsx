import React from "react";
import MatterComponent from "./components/WorldEntity";
import SorryComponent from "./components/(pages)/FirstPage";

const App: React.FC = () => {
  return (
    <div className="dark flex justify-center dark:bg-background">
      {/* <MatterComponent /> */}
      <SorryComponent />
    </div>
  );
};

export default App;
