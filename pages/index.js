
import { useState } from 'react';

export default function Home() {
  const [userInput, setUserInput] = useState('');
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleGenerate = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const response = await fetch('/api/generate-description', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description: userInput }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedDescription(data.description);
    } catch (error) {
      console.error('Errore nella generazione:', error);
      setErrorMessage('Si è verificato un errore nella generazione. Dettagli: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Crea il tuo animale immaginario</h1>
      <textarea
        placeholder="Descrivi il tuo animale..."
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        style={{ width: '100%', height: '100px', marginBottom: '1rem' }}
      />
      <br />
      <button onClick={handleGenerate} disabled={loading}>
        {loading ? 'Generazione in corso...' : 'Genera'}
      </button>

      {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

      {generatedDescription && (
        <div style={{ marginTop: '2rem' }}>
          <h2>Descrizione scientifica:</h2>
          <p>{generatedDescription}</p>
        </div>
      )}
    </div>
  );
}
