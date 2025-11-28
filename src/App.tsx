import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import init, { sum, hello_world } from 'wasm';

function App() {
  const [wasmReady, setWasmReady] = useState(false);
  const [sumResult, setSumResult] = useState<number | null>(null);
  const [greeting, setGreeting] = useState<string>("");

  useEffect(() => {
    // Initializes the WebAssembly module.
    init().then(() => {
      setWasmReady(true);
      // We can now safely call Rust functions.
      setSumResult(sum(5, 7));
      setGreeting(hello_world());
    });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        
        <h1>React + Rust (Wasm)</h1>
        
        {!wasmReady ? (
          <p>Loading WebAssembly...</p>
        ) : (
          <div style={{ marginTop: '20px', border: '1px solid white', padding: '20px', borderRadius: '8px' }}>
            <p>
              <strong><code>hello_world()</code>:</strong><br/>
              {greeting}
            </p>
            <p>
              <strong><code>sum(5, 7)</code>:</strong><br/>
              {sumResult}
            </p>
          </div>
        )}

        <p>
          Edit <code>src/App.tsx</code> or <code>wasm/src/lib.rs</code> and save to reload.
        </p>
      </header>
    </div>
  );
}

export default App;
