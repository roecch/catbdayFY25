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
import "./index.css"

function HomeButton() {
    const navigate = useNavigate();

    // i
    const navigateToHome= () => {
        navigate('/');
      };
  
    return(
    <div className="homebutton">
        <div onClick={navigateToHome}>
            🏠
        </div>
    </div>)
}
export default HomeButton