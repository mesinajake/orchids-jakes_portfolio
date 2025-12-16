import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';
import "./styles/clean.css";
import HomePage from "./pages/HomePage";
import Portfolio from "./pages/Portfolio";
import ChatBot from "./components/ChatBot";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={
          <>
            <HomePage />
            <ChatBot />
          </>
        } />
        <Route path="/portfolio" element={
          <>
            <Portfolio />
            <ChatBot />
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;