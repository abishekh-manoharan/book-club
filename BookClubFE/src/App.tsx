import { Navigate, Route, Routes } from "react-router-dom"
// import Header from './components/Header'
// import Register from './features/auth/Register'
// import Login from './features/auth/Login'
// import Create from "./features/club/Create"
// import JoinedClubs from "./features/club/JoinedClubs"
// import { authContext } from "./utils/context"
// import AuthService from './services/auth';

import './App.css'
// import { useEffect, useState } from "react"
import { useGetStatusQuery } from "./features/auth/authSlice"
import classNames from "classnames"
import Club from "./features/club/home/Club"
import ErrorMsg from "./features/error/ErrorMsg"
import { useAppSelector } from "./app/hooks"
import { selectError } from "./features/error/errorSlice"
import CreateReading from "./features/reading/CreateReading/CreateReading"
import ReadingHome from "./features/reading/ReadingHome"
// import NotificationHeader from "./features/notification/NotificationHeader"

//TODO: uncomment
// import { useGetAllNotificationsQuery } from "./features/notification/notificationSlice"
import Main from "./components/Main"
import JoinedClubs from "./features/club/list/JoinedClubs"
import ActiveReadings from "./features/reading/ActiveReadings/ActiveReadings"
import Login from "./features/auth/Login"
import Create from "./features/club/Create"
import ReadingsList from "./features/reading/ReadingsList"
// import MembersList from "./features/club/members/MembersList"
import Members from "./features/club/members/Members"
import MembersList from "./features/club/members/MembersList"
import JoinRequests from "./features/club/home/JoinRequests/JoinRequests"

function App() {
  const { data: status, isFetching } = useGetStatusQuery();
  const error = useAppSelector(selectError)
  //TODO: uncomment
  // useGetAllNotificationsQuery(undefined, {
  //   pollingInterval: 30000,
  //   refetchOnMountOrArgChange: true
  // });

  const pageHiddenClassWrapper = classNames('page', {
    'hidden': isFetching
  })

  return (
    <div className={pageHiddenClassWrapper}>
      {error.error && <ErrorMsg msg={error.errorMsg} />}
      {/* <NotificationHeader/> */}
      <Routes>
        <Route path="/" element=<Main status={status ?? false} /> >
          <Route path="home" element=<div>Home</div> />
          <Route path="clubs" element=<JoinedClubs />/>
          <Route path="createClub" element=<Create backLocation="clubs" /> />
          <Route path="club/:clubid" element=<Club /> >
            <Route index element={<Navigate to="readings" replace />} />
            <Route path="readings" element=<ReadingsList /> />
            <Route path="members" element=<MembersList /> />
            <Route path="requests" element=<JoinRequests /> />
            <Route path="createReading" element=<CreateReading /> />
            <Route path="reading/:bookid" element=<ReadingHome /> />
          </Route>
          <Route path="activeReadings" element=<ActiveReadings /> />
          <Route path="login" element=<Login /> />
        </Route>
      </Routes >
    </div>
  )
}

export default App
