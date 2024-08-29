import React, { useState } from "react";
import { RiMenu3Line, RiCloseLine } from "react-icons/ri";
import logo from "../../assets/image.png";
import { Link } from "react-router-dom";
import "./navbar.css";


const Navbar = ({ loggedIn, userRole, setLoggedIn, setUserRole }) => {
  // const [click, setClick] = useState(false);
  const [toggleMenu, setToggleMenu] = useState(false);
  const token = localStorage.getItem("token");
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();

  };

  return (
    <div className="clinic__navbar">
      <div className="clinic__navbar-links_logo">
        <img src={logo} />
      </div>
      <div className="clinic__navbar-links">
        <div className="clinic__navbar-links_container">
          <p>
            <a href="#home">Home</a>
          </p>
          <p>
            <a href="#service">Service</a>
          </p>
          <p>
            <a href="#aboutUs">About Us</a>
          </p>

          {loggedIn && userRole === "admin" && (
            <p>
              <Link to="/dashboard">Dashboard</Link>
            </p>
          )}

        </div>
      </div>
      <div className="clinic__navbar-sign">
        {loggedIn ? (
          <button className="login-btn" onClick={handleLogout}>
            Log Out
          </button>
        ) : (
          <Link to="/login">
            <button className="login-btn">Log In</button>
          </Link>
        )}
        <button type="button">
          <a href="#appointment">Appointment</a>
        </button>
      </div>
      <div className="clinic__navbar-menu">
        {toggleMenu ? (
          <RiCloseLine
            color="#000"
            size={27}
            onClick={() => setToggleMenu(false)}
          />
        ) : (
          <RiMenu3Line
            color="#000"
            size={27}
            onClick={() => setToggleMenu(true)}
          />
        )}
        {toggleMenu && (
          <div className="clinic__navbar-menu_container scale-up-center">
            <div className="clinic__navbar-menu_container-links">
              <p>
                <a href="#home">Home</a>
              </p>
              <p>
                <a href="#service">Service</a>
              </p>
              <p>
                <a href="#aboutUs">About Us</a>
              </p>
              {loggedIn && userRole === "admin" && (
                <p>
                  <Link to="/dashboard">Dashboard</Link>
                </p>
              )}
            </div>
            <div className="clinic__navbar-menu_container-links-sign">
              {loggedIn ? (
                <button className="login-btn" onClick={handleLogout}>
                  Log Out
                </button>
              ) : (
                <Link to="/login">
                  <button className="login-btn">Log In</button>
                </Link>
              )}
              <button type="button">
                <a href="#appointment">Appointment</a>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
