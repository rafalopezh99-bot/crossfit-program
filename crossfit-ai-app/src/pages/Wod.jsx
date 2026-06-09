import { useState } from "react";



function Wod() {

    const[peopleType, setPeopleType] = useState("Individual"); 

    const [view, setView] = useState("form");

    if (view === "result") {
        return (
            <div className="wod-result">

                <button
                    className="back-button"
                    onClick={() => setView("form")}                 
                >
                    ⬅Volver
                </button>

                <h2>🔥 Thunder WOD</h2>

                <h3>AMRAP 20 min</h3>

                <p>10 Wall balls</p>
                <p>15 Dumbbell Snatch</p>
                <p>20 Sit ups</p>

                <button className="generate-wod-button">
                    ⭐Guardar en favoritos⭐
                </button>

            </div>
        );
    }



    return (

        <div className="wod">
            <h2>Generador de WOD</h2>

            <label>Tipo de WOD</label>

            <select>
                <option>AMRAP</option>
                <option>EMOM</option>
                <option>FOR TIME</option>
                <option>TABATA</option>
                <option>CHIPPER</option>
                <option>ENDURANCE</option>
            </select>

            <label>Nº de Personas</label>

            <select
                value={peopleType}
                onChange={(e) => setPeopleType(e.target.value)}
            >
                <option>Individual</option>
                <option>Pareja</option>
                <option>Trío</option>
            </select>

            <label>
                {peopleType === "Individual"
                    ? "Sexo"
                    : "Composición"}
            </label>

            <select>
                {peopleType === "Individual" ? (
                    <>
                        <option>Hombre</option>
                        <option>Mujer</option>
                    </>
                ) : (
                    <>
                        <option>Hombres</option>
                        <option>Mujeres</option>
                        <option>Mixto</option>
                    </>
                )}
            </select>

            <label>Duración (Minutos)</label>

            <input
                type="number"
                placeholder="Ej:10"
            />

            <label>Objetivo</label>

            <select>
                <option>Metcon</option>
                <option>Cardio</option>
                <option>Gimnásticos</option>
                <option>Fuerza</option>
            </select>

            <label>Nivel</label>

            <select>
                <option>Escalado</option>
                <option>Intermedio</option>
                <option>Rx</option>
            </select>

            <label>Elementos obligatorios</label>

            <input
                type="text"
                placeholder="Ej: Wall balls, Rope climb, Walk walls..."
            />

            <label>Elementos excluidos</label>

            <input
                type="text"
                placeholder="Ej: Double unders, Assault, HSPU..."
            />

            <button 
                className="generate-wod-button"
                onClick={() => setView("result")}
            >
                🔥Generar WOD🔥
            </button>

        </div>

        
    );
}

export default Wod;