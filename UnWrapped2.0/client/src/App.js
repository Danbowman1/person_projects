import MyContext from './context/MyContext';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from './views/Main';
import { useState } from 'react';


function App() {

  const [ image, setImage ] = useState('')

  return (

    <BrowserRouter>

      <div className="App">

        <MyContext.Provider value={{ image, setImage }}>
          <Routes>
            <Route path='/' element={<Main />}/>
          </Routes>
        </MyContext.Provider>

      </div>

    </BrowserRouter>
    
  );
}

export default App;
