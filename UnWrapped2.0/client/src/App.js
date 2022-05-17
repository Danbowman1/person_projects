import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from './views/Main';


function App() {


  return (
    <BrowserRouter>

      <div className="App">

        <Routes>
          <Route path='/' element={<Main />}/>
        </Routes>

      </div>

    </BrowserRouter>
    
  );
}

export default App;
