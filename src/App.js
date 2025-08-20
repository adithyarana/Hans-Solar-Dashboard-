  // src/App.js
  import React from 'react';
  import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
  import Header from './components/Header';
import Home from './pages/Home.js';
  function App() {
      return (
          <Router>
              <Header />
              <Routes>
                  <Route path="/" element={<Home />} />
                  {/* Define more routes as needed */}
              </Routes>
          </Router>
      );
  }

  export default App;
  