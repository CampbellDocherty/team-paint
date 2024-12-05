import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router';
import Home from './pages/Home';
import './index.css';
import { Casual } from './pages/Casual';
import { TeamName } from './pages/TeamName';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/name" element={<TeamName />} />
        <Route path="/casual" element={<Casual />} />
      </Routes>
    </HashRouter>
  </React.StrictMode>,
);
