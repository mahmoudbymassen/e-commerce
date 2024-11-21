import React from "react";
import Navbar from './navbar.jsx';
import './home.css';
import bgImg from "./images/backround-removebg.png";
import { Link } from "react-router-dom";
function Home(){
    return(
        <>
        <Navbar />
    <div className="container-home">
    < img src={bgImg} alt="bg" className="img-1" />
    <p className="title">Welcome to</p>
    <p className="title-2"> M & B shop store</p>
    <button className="btn1"><Link to={`/productList/`} className="aa">Shop now</Link></button>
    </div>
    </>
    )
}
export default Home;