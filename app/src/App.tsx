import React from "react";
import MatterComponent from "./components/WorldEntity";

const App: React.FC = () => {
  return (
    <div className="dark flex justify-center dark:bg-background">
      <MatterComponent />
    </div>
  );
};

export default App;
