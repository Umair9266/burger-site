import React from 'react';
import { useNavigate } from 'react-router-dom';
import burgerImage from './download.png'; // Replace with actual path to your image

const BurgerPage = () => {
  const navigate = useNavigate();

  // Function to handle click and navigate to ModernWebsite
  const handleBurgerClick = () => {
    navigate('/modern-website');
  };

  return (
    <div className="bg-white h-screen flex flex-col items-center justify-center overflow-visible">
        <h1 className="text-8xl font-bold mb-20 text-center leading-tight bg-gradient-to-r from-yellow-400 via-red-500 to-green-400 text-transparent bg-clip-text">
        Let's Make Your Burger
        </h1>
      
      {/* Animated burger image with onClick to navigate */}
      <div className="w-48 h-48 cursor-pointer" onClick={handleBurgerClick}>
        <img 
          src={burgerImage} 
          alt="Burger" 
          className="w-full h-full animate-bounce-slow"
        />
      </div>
    </div>
  );
};

export default BurgerPage;
