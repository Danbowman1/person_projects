import React from 'react';
import './base.css'
import './App.css';
import { BrowserRouter as Router, Link, Routes, Route } from 'react-router-dom';
import Upload from './views/Upload.js';
import Home from './views/Home.js';
function App() {
    return (
        <div className="container">
            <Router>
                <nav className="nav">
                    <div className="nav-brand">Cloudinary Demo</div>
                    <ul className="nav-items">
                        <li className="nav-item">
                            <Link to="/">Gallery</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/upload">Upload</Link>
                        </li>
                    </ul>
                </nav>
                <Routes>
                    <Route element={<Upload/>} path="/upload" />
                    <Route element={<Home/>} path="/" />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
