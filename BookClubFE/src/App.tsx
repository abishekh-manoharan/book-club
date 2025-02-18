import { Route, Routes } from "react-router-dom"
import Header from './components/Header'
import Register from './components/Register'
import Login from './components/Login'
import Create from "./features/club/Create"
import JoinedClubs from "./features/club/JoinedClubs"
// import { authContext } from "./utils/context"
// import AuthService from './services/auth';

import './App.css'
// import { useEffect, useState } from "react"
import { useGetStatusQuery } from "./features/auth/authSlice"
import classNames from "classnames"
import ClubHome from "./features/club/ClubHome"
// import { useAppSelector } from "./app/hooks"

function App() {
  // const [auth, setAuth] = useState(false);
  const { isFetching } = useGetStatusQuery();

  // gets and sets the current session's auth status
  // useEffect(() => {
  //   AuthService.status().then(res => setAuth(res));
  //   // add 1 second buffer time to page display on initial load to ensure correct auth-based elements are displayed
  //   setTimeout(() => { 
  //     document.querySelector('.page')?.classList.remove('hidden');
  //   }, 1000);
  // }, []);
  // console.log('status '+data);
  const pageHiddenClassWrapper = classNames('page', {
    'hidden': isFetching
  })

  return (
    <div className={pageHiddenClassWrapper}>
        <Routes>
          <Route element=<Header /> >
            <Route path="/" element=<div>Home</div> />
            <Route path="register" element=<Register /> />
            <Route path="login" element=<Login /> />
            <Route path="createClub" element=<Create /> />
            <Route path="joinedClubs" element=<JoinedClubs /> />
            <Route path="club/:id">
              <Route path="home" element=<ClubHome /> /> 
            </Route>
          </Route>
        </Routes >
    </div>
  )
}

export default App
