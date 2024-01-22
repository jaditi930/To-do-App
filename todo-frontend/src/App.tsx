import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from "./components/Home"
import NavBar from "./components/NavBar"

import './App.css';

function App() {

  const [token,setToken]=useState("")
  return (
    <BrowserRouter>
    <NavBar token={token}/>
    <Routes>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="login" element={<Login setToken={setToken}/>}/>
      <Route path="/home" element={<Home token={token}/>}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
