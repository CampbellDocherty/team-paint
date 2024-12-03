import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter, Routes, Route } from 'react-router';
import './index.css';
import { NewGame } from './NewGame';
import { TeamName } from './TeamName';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/name" element={<TeamName />} />
        <Route path="/new" element={<NewGame />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
