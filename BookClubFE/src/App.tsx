import { Route, Routes } from "react-router-dom"
import Header from './components/Header'
import Register from './components/Register'
import Login from './components/Login'
import { authContext } from "./utils/context"

import './App.css'
import { useState } from "react"

function App() {
  const [auth, setAuth] = useState(false);

  return (
    <>
      <authContext.Provider value={{ auth, setAuth }}>
        <Routes>
          <Route element=<Header /> >
            <Route path="/" element=<div>Home</div> />
            <Route path="register" element=<Register /> />
            <Route path="login" element=<Login /> />
          </Route>
        </Routes >
      </authContext.Provider>
    </>
  )
}

export default App
