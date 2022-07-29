import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./app.css";
import Header from './components/Header';
import Nav from './components/Nav';
import Display from './components/Display';

import DailyAside from './pages/DailyAside';
import JournalAside from './pages/JournalAside';
import JournalUserAside from './pages/JournalUserAside';
import AllJournalsAside from './pages/AllJournalsAside';
import AllUsersAside from './pages/AllUsersAside';

import Login from './pages/Login';
import Auth from "./utils/auth";
import { CurrentUserProvider } from "./utils/CurrentUserContext"

const App = () => {
  if (!Auth.loggedIn()) {
    return(
      <>
        <Login />
      </>
    )
  }

  return (
    <Router>
      <CurrentUserProvider>
        <div className="app-wrapper">
          <main className='app-main'>
            <Header />
            <Nav />
            <Display />
          </main>
          <aside className='app-aside'>
            <Routes>
              {/* <Route 
                path='/' 
                element={<Home />} 
              /> */}
              <Route
                path="/daily"
                element={<DailyAside />}
              />
              <Route
                path="/journal/:journalId/page/:pageId"
                element={<JournalAside />}
              />
              <Route
                path="/journal/:journalId"
                element={<JournalAside />}
              />
              <Route
                path="/journal/:journalId/publish"
                element={<JournalAside />}
              />
              <Route
                path="/journals/user"
                element={<JournalUserAside />}
              />
              <Route
                path="/journals/create"
                element={<JournalUserAside />}
              />
              <Route
                path="/journals"
                element={<AllJournalsAside />}
              />
              <Route
                path="/users"
                element={<AllUsersAside />}
              />
            </Routes>
          </aside>
        </div>
      </CurrentUserProvider>
    </Router>
  );
}

export default App;
