import React, { useEffect, useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./app.css";
import Header from './components/Header';
import Nav from './components/Nav';
import Display from './components/Display';
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
        <main className='app-main'>
          <Header />
          <Nav />
          <Display />
        </main>
        <aside className='app-aside'>
          {/* <Routes>
            <Route 
              path='/' 
              element={<Home />} 
            />
          </Routes> */}
        </aside>
      </CurrentUserProvider>
    </Router>
  );
}

export default App;
