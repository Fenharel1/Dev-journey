import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import axios from 'axios'

function App() {
  const [count, setCount] = useState(0)

  const login = async () => {
    const response = await axios.post("http://localhost:5000/api/v1/security/auth/login", {username: 'rei1@email.com', password: 'string'})
    console.log(response)
  }

  return (
    <>
      <h1>Counter: {count}</h1>
      <button onClick={()=>{setCount(count + 1)}} >Add</button>
      <button onClick={login} >Login</button>
      <button onClick={()=>{setCount(0)}} >Reset</button>
      <button onClick={()=>{setCount(count - 1)}} >Dec</button>
    </> 
  )
}

export default App