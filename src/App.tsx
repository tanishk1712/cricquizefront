import React from 'react';
import Common from './component/Common';
import LoginSignup from './component/Login';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import TermsAndConditions from './component/TermsAndConditions';

export default function App() {
  const token: string | null = localStorage.getItem('token');
  console.log(token, 'User Token');

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={token ? <Common /> : <Navigate to="/auth" replace />}
        />
         <Route
          path="/terms-conditions"
          element={ <TermsAndConditions />} 
        />
        <Route
          path="/auth"
          element={!token ? <LoginSignup /> : <Navigate to="/" replace />}
        />
        
      </Routes>
    </BrowserRouter>
  );
}
