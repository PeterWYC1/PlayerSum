import React, { useState, useEffect } from 'react';

const App: React.FC = () => {
  const [players, setPlayers] = useState<{ first_name: string, last_name: string, h_in: string }[]>([]);
  const [inputHeight, setInputHeight] = useState<number | null>(null);
  const [result, setResult] = useState<string[]>([]);

  useEffect(() => {
    fetch('https://mach-eight.uc.r.appspot.com/')
      .then(response => response.json())
      .then(data => setPlayers(data.values))
      .catch(error => console.error('Error al obtener los datos:', error));
  }, []);

  const findPairs = () => {
    if (inputHeight !== null && players.length > 0) {
      const pairs: string[] = [];
      const seen: Set<string> = new Set();

      for (let i = 0; i < players.length; i++) {
        const currentHeight = +players[i].h_in;
        const targetHeight = inputHeight - currentHeight;

        for (let j = i + 1; j < players.length; j++) {
          if (+(players[j].h_in) === targetHeight) {
            const pair = `${players[i].first_name} ${players[i].last_name} - ${players[j].first_name} ${players[j].last_name}`;
            if (!seen.has(pair)) {
              pairs.push(pair);
              seen.add(pair);
            }
          }
        }
      }

      setResult(pairs.length > 0 ? pairs : ['No matches found']);
    }
  };

  const styles = {
    container: {
      padding: '20px',
      fontFamily: 'Arial, sans-serif',
    } as React.CSSProperties,

    title: {
      textAlign: 'center', 
    } as React.CSSProperties,

    inputContainer: {
      textAlign: 'center',
      marginBottom: '20px',
    } as React.CSSProperties,

    input: {
      padding: '10px',
      fontSize: '16px',
      width: '200px',
      borderRadius: '5px',
      border: '1px solid #ccc',
    } as React.CSSProperties,

    button: {
      padding: '10px 20px',
      fontSize: '16px',
      marginLeft: '10px',
      borderRadius: '5px',
      border: 'none',
      backgroundColor: '#007bff',
      color: 'white',
      cursor: 'pointer',
    } as React.CSSProperties,

    resultContainer: {
      textAlign: 'center',
      marginTop: '20px',
    } as React.CSSProperties,

    result: {
      fontSize: '18px',
      lineHeight: '1.5',
    } as React.CSSProperties,
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>NBA Player Height Finder</h1>
      <div style={styles.inputContainer}>
        <input
          type="number"
          value={inputHeight ?? ''}
          onChange={(e) => setInputHeight(parseInt(e.target.value))}
          placeholder="Enter height in inches"
          style={styles.input}
        />
        <button onClick={findPairs} style={styles.button}>
          Search
        </button>
      </div>
      <div style={styles.resultContainer}>
        {result.length > 0 && (
          <div style={styles.result}>
            {result.map((pair, index) => (
              <p key={index}>{pair}</p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
