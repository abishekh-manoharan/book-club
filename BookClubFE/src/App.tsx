import { Route, Routes } from "react-router-dom"
import Header from './components/Header'
import Register from './components/Register'

import './App.css'

function App() {
  return (
    <>
        <Routes>
          <Route element=<Header /> >
            <Route path="/" element=<>Home</> />
            <Route path="register" element=<Register /> />
          </Route>
        </Routes >
    </>
  )
}

export default App
