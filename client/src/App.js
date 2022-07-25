import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Header from './components/Header/Header';

function App() {
  return (
    <Router>
      <>
        <Header />
        <main>
        {/* <Routes>
          <Route 
            path='/' 
            element={<Home />} 
          />
          <Route 
            path='/journals' 
            element={<Journals />} 
          />
          <Route 
            path='/create' 
            element={<CreateJournal />} 
          />
          <Route 
            path='/pages' 
            element={<Pages />} 
          />
          <Route 
            path='/login' 
            element={<Login />} 
          />
          <Route 
            path='/:userId'
            element={<UserProfile />}
          />
          <Route 
            path='/journal/:journalId'
            element={<Journal />}
          />
          <Route 
            path='/write'
            element={<Page />}
          />
        </Routes> */}
        </main>
      </>
    </Router>
  );
}

export default App;
