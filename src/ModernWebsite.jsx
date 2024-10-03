import React, { useState, useRef } from 'react';
import { Plus, Minus } from 'lucide-react';

const ingredients = [
  { name: 'Buns', color: 'bg-yellow-200', img: '/images/bun.png' },
  { name: 'Tomato', color: 'bg-red-400', img: '/images/tomato.png' },
  { name: 'Mayonnaise', color: 'bg-gray-400', img: '/images/mayonese.png' },
  { name: 'Cheese', color: 'bg-yellow-400', img: '/images/cheese.png' },
  { name: 'Ketchup', color: 'bg-red-600', img: '/images/ketchup.png' },
  { name: 'Beef', color: 'bg-orange-400', img: '/images/beef.png' },
  { name: 'Egg', color: 'bg-gray-200', img: '/images/egg.png' },
  { name: 'Vegetable', color: 'bg-green-400', img: '/images/veg.png' },
  { name: 'Chicken', color: 'bg-orange-200', img: '/images/chicken.png' },
  { name: 'Onion', color: 'bg-purple-200', img: '/images/onion.png' },
];

const IngredientPanel = () => {
  const [counts, setCounts] = useState(
    Object.fromEntries(ingredients.map((ing) => [ing.name, 0]))
  );
  const [displayedImages, setDisplayedImages] = useState([]);
  const imageContainerRef = useRef(null);

  const updateCount = (ingredient, increment) => {
    const newCount = Math.max(0, counts[ingredient] + increment);

    // Update counts first
    setCounts((prev) => ({ ...prev, [ingredient]: newCount }));

    // Efficiently add or remove images using a spread operator
    setDisplayedImages((prevImages) => {
      if (increment > 0) {
        // Add the new image to the beginning of the array
        return [ingredients.find((ing) => ing.name === ingredient)?.img, ...prevImages];
      } else if (increment < 0 && newCount < counts[ingredient]) {
        // Remove the last occurrence of the ingredient's image
        const ingredientImg = ingredients.find((ing) => ing.name === ingredient)?.img;
        const filteredImages = prevImages.filter((img) => img !== ingredientImg);
        return filteredImages;
      }
      return prevImages; // No change
    });

    // Adjust the image container's position to center the first image vertically
    if (imageContainerRef.current) {
      const containerHeight = imageContainerRef.current.offsetHeight;
      const firstImageHeight = imageContainerRef.current.children[0]?.offsetHeight || 0;
      const topPosition = (containerHeight - firstImageHeight) / 2;
      imageContainerRef.current.style.top = `${topPosition}px`;
    }
  };

  return (
    <div className="w-full h-full bg-white shadow-lg p-6 overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-6 text-center">Ingredients</h2>
      <div className="space-y-4">
        {ingredients.map((ing) => (
          <div key={ing.name} className={`${ing.color} p-4 rounded-lg flex items-center justify-between`}>
            <span className="font-medium">{ing.name}</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => updateCount(ing.name, -1)}
                className="bg-red-500 text-white p-1 rounded hover:bg-red-600 transition duration-150"
              >
                <Minus size={16} />
              </button>
              <span className="w-8 text-center">{counts[ing.name]}</span>
              <button
                onClick={() => updateCount(ing.name, 1)}
                className="bg-green-500 text-white p-1 rounded hover:bg-green-600 transition duration-150"
              >
                <Plus size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Display Images */}
      <div className="absolute top-0 left-[30%] transform -translate-x-1/2 flex flex-col items-center justify-center h-full" ref={imageContainerRef}>
        {displayedImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt="Ingredient"
            className="w-40 h-40 object-contain"
          />
        ))}
      </div>
    </div>
  );
};

const ModernWebsite = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center p-10">
        <h1 className="text-5xl font-bold mt-0 text-center bg-gradient-to-r from-yellow-400 via-red-500 to-green-400 text-transparent bg-clip-text">
          Welcome to the Kitchen
        </h1>
        <p className="text-lg text-gray-700 text-center mt-4">Make the most Delicious Burger you want.</p>
      </div>

      {/* Right panel (20% width) */}
      <div className="w-[20%] h-full">
        <IngredientPanel />
      </div>
    </div>
  );
};

export default ModernWebsite;