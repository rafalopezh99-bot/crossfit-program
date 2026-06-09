import { useState } from "react";



function Wod() {

    const[peopleType, setPeopleType] = useState("Individual"); 

    const [view, setView] = useState("form");

    const [generatedWod, setGeneratedWod] = useState(null);

    const [favoriteWods, setFavoriteWods] = useState([]);

    const [wodType, setWodType] = useState("AMRAP");
    const [duration, setDuration] = useState("");
    const [objective, setObjective] = useState("Metcon");
    const [level, setLevel] = useState("Escalado");
    const [requiredElements, setrequiredElements] = useState("");
    const [excludedElements, setexcludedElements] = useState("");

    if (view === "result") {
        return (
            <div className="wod-result">

                <button
                    className="back-button"
                    onClick={() => setView("form")}                 
                >
                    ⬅Volver
                </button>

                <h2>🔥{generatedWod.name}</h2>

                <h3>
                    {generatedWod.type} {generatedWod.duration} min
                </h3>

                <p><strong>Objetivo: </strong>{generatedWod.objective}</p>
                <p><strong>Nivel: </strong>{generatedWod.level}</p>

                {generatedWod.workout.map((exercise, index) => (
                    <p key={index}>{exercise}</p>
                ))}

                <button className="generate-wod-button">
                    ⭐Guardar en favoritos⭐
                </button>

            </div>
        );
    }

    function handleGenerateWod() {
        const newWod = {
            name: "WOD del día",
            type: wodType,
            duration: duration,
            objective: objective, 
            level: level, 
            requiredElements: requiredElements,
            excludedElements: excludedElements,
            workout: [
                "10 wall balls",
                "15 Dumbbell Snatch",
                "20 Sit ups",
            ],
        };

        setGeneratedWod(newWod);
        setView("result");
    }

    function handleSaveFavoriteWod() {
        setFavoriteWods([...favoriteWods, generatedWod]);
    }
    
    return (

        <div className="wod">
            <h2>Generador de WOD</h2>

            <label>Tipo de WOD</label>

            <select
                value={wodType}
                onChange={(e) => setWodType(e.target.value)}
                >
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
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
            />

            <label>Objetivo</label>

            <select
                value={objective}
                onChange={(e) => setObjective(e.target.value)}
            >
                <option>Metcon</option>
                <option>Cardio</option>
                <option>Gimnásticos</option>
                <option>Fuerza</option>
            </select>

            <label>Nivel</label>

            <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
            >
                <option>Escalado</option>
                <option>Intermedio</option>
                <option>Rx</option>
            </select>

            <label>Elementos obligatorios</label>

            <input
                type="text"
                placeholder="Ej: Wall balls, Rope climb, Walk walls..."
                value={requiredElements}
                onChange={(e) => setrequiredElements(e.target.value)}
            />

            <label>Elementos excluidos</label>

            <input
                type="text"
                placeholder="Ej: Double unders, Assault, HSPU..."
                value={excludedElements}
                onChange={(e) => setexcludedElements(e.target.value)}
            />

            <button 
                className="generate-wod-button"
                onClick={handleGenerateWod}
            >
                🔥Generar WOD🔥
            </button>

        </div>

        
    );
}

export default Wod;