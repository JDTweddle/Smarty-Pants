import React from 'react';
import './Recognition.css';
const Recognition = ({ imageUrl, boxes, concepts }) => {
  // Helper function to generate a color hash based on the concept name
  const getColorHash = (name) => {
    const hash = name.split('').reduce((acc, char) => char.charCodeAt(0) + acc, 0);
    const hue = hash % 360; // Use modulo to ensure it stays within valid hue values (0 to 359)
    return `hsl(${hue}, 70%, 50%)`; // Use HSL color representation
  };

  return (
    <div className='center ma'>
      <div className='absolute mt5' style={{ position: 'relative' }}>
        <img id='inputimage' alt='' src={imageUrl} width='600px' height='auto' />
        {concepts.map((conceptArray, index) => {
          const concept = conceptArray[0]; // Extract the first (and only) concept in the array
          const boxColor = getColorHash(concept.name);
          
          return (
            <div key={index} className='bounding-box' style={{
              top: boxes[index].topRow,
              right: boxes[index].rightCol,
              bottom: boxes[index].bottomRow,
              left: boxes[index].leftCol,
              position: 'absolute',
              borderColor: boxColor,
            }}>
              <p className="concept-label" style={{ backgroundColor: boxColor }}>
                {concept.name}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Recognition;