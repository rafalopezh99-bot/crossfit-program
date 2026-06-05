import { useState } from "react";

import "./App.css";

 

import Home from "./pages/Home";

import Wod from "./pages/Wod";

import Program from "./pages/Program";

import Pesos from "./pages/Pesos";

import Perfil from "./pages/Perfil";

import BottomNav from "./components/BottomNav";


function App() {

  const [screen, setScreen] = useState("home");

  const [user,setUser] = useState(
    {
      name: "Rafa",
      sex: "",
      weight: "",
      height: "",
    }
  );

  return (

    <div className="app">

      <h1>CrossFit Program</h1>

      <div className="content">

        {screen === "home" && <Home user={user} />}
        {screen === "wod" && <Wod />}
        {screen === "program" && <Program />}
        {screen === "pesos" && <Pesos />}
        {screen === "perfil" && <Perfil user={user} setUser={setUser} />}

      </div>

      <BottomNav setScreen={setScreen} />

    </div>
  );
}

export default App;