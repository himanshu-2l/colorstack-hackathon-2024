import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import CreateButton from "./components/CreateButton";

function App() {
  return (
    <>
      <div>
        <h1 className="text-3xl font-bold underline">Hello world!</h1>
        <CreateButton />
      </div>
    </>
  );
}

export default App;
