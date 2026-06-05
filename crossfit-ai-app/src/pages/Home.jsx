function Home({user}) {
    return (
        <div className="home">

            <h2>🏠 Inicio</h2>

            <p>¡Bienvenido a Crossfit Program {user.name}!</p>
            
        </div>
    );
}

export default Home;