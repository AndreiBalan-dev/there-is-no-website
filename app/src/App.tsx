import React from "react";
import MatterComponent from "./components/WorldEntity";

const App: React.FC = () => {
  return (
    <div className="flex">
      <h1>Matter.js with React and TypeScript</h1>
      <MatterComponent />
    </div>
  );
};

export default App;
