import React, { useState, useEffect, useRef } from 'react';
import "./BonnyModal.css"

const BonnyModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(true); // Modal is open by default
    const [isSpeaking, setIsSpeaking] = useState(true); // Start speaking 
    const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState('');
    
    const [currentImage, setCurrentImage] = useState("images/bonnyclosed.png");
    let audioFileRef  = useRef(new Audio("images/speaking-animal-crossing-sound-effect-made-with-Voicemod.mp3"));

  // Sentences to display
  const sentences = [
    "  well, well, well... look who decIded to show up! welcome to the show, my friend.  ",
    "  you’re just in time for the main act. the lights are Dim, the stage is set.  ",
    "  and i’m hEre to make sure your stay is unforgettable.  ",
    "  let’s see if you cAn make it till morning. hee hee hee  "
  ];

    // Refs to manage intervals and timeouts
    const typewriterIntervalRef = useRef<number | null>(null); // Allow number (browser) or null
    const audioTimeoutRef = useRef<number | null>(null); // Allow number (browser) or null  

  // Function to advance to the next sentence
  const nextSentence = () => {
      if (currentSentenceIndex < sentences.length - 1) {
        setCurrentSentenceIndex(currentSentenceIndex + 1);
        setDisplayedText(''); // Reset displayed text for the new sentence
      }
      else {
        setCurrentSentenceIndex(0);
        setDisplayedText(''); // Reset displayed text for the new sentence
      }
  };

  // Effect for the typewriter animation and audio
  useEffect(() => {
    if (isModalOpen) {
      const currentSentence = sentences[currentSentenceIndex];

      // Play audio for 4 seconds
      audioFileRef.current.play().catch(error => console.error("Audio Playback Error:", error));

      // audioTimeoutRef.current = window.setTimeout(() => {
      //   audioFileRef.current.pause(); // Pause after 4 seconds
      // }, 4000);

      // Typewriter effect
      let currentCharIndex = 0;
      typewriterIntervalRef.current = window.setInterval(() => {
        if (currentCharIndex < currentSentence.length - 1) {
          setDisplayedText((prev) => prev + currentSentence[currentCharIndex]);
          currentCharIndex++;
        } else {
          if (typewriterIntervalRef.current) {
            clearInterval(typewriterIntervalRef.current); // Stop the interval when the sentence is complete
          }
        }
      }, 50); // Adjust typing speed (50ms per character)
    }

    // Cleanup intervals and audio
    return () => {
      if (typewriterIntervalRef.current) clearInterval(typewriterIntervalRef.current);
      if (audioTimeoutRef.current) clearTimeout(audioTimeoutRef.current);
      audioFileRef.current.pause(); // Pause audio when the effect is cleaned up
    };

  }, [isModalOpen, currentSentenceIndex]);


  // // Effect to handle the speaking animation
  // useEffect(() => {
  //   let timeout : any;

  //   const switchImage = () => {
  //     setCurrentImage((prevImage) =>
  //       prevImage === 'images/bonnyclosed.png' ? 'images/bonnyopen.png' : 'images/bonnyclosed.png'
  //     );

  //     // Set a new random delay for the next switch
  //     const randomDelay = Math.floor(Math.random() * 200) + 100; // Random delay between 100ms and 500ms
  //     timeout = setTimeout(switchImage, randomDelay);
  //   };

  //   if (isSpeaking) {
  //       // Start the first switch with a random delay
  //       const initialDelay = Math.floor(Math.random() * 200) + 100;
  //       timeout = setTimeout(switchImage, initialDelay);
  //     } else {
  //       setCurrentImage('bonnyclosed.png'); // Reset to closed image when not speaking
  //     }

  //   // Cleanup timeout on unmount or when isSpeaking changes
  //   return () => clearTimeout(timeout);
  // }, [isSpeaking]);

  //disabled={currentSentenceIndex === sentences.length - 1}
  return (
    <div className="modal">
          <img src="images/bonnyopen.png" alt="Bonny" />
          <div className="text-container">
            <p>{displayedText}</p>
            <button onClick={nextSentence}>
                {currentSentenceIndex === sentences.length - 1 ? "Restart" : ">"}
              </button>
          </div>
        </div>
  );
};

export default BonnyModal;