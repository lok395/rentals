import React,{useState,useEffect} from "react";
import "../css/Header.css";
import { NavLink } from "react-router-dom";
import { RiAccountPinCircleFill } from "react-icons/ri";

export default function Header() {
  const [islogin,setislogin]=useState(false);


useEffect(() => {
  const checkLoginStatus = () => {
    const usernameCookie = document.cookie
      .split("; ")
      .find(row => row.startsWith("user_id="));
    console.log(usernameCookie);
    if (usernameCookie && usernameCookie.split("=")[1]) {
      setislogin(true);
    }
  };
  checkLoginStatus();
}, []);


  return (
      <div className="header">
        <div className="top" style={{display:"flex",flexDirection:"row",textAlign:"center",justifyContent:"center",alignItems:"center"}}>
        <div className="logo" style={{textAlign: "center", margin: "15px"}}>
          <h1>RENTALS PRO</h1>
        </div>
         <div id="iconloginregister">
       { !islogin ? (<div id="login_register_button" style={{position:"relative",right:0}}>
          <NavLink to="/login">Login</NavLink>/
          <NavLink to="/Signup">Register</NavLink>
        </div>):
        (<NavLink to="/accountProfile"><RiAccountPinCircleFill size={50} /></NavLink>)
        }
        </div>
        </div>
        <nav className="navbar">
          <ul>
            <li><NavLink to="/">HOME</NavLink></li>
            <li><NavLink to="/about">ABOUT</NavLink></li>
            <li>
              <a id="categorybutton">CATEGORY</a>
              <ul id="categorylist">
                <li><NavLink to="/category/bikes">Bikes</NavLink></li>
                <li><NavLink to="/category/cars">Cars</NavLink></li>
                <li><NavLink to="/category/cameras">Cameras</NavLink></li>
                <li><NavLink to="/category/drones">Drones</NavLink></li>
                <li><NavLink to="/category/speakers">Speakers</NavLink></li>
                <li><NavLink to="/category/fishingrods">Fishing Rods</NavLink></li>
                <li><NavLink to="/category/cycles">cycle</NavLink></li>
              </ul>
            </li>
            <li><NavLink to="/faq">FAQs</NavLink></li>
            <li><NavLink to='/about'>About</NavLink></li>
            <li><NavLink to="/Rentform">RentForm</NavLink></li>
          </ul>
        </nav>
      </div>
  );
}