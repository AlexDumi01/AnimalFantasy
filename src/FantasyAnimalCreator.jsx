import React, { useState } from 'react';

function FantasyAnimalCreator() {
  const [description, setDescription] = useState('');
  const [generatedImage, setGeneratedImage] = useState(null);
  const [scientificDescription, setScientificDescription] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Simula una generazione
      setTimeout(() => {
        setGeneratedImage('https://placekitten.com/400/300'); // placeholder image
        setScientificDescription(
          `Nome scientifico: Fantasius imaginarius\n
          Habitat: foreste incantate\n
          Dieta: nettare di fiori alieni\n
          Descrizione: un animale con caratteristiche uniche basate sulla tua descrizione!`
        );
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error("Errore nella generazione:", error);
      alert("Si è verificato un errore nella generazione.");
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrivi il tuo animale immaginario..."
          rows="5"
          style={{ width: '80%', padding: '1rem' }}
          required
        />
        <br />
        <button type="submit" style={{ marginTop: '1rem', padding: '0.5rem 2rem' }}>
          Genera
        </button>
      </form>

      {loading && <p>Generazione in corso...</p>}

      {generatedImage && (
        <div>
          <img src={generatedImage} alt="Animale Immaginario" style={{ maxWidth: '80%', borderRadius: '8px' }} />
          <pre style={{ textAlign: 'left', marginTop: '1rem' }}>{scientificDescription}</pre>
        </div>
      )}
    </div>
  );
}

export default FantasyAnimalCreator;
