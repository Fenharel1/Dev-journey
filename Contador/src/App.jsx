import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Counter: {count}</h1>
      <button onClick={()=>{setCount(count + 1)}} >Add</button>
      <button onClick={()=>{setCount(0)}} >Reset</button>
      <button onClick={()=>{setCount(count - 1)}} >Dec</button>
    </> 
  )
}

export default App