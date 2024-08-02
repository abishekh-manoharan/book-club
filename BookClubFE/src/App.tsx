import { Route, Routes } from "react-router-dom"
import Header from './components/Header'
import Register from './components/Register'
import Login from './components/Login'
import { authContext } from "./utils/context"
import AuthService from './services/auth';

import './App.css'
import { useEffect, useState } from "react"

function App() {
  const [auth, setAuth] = useState(false);

  // gets and sets the current session's auth status
  useEffect(() => {
    AuthService.status().then(res => setAuth(res));
    // add 1 second buffer time to page display on initial load to ensure correct auth-based elements are displayed
    setTimeout(() => { 
      document.querySelector('.page')?.classList.remove('hidden');
    }, 1000);
  }, []);


  return (
    <div className="page hidden">
      <authContext.Provider value={{ auth, setAuth }}>
        <Routes>
          <Route element=<Header /> >
            <Route path="/" element=<div>Home</div> />
            <Route path="register" element=<Register /> />
            <Route path="login" element=<Login /> />
          </Route>
        </Routes >
      </authContext.Provider>
    </div>
  )
}

export default App
