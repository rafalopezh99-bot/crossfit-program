import { useState } from "react";

function Perfil({ user, setUser }) {

    const [saved, setSaved] = useState(false);

  return (

    <div className="profile">

      <h2>Perfil</h2>

 

      <label>Nombre</label>

      <input

        type="text"

        value={user.name}

        onChange={(e) => {
            setUser({ ...user, name: e.target.value });
            setSaved(false);
        }}

      />

 

      <label>Sexo</label>

      <select

        value={user.sex}

         onChange={(e) => {
            setUser({ ...user, sex: e.target.value });
            setSaved(false);
        }}

      >

        <option value="">Selecciona una opción</option>

        <option value="Hombre">Hombre</option>

        <option value="Mujer">Mujer</option>

        <option value="Otro">Otro</option>

        <option value="Prefiero no decirlo">Prefiero no decirlo</option>

      </select>

 

      <label>Peso corporal (kg)</label>

      <input

        type="number"

        value={user.weight}

         onChange={(e) => {
            setUser({ ...user, weight: e.target.value });
            setSaved(false);
        }}

      />

 

      <label>Altura (cm)</label>

      <input

        type="number"

        value={user.height}

         onChange={(e) => {
            setUser({ ...user, height: e.target.value });
            setSaved(false);
        }}

      />

      <button onClick={() => setSaved(true)}>Guardar perfil</button>

      {saved && <p>✅ Perfil guardado</p>}

    </div>

  );

}

export default Perfil;