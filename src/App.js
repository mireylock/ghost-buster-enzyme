import React from "react";
import { GhostBoard } from "./components/GhostBoard";

const App = () => (
  <div>
    <h1>🎃 Ghost Buster 🎃</h1>
    <p>Catch the ghosts before they disappear! If you missclick you lose</p>
    <GhostBoard />
  </div>
);

export default App;
