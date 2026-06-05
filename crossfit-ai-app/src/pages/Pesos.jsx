import {useState} from "react";

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
                onChange={() => setSaved(false)} 
            />

            <label>Repeticiones</label>
            <input 
                type="number" 
                placeholder="Ej: 1"
                onChange={() => setSaved(false)} 
            />

            <label>Fecha</label>
            <input 
                type="date"
                nChange={() => setSaved(false)}
            />

            <button className="save-benchmark-button"
                    onClick={() => setSaved(true)}
            >
                Guardar Marca
            </button>

            {saved && <p>✅¡Enhorabuena por tu nueva marca!✅</p>}

            <button className="history-button">
                Histórico de Marcas
            </button>

        </div>
    );
}

export default Pesos;