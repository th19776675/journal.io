import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import "./app.css";
import Header from './components/Header/Header';
import Login from './pages/Login';
import Auth from "./utils/auth";
import { CurrentUserProvider } from "./utils/CurrentUserContext"

const App = () => {
  // const [selectedData, setData] = useState(getDaily())
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
          {/* <Nav />
          <Display /> */}
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
