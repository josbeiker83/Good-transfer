import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeroSection from "./components/HeroSection";
import ServicesSection from "./components/ServicesSection";
import ContactSection from "./components/ContactSection";
import PWAInstaller from "./components/PWAInstaller";
import { handlePWAShortcuts, registerServiceWorker } from "./utils/pwaUtils";

const Home = () => {
  useEffect(() => {
    // Handle PWA shortcuts when app loads
    handlePWAShortcuts();
    
    // Register service worker
    registerServiceWorker();
  }, []);

  return (
    <div className="min-h-screen">
      <HeroSection />
      <ServicesSection />
      <ContactSection />
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <PWAInstaller />
    </div>
  );
}

export default App;