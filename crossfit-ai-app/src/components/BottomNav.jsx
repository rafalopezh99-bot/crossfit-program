function BottomNav({ setScreen }) {

  return (

    <div className="bottom-nav">

      <button onClick={() => setScreen("home")}>🏠 Welcome</button>

      <button onClick={() => setScreen("wod")}>🏋️ WOD</button>

      <button onClick={() => setScreen("program")}>📋 Program</button>

      <button onClick={() => setScreen("pesos")}>📈 Benchmarks</button>

      <button onClick={() => setScreen("perfil")}>👤 Profile</button>

    </div>

  );

}

export default BottomNav;