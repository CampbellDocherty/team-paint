import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router';
import App from './App';
import './index.css';
import { Casual } from './NewGame';
import { TeamName } from './TeamName';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/name" element={<TeamName />} />
        <Route path="/casual" element={<Casual />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
