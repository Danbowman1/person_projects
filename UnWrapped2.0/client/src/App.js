import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from './views/Main';
import OneCigar from './components/OneCigar';

function App() {


  return (
    <BrowserRouter>

      <div className="App">

        <Routes>
          <Route path='/' element={<Main />}/>
          <Route path='/cigar' element={<OneCigar />}/>
        </Routes>

      </div>

    </BrowserRouter>
    
  );
}

export default App;
