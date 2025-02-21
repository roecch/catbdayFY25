import { useState,useEffect} from "react";
import "./index.css"
import Popup from "reactjs-popup";
import ReactModal from'react-modal';
import CloseButton from 'react-bootstrap/CloseButton';
import { Link } from "react-router-dom";
import {Routes, Route, useNavigate} from 'react-router-dom';
import PasswordChecker from "./PasswordChecker";
import React from "react";
import BonnyModal from "./BonnyModal";

function Home() {
    const [giftClicked, setGiftClicked] = useState(false);
    const [open, setOpen] = useState(false);
    const [correctPasswords, setCorrectPasswords] = useState<number[]>([]); // Track which passwords are correct
    const navigate = useNavigate();

    // i
    const navigateToP1= () => {
      localStorage.setItem('correctPasswords', JSON.stringify(correctPasswords));
        navigate('/Catagory'); // a
      };
    const navigateToP2= () => {
      localStorage.setItem('correctPasswords', JSON.stringify(correctPasswords));
        navigate('/Music'); // t
      };
    const navigateToP3= () => {
      localStorage.setItem('correctPasswords', JSON.stringify(correctPasswords));
        navigate('/Mahjong'); // 
      };
    const navigateToP4= () => {
      localStorage.setItem('correctPasswords', JSON.stringify(correctPasswords));
        navigate('/Map'); // d
      };
    const navigateToP5= () => {
      localStorage.setItem('correctPasswords', JSON.stringify(correctPasswords));
        navigate('/TextMeTheQuestion');
      };
  
      function getLocalStorageItem(key: string): Promise<string | null> {
        return new Promise((resolve) => {
          const value = localStorage.getItem(key);
          if (value !== null) {
            resolve(value);
          } else {
            const intervalId = setInterval(() => {
              const newValue = localStorage.getItem(key);
              if (newValue !== null) {
                clearInterval(intervalId);
                resolve(newValue);
              }
            }, 100); // Check every 100 milliseconds
          }
        });
      }
    
      async function getLocalStoragePasswords() {
        const savedPasswords = await getLocalStorageItem('correctPasswords');
        console.log(savedPasswords)
        if (savedPasswords) {
            setCorrectPasswords(JSON.parse(savedPasswords));
            console.log(correctPasswords)
        }
      }

    // Load correct passwords from local storage on component mount
    useEffect(() => {

        getLocalStoragePasswords()

        const giftClickedBefore = localStorage.getItem('giftClicked');
        if (giftClickedBefore === "true") {
            console.log("here")
            setGiftClicked(true);
        }
        console.log(giftClickedBefore)
        console.log(true)
        console.log(giftClicked)
    }, []);

    // Handle when a password is correct
    const handlePasswordCorrect = (passwordNumber: number) => {
        if (!correctPasswords.includes(passwordNumber)) {
            setCorrectPasswords([...correctPasswords, passwordNumber]);
        }
    };

    const handleGiftClicked = () => {
        setGiftClicked(true); 
        localStorage.setItem('giftClicked', 'true');
    };


    return(
    <div className="home">
        <div className="glowing-gift" onClick={() => {setOpen(!open); 
                                                        handleGiftClicked()}}>
            <img src="images/kado.png" alt="gift" id="gift-back"/>
            <img src="images/kado.png" alt="gift" id="gift"/>
        </div>
            Happy Birthday!
            <img src="images/emawh.gif" alt="mwah" id="mwah"/>
        
            {giftClicked && (
                <div>
                    {correctPasswords.includes(1) && (
                        <div id="pw1" onClick={navigateToP1}>
                            Puzzle for Password 1
                        </div>
                    )}
                    {correctPasswords.includes(2) && (
                        <div id="pw2" onClick={navigateToP2}>
                            Puzzle for Password 2
                        </div>
                    )}
                    {correctPasswords.includes(3) && (
                        <div id="pw3" onClick={navigateToP3}>
                            Puzzle for Password 3
                        </div>
                    )}
                    {correctPasswords.includes(4) && (
                        <div id="pw4" onClick={navigateToP4}>
                            Puzzle for Password 4
                        </div>
                    )}
                    {correctPasswords.includes(5) && (
                        <div id="pw5" onClick={navigateToP5}>
                            Final Puzzle
                        </div>
                    )}
                </div>
            )}
        
        <ReactModal isOpen={open} contentLabel="Example Modal" id="modal">
            <CloseButton onClick={() => setOpen(!open)}>X</CloseButton>
            {<BonnyModal/>}
            {<PasswordChecker onPasswordCorrect={handlePasswordCorrect}/>}
      </ReactModal>
    </div>)
}
export default Home