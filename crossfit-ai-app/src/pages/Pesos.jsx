import { useEffect, useState } from "react";

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

const movements = [

  "Power Snatch",

  "Hang Snatch",

  "Squat Snatch",

  "Power Clean",

  "Hang Clean",

  "Squat Clean",

  "Clean & Jerk",

  "Split Jerk",

  "Push Jerk",

  "Push Press",

  "Strict Press",

  "Overhead Squat",

  "Thruster",

  "Back Squat",

  "Front Squat",

  "Deadlift",

  "Romanian Deadlift",

  "Bench Press",

  "Sumo Deadlift",

  "Zercher Squat",

  "Good Morning",

  "Hip Thrust",

  "Walking Lunges",

  "Bulgarian Split Squat",

  "Farmer Carry",

];


function Pesos() {

    const [search, setSearch] = useState("");

    const filteredMovements = movements.filter((movement) => 
    movement.toLowerCase().includes(search.toLowerCase()));

    const [showOptions, setShowOptions] = useState(false);

    const [saved, setSaved] = useState(false);

    const [kg, setKg] = useState("");
    const [reps, setReps] = useState("");
    const [date, setDate] = useState("");

    const [benchmarks, setBenchmarks] = useState(() => {
        const savedBenchmarks = localStorage.getItem("benchmarks");
        return savedBenchmarks ? JSON.parse(savedBenchmarks) : [];
    });

    useEffect(() => {
        localStorage.setItem(
            "benchmarks",
            JSON.stringify(benchmarks)
        );
    }, [benchmarks]);

    const [view, setView] = useState("form");

    const [selectedMovement,setSelectedMovement] = useState("");

    function handleSaveBenchmark() {
        const newBenchmark = {
            movement: search,
            kg: Number (kg),
            reps: Number (reps),
            date: date,
        };

        setBenchmarks([...benchmarks, newBenchmark]);
        setSaved(true);
    }

    if (view === "history") {
        return (
            <div className="benchmarks">
                <h2>Histórico</h2>

                {movements.map((movement) => (
                    <button
                        key={movement}
                        className="movement-card"
                        onClick={() => {
                            setSelectedMovement(movement);
                            setView("movementHistory");
                        }}
                    >
                        {movement}
                    </button>
                ))}

                <button
                    className="history-button"
                    onClick={() => setView("form")}
                >
                    Volver
                </button>
            </div>
        );
    }

    if (view === "movementHistory") {

        const movementBenchmarks = benchmarks
            .filter((benchmark) => benchmark.movement === selectedMovement)
            .sort((a, b) => new Date(a.date) - new Date(b.date));

        const currentOneRM =
            movementBenchmarks.length > 0
                ? Math.round(
                    Math.max(
                        ...movementBenchmarks.map(
                            (benchmark) => 
                                benchmark.reps === 1
                                    ? benchmark.kg
                                    : benchmark.kg * (1 + benchmark.reps / 30)
                        )
                    )
                )
            : 0;

        const percentages = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50];

        return (
            <div className="movement-history">
                <h2>{selectedMovement}</h2>

                <section className="history-section">
                    <h3>Histórico</h3>

                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Reps</th>
                                <th>Weight</th>
                                <th>1RM</th>
                            </tr>
                        </thead>

                        <tbody>
                            {movementBenchmarks.map((benchmark, index) => {
                                const estimatedOneRM =
                                    benchmark.reps === 1
                                        ? benchmark.kg
                                        : Math.round(benchmark.kg * (1 + benchmark.reps / 30));

                                return (
                                    <tr key={index}>
                                        <td>{benchmark.date}</td>
                                        <td>{benchmark.reps}</td>
                                        <td>{benchmark.kg} kg</td>
                                        <td>{estimatedOneRM} kg</td>
                                    </tr>
                                );
                            })}

                        </tbody>
                    </table>
                </section>

                <section className="chart-section">
                    <h3>Evolución</h3>

                    <div className="chart-container">
                        <ResponsiveContainer width="100%" height={220}>
                            <LineChart data={movementBenchmarks}>
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="date" />
                                <YAxis />
                                <Tooltip />
                                <Line 
                                    type="monotone"
                                    dataKey="kg"
                                    stroke="#00c8ff"
                                    strokeWidth={3}
                                />

                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </section>

                <section className="percentages-section">
                    <h3>Porcentajes</h3>

                    <p className="one-rm">1RM Actual: {currentOneRM} kg</p>

                    <table>
                        <tbody>
                            {percentages.map((percentage) => (
                                <tr key={percentage}>
                                    <td>{percentage}%</td>
                                    <td>{Math.round(currentOneRM * (percentage / 100))} kg</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>

                <button
                    className="history-button"
                    onClick={() => setView("history")}
                >
                    Volver
                </button>

            </div>
        );
    }

    return (
        <div className="benchmarks">

            <h2>Benchmarks</h2>
            <p>¡Aquí podrás guardar tus marcas personales!</p>

            <label>Movimiento🔍</label>

            <input 
                type="text"
                placeholder="Buscar movimiento..."
                value={search}
                onChange={(e) => {
                    setSearch(e.target.value);
                    setShowOptions(true);
                    setSaved(false);
                }}
            />

           {showOptions && search !== "" && (

            <ul>
                {filteredMovements.map((movement) => (
                    <li
                        key={movement}
                        onClick={() => {
                            setSearch(movement);
                            setShowOptions(false);
                        }}
                    >
                        {movement}
                    </li>
                ))}
            </ul>
           )}
            
            <label>Kg</label>
            <input 
                type="number" 
                placeholder="Ej: 80"
                value={kg}
                onChange={(e) => {
                    setKg(e.target.value);
                    setSaved(false);
                }}
            />

            <label>Repeticiones</label>
            <input 
                type="number" 
                placeholder="Ej: 1"
                value={reps}
                onChange={(e) => {
                    setReps(e.target.value);
                    setSaved(false);
                }}
            />

            <label>Fecha</label>
            <input 
                type="date"
                value={date}
                onChange={(e) => {
                    setDate(e.target.value);
                    setSaved(false);
                }}
            />

            <button 
                className="save-benchmark-button"
                onClick={handleSaveBenchmark}
            >
                Guardar Marca
            </button>

            {saved && <p>✅¡Enhorabuena por tu nueva marca!✅</p>}

            <button 
                className="history-button"
                onClick={() => setView("history")}
                
            >
                Histórico de Marcas
            </button>

        </div>
    );
}

export default Pesos;