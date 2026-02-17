import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/clean.css";
import HomePage from "./pages/HomePage";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Certifications from "./pages/Certifications";
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
        <Route path="/about" element={
          <>
            <About />
            <ChatBot />
          </>
        } />
        <Route path="/certifications" element={
          <>
            <Certifications />
            <ChatBot />
          </>
        } />
        <Route path="/contact" element={
          <>
            <Contact />
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
