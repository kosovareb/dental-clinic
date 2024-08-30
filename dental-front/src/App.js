import React, { useState, useEffect } from "react";
import "./App.css";
import HomePage from "./containers/home/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from "./containers/auth/LoginForm"; 
import UnauthorizedAccess from "./components/unauthorizedAccess/unauthorizedAccess";
import Dashboard from "./components/dashboard/Dashboard";

function App() {
  const [loggedIn, setLoggedIn] = useState(false); 
  const [userRole, setUserRole] = useState(''); 
 
  useEffect(() => {
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('userRole');

    if (token && role) {
      setLoggedIn(true);
      setUserRole(role);
    }
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage loggedIn={loggedIn } userRole={userRole}/>} />
          <Route 
            path="/login" 
            element={<Form setLoggedIn={setLoggedIn} setUserRole={setUserRole} />} 
          />
          {loggedIn && userRole === 'admin' ? (
            <Route path="/dashboard" element={<Dashboard />} />
          ) : (
            <Route path="/dashboard" element={<UnauthorizedAccess />} />
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
