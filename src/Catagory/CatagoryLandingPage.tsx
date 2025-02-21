import { useState, useEffect } from "react";
import "./index.css";
import Popup from "reactjs-popup";
import ReactModal from 'react-modal';
import CloseButton from 'react-bootstrap/CloseButton';
import { Link } from "react-router-dom";
import { Routes, Route, useNavigate } from 'react-router-dom';
import React from "react";
import HomeButton from "../Home/HomeButton";

const images = [
    'images/hummingbird.png',
    'images/butterfly.png',
    'images/cats.png',
    'images/horses.png',
    'images/whale.png',
];

const CatagoryLandingPage: React.FC = () => {
    const [currentStackIndex, setCurrentStackIndex] = useState(0);

    const goToNextStack = () => {
        setCurrentStackIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToPreviousStack = () => {
        setCurrentStackIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    return (
        <div className="category-page-container"> {/* Added a container for positioning */}
            <img
                src="images/bonnyclosed.png"
                height={50}
                className="bonny-top-left" 
                alt="Bonny Top Left" // Added alt text for accessibility
            />
            <img
                src="images/bonnyclosed.png"
                height={50}
                className="bonny-bottom-right" 
                style={{ transform: 'scaleX(-1)' }} 
                alt="Bonny Bottom Right" // Added alt text for accessibility
            />
            <div className="App">
                <div className="image-stack-container">
                    <>
                        <button className="arrow-button" onClick={goToPreviousStack}>
                            &#10094;
                        </button>
                    </>
                    <br></br>
                    <img
                        key={currentStackIndex}
                        src={images[currentStackIndex]}
                        className={`image`}
                        alt="Category Image" // Added alt text for accessibility
                    />
                    <button className="arrow-button" onClick={goToNextStack}>
                        &#10095;
                    </button>
                </div>
            </div>
            <HomeButton />
        </div>
    );
};

export default CatagoryLandingPage;