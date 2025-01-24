import { lazy, Suspense, useState } from "react";
// import Button from "./components/button";
import "./App.css";

const Button = lazy(()=> import('./components/button'))
function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Suspense fallback={<>loading</>}>
        <h1>Rspack + React + TypeScript</h1>
      </Suspense>
      <div className="card">
        <button type="button" onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <Button />
      <p className="read-the-docs">
        Click on the Rspack and React logos to learn more
      </p>
    </div>
  );
}

export default App;
