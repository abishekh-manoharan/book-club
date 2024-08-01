import { Route, Routes } from "react-router-dom"
import Header from './components/Header'
import Register from './components/Register'
import Login from './components/Login'

import './App.css'

function App() {
  return (
    <>
        <Routes>
          <Route element=<Header /> >
            <Route path="/" element=<div>Home</div> />
            <Route path="register" element=<Register /> />
            <Route path="login" element=<Login /> />
          </Route>
        </Routes >
    </>
  )
}

export default App
