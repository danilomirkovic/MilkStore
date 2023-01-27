import React from 'react';
import { BrowserRouter, Route, Routes} from "react-router-dom";
import Milk from './Components/Milk';

function App() {
  return (
      <div className="App">
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Milk/>} />
            </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;