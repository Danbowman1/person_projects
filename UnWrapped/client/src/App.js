import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Main from './views/Main';
import EditCigar from './components/EditCigar';
import UserLogin from './views/UserLogin';
import OneCigar from './views/OneCigar';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
        <Route path='/' element={<Main/>} />
        <Route path='/cigar/edit/:id' element={<EditCigar/>} />
        <Route path='/cigar/login' element={<UserLogin />} />
        <Route path='/cigar/:id' element={<OneCigar />} />
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
