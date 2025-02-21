import React, { useState } from 'react';
import './Music.css';
import HomeButton from '../Home/HomeButton';

const imageStacks = [
  [
    'images/red-velvet-cake.jpg',
    'images/coachella.jpg',
    'images/milkshake.jpg',
  ],
  [
    'images/green-calender.jpg',
    'images/trump.jpg',
    'images/boulevard-of-broken-dreams.jpg',
  ],
  [
    'images/behind-the-scenes.jpeg',
    'images/bee.jpeg',
    'images/bluegraybird.jpeg',
  ],
  [
    'images/mamamoo.jpeg',
    'images/purple.png',
    'images/yes-i-am.jpeg',
  ],
  [
    'images/orange-caramel.jpeg',
    'images/lipstick.jpeg',
    'images/lipstick.jpeg',
  ],
  [
    'images/cold-kids-playing.jpg',
    'images/parachutes.jpeg',
    'images/yellow.png',
  ],
  [], // Empty stack for the text content
];

const MusicLandingPage: React.FC = () => {
  const [currentStackIndex, setCurrentStackIndex] = useState(0);

  const goToNextStack = () => {
    setCurrentStackIndex((prevIndex) => (prevIndex + 1) % imageStacks.length);
  };

  const goToPreviousStack = () => {
    setCurrentStackIndex((prevIndex) =>
      prevIndex === 0 ? imageStacks.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <div className="App">
      <div className="image-stack-container">
        <button className="arrow-button" onClick={goToPreviousStack}>
          &#10094;
        </button>
        <div className="image-stack">
          {currentStackIndex !== 6 ? (
            imageStacks[currentStackIndex].map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Stack ${currentStackIndex + 1} - Image ${index + 1}`}
                className={`stacked-image image-${index}`}
              />
            ))
          ) : (
            <>
              <div id="red"><img
                  src="images/bonnyclosed.png"
                  height={30}
                  alt="Bonny Music 1"
                  style={{ position: 'relative', top: '5px' }} // Added alt text for accessibility
              />
            [al.] loses its ends - suffix - Kim Jiwoo from loona
              </div>
              <div id="orange"><img
                  src="images/bonnyclosed.png"
                  height={30}
                  alt="Bonny Music 2"
                  style={{ position: 'relative', top: '5px' }} // Added alt text for accessibility
              />Just started baking a [ar.]</div>
              <div id="blue">
              <img
                  src="images/bonnyclosed.png"
                  height={30}
                  alt="Bonny Music 3"
                  style={{ position: 'relative', top: '5px' }} // Added alt text for accessibility
              />
                [al.] - ([al.], we hear)</div>
              <div id="purple">
              <img
                  src="images/bonnyclosed.png"
                  height={30}
                  alt="Bonny Music 4"
                  style={{ position: 'relative', top: '5px' }}// Added alt text for accessibility
              />[so.] : The letter it last only one long to telegraph.
              </div>
              <div id="green"><img
                  src="images/bonnyclosed.png"
                  height={30}
                  alt="Bonny Music 5"
                  style={{ position: 'relative', top: '5px' }} // Added alt text for accessibility
              />The [al.] is the last one standing.</div>
              <div id="yellow"><img
                  src="images/bonnyclosed.png"
                  height={30}
                  alt="Bonny Music 6"
                  style={{ position: 'relative', top: '5px' }} // Added alt text for accessibility
              />[so.] - pests - botox area</div>
            </>
          )}
        </div>
        <button className="arrow-button" onClick={goToNextStack}>
          &#10095;
        </button>
      </div>
    </div>
    <HomeButton/>
    </div>
  );
};

export default MusicLandingPage;