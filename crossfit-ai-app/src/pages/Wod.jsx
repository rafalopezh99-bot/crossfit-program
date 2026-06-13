import { useEffect, useState } from "react";



function Wod({ favoriteWods, setFavoriteWods }) {

    const[peopleType, setPeopleType] = useState("Individual"); 

    const [view, setView] = useState("form"); 

    const [generatedWod, setGeneratedWod] = useState(null);

    useEffect(() => {
        localStorage.setItem(
            "favoriteWods",
            JSON.stringify(favoriteWods)
        );
    }, [favoriteWods]);

    const [wodType, setWodType] = useState("AMRAP");
    const [duration, setDuration] = useState("");
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

               {generatedWod.workout
                .filter((line) =>
                    line.trim() !== "" &&
                    !line.startsWith("Nombre:") &&
                    !line.startsWith("Tipo:") &&
                    !line.startsWith("WOD:")
                )
                .map((exercise, index) => (
                    <p key={index}>{exercise}</p>
                ))}

                <button 
                    className="generate-wod-button"
                    onClick={handleSaveFavoriteWod}
                >
                    ⭐Guardar en favoritos⭐
                </button>

            </div>
        );
    }

    async function handleGenerateWod() {
        const response = await fetch("/api/generate-wod", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                wodType,
                duration,
                level,
                peopleType,
                requiredElements,
                excludedElements,
            }),
        });

        const data = await response.json();

        if (!data.wod) {
            alert("Error generando el WOD, inténtelo de nuevo");
            return;
        }

        const wodLines = data.wod.split("\n");

        const wodNameLine = wodLines.find((line) =>
            line.toLowerCase().startsWith("Nombre:")
        );

        const wodName = wodNameLine
            ? wodNameLine.replace("/nombre:/i", "").trim()
            : "WOD generado";

        setGeneratedWod({
            name: wodName,
            type: wodType,
            duration: duration,
            level: level,
            workout: wodLines,
        });

        setView("result");
        
    }

    function handleSaveFavoriteWod() {
        setFavoriteWods([...favoriteWods, generatedWod]);

        alert("WOD guardado en favoritos");
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