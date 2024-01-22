import React from 'react';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from './components/SignUp';
import Login from './components/Login';
import Home from "./components/Home"

import './App.css';
import Alert from './components/Alert';

function App() {

  const [token,setToken]=useState("")
  const [alertMsg,setAlertMsg]=useState<string>("")
  return (
    <BrowserRouter>
    <Alert message={alertMsg}/>
    <Routes>
    <Route path="/" element={<Login setToken={setToken} setAlertMsg={setAlertMsg} />}/>
      <Route path="/signup" element={<SignUp setAlertMsg={setAlertMsg} />}/>
      <Route path="/home" element={<Home token={token} setAlertMsg={setAlertMsg} />}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
