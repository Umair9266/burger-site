import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import BurgerPage from './BurgerPage';
import ModernWebsite from './ModernWebsite'; // Import the ModernWebsite

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Route for the BurgerPage, which will be displayed first */}
        <Route path="/" element={<BurgerPage />} />
        {/* Route for the ModernWebsite */}
        <Route path="/modern-website" element={<ModernWebsite />} />
      </Routes>
    </Router>
  );
};

export default App;
