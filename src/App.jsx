import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div className="App">
          <Routes>    
            <Route path="/data" element={
              <DataManager 
                seasons={seasons}
                teams={teams}
                importData={importData}
              />
            } />

          </Routes>
      </div>
    </Router>
  );
}


export default App
