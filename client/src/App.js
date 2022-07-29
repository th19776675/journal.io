import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./app.css";
import Header from './components/Header';
import Nav from './components/Nav';
import Display from './components/Display';

import DailyAside from './pages/DailyAside';

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
            </Routes>
          </aside>
        </div>
      </CurrentUserProvider>
    </Router>
  );
}

export default App;
