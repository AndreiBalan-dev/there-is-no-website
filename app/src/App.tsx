import React from "react";
import MatterComponentTemplate from "./components/WorldEntityTemplate";
import MatterComponent from "./components/WorldEntity";

const App: React.FC = () => {
  return (
    <div className="flex justify-center">
      <MatterComponent />
    </div>
  );
};

export default App;
