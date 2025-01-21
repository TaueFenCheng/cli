import {useState} from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Button from './components/Button'
import CountDown from './components/CountDown'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
        <a href="https://reactjs.org" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Rspack + React + TypeScript + Rxjs</h1>
      <Button />
      <div className="card">
        <button type="button" onClick={() => setCount(count => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      {/* <CountDown count={200}/> */}
      <p className="read-the-docs">Click on the Rspack and React logos to learn more</p>
    </div>
  )
}

export default App
