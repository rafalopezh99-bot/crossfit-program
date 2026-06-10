function BottomNav({ setScreen }) {

  return (

    <div className="bottom-nav">

      <button onClick={() => setScreen("home")}>🏠</button>

      <button onClick={() => setScreen("wod")}>🏋️</button>

      <button onClick={() => setScreen("program")}>📋</button>

      <button onClick={() => setScreen("pesos")}>📈</button>

      <button onClick={() => setScreen("favoritos")}>⭐</button>

      <button onClick={() => setScreen("perfil")}>👤</button>

    </div>

  );

}

export default BottomNav;