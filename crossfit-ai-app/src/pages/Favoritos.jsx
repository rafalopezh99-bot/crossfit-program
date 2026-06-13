import { useEffect, useState } from "react";


function Favoritos({ favoriteWods, setFavoriteWods }) {

    const handleDeleteFavorite = (indexToDelete) => {
        const confirmDelete = window.confirm(
            "¿Seguro que quieres eliminar este WOD de favoritos?"
        );

        if (!confirmDelete) return;

        const updatedFavorites = favoriteWods.filter(
            (_, index) => index !== indexToDelete
        );

        setFavoriteWods(updatedFavorites);
    };

    const [selectedWod, setSelectedWod] = useState(null);

    if (selectedWod) {
        return (
            <div className="wod-result">
                <button
                    className="back-button"
                    onClick={() => {
                        setSelectedWod(null)
                    }}
                >
                    ⬅Volver
                </button>

                <h2>🔥{selectedWod.name}</h2>

                <h3>{selectedWod.type} {selectedWod.duration} min</h3>

                <p><strong>Objetivo: </strong>{selectedWod.objective}</p>

                {selectedWod.workout.map((exercise, index) => (
                    <p key={index}>{exercise}</p>
                ))}
            </div>
        );
    }



    return ( 
        <div className="wod">
            <h2>⭐WODs Favoritos⭐</h2>

            {favoriteWods.length === 0 ? (
                <p>No tienes WODs favoritos todavía</p>
            ) : (
                favoriteWods.map((wod, index) => (
                    <div key={index} className="favorite-card">
                        <h3>{wod.name}</h3>

                        <p>{wod.type} {wod.duration} min</p>

                        <p>{wod.objective}</p>

                        <button
                            className="edit-button"
                            onClick={() => setSelectedWod(wod)}
                        >
                           👁️
                        </button>

                        <button
                            className="delete-button"
                            onClick={() => handleDeleteFavorite(index)}
                        >
                           🗑️
                        </button>
                    </div>
                ))


            )}
        </div>
    );
} 

export default Favoritos;