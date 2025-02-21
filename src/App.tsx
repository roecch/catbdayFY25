import {HashRouter} from "react-router-dom";
import {Routes, Route, Navigate} from "react-router";
import "./index.css"
import "./Mahjong/Mahjong.css"
import MahjongLandingPage from "./Mahjong/MahjongLanding"
import React from "react";
import Home from "./Home";
import MusicLandingPage from "./Music/MusicLanding";
import MapLandingPage from "./Map/ShapesLanding";
import CatagoryLandingPage from "./Catagory/CatagoryLandingPage";
import FinalLandingPage from "./Final/FinalLanding";
import { Helmet } from 'react-helmet';

function App() {
  return (
    <>
    
    <Helmet>
        <title>CatBdayFY25</title>
      </Helmet>
      <HashRouter>
        <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/Mahjong" element={<MahjongLandingPage />} />
         <Route path="/Music" element={<MusicLandingPage />} />
         <Route path="/Map" element={<MapLandingPage />} />
         <Route path="/Catagory" element={<CatagoryLandingPage />} />
         <Route path="/TextMeTheQuestion" element={<FinalLandingPage />} />
        </Routes>
    </HashRouter>
    </>
    
);}

export default App