// Following code has been commented with appropriate comments for your reference.
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

// Function component for the navigation bar
const Navbar = () => {
  // Controls the mobile (hamburger) menu
  const [click, setClick] = useState(false);
  // True once a user is authenticated
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // Name displayed to the left of the Logout button
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  // Toggle the mobile menu
  const handleClick = () => setClick(!click);

  // On mount, read the session to decide between Sign Up/Login and Logout
  useEffect(() => {
    const storedEmail = sessionStorage.getItem('email');

    if (sessionStorage.getItem('auth-token')) {
      setIsLoggedIn(true);
      // Extract the part of the email address before the @ symbol
      if (storedEmail) {
        setUsername(storedEmail.split('@')[0]);
      }
    }
  }, []);

  // Clear the session and send the user back to the landing page
  const handleLogout = () => {
    sessionStorage.removeItem('auth-token');
    sessionStorage.removeItem('name');
    sessionStorage.removeItem('phone');
    sessionStorage.removeItem('email');

    setIsLoggedIn(false);
    setUsername('');

    navigate('/');
    window.location.reload();
  };

  return (
    <nav>
      {/* Navigation logo section */}
      <div className="nav__logo">
        <Link to="/">
          StayHealthy
          {/* Insert an SVG icon of a doctor with a stethoscope */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="26"
            width="26"
            viewBox="0 0 1000 1000"
            style={{ fill: '#3685fb' }}
          >
            <title>Doctor With Stethoscope SVG icon</title>
            <g>
              <g>
                <path d="M499.8,10c91.7,0,166,74.3,166,166c0,91.7-74.3,166-166,166c-91.7,0-166-74.3-166-166C333.8,84.3,408.1,10,499.8,10z" />
                <path d="M499.8,522.8c71.2,0,129.1-58.7,129.1-129.1H370.6C370.6,464.1,428.6,522.8,499.8,522.8z" />
                <path d="M693.2,395c-0.7,94.9-70.3,173.7-160.8,188.9v155.9c0,80.3-60.7,150.8-140.8,155.3c-83,4.7-152.7-58.9-157.6-139.7c-22-12.8-35.6-38.5-30.3-66.7c4.7-25.1,25.5-45.6,50.8-49.9c39.7-6.7,74.1,23.7,74.1,62.1c0,23-12.3,43-30.7,54.1c4.7,45.4,45.1,80.4,92.6,76c44.6-4,77.2-44.4,77.2-89.2V583.9C377.1,568.7,307.5,489.9,306.8,395h-38.9v-38.9h77.8V395h-0.2c0.7,84.6,69.6,153.1,154.3,153.1S653.4,479.6,654.1,395h-0.2v-38.9h77.8V395H693.2z M772.5,661.7c-42.9,0-77.8,34.8-77.8,77.8c0,42.9,34.8,77.8,77.8,77.8c42.9,0,77.8-34.8,77.8-77.8C850.3,696.5,815.5,661.7,772.5,661.7z M772.5,778.3c-21.5,0-38.9-17.4-38.9-38.9c0-21.5,17.4-38.9,38.9-38.9c21.5,0,38.9,17.4,38.9,38.9C811.4,760.9,794,778.3,772.5,778.3z" />
              </g>
            </g>
          </svg>
        </Link>
        <span>.</span>
      </div>

      {/* Hamburger icon shown on small screens */}
      <div className="nav__icon" onClick={handleClick}>
        <i className={click ? 'fa fa-times' : 'fa fa-bars'}></i>
      </div>

      {/* Navigation links */}
      <ul className={click ? 'nav__links active' : 'nav__links'}>
        <li className="link">
          <Link to="/">Home</Link>
        </li>
        <li className="link">
          <Link to="/booking-consultation">Appointments</Link>
        </li>

        {isLoggedIn ? (
          // Authenticated: greet the user and offer a Logout button
          <>
            {/* Clicking the user name opens the profile drop-down */}
            <li className="link welcome-user">
              <span className="username-trigger">Welcome, {username}</span>
              <ul className="dropdown-menu">
                <li>
                  <Link to="/profile">Your Profile</Link>
                </li>
                <li>
                  <Link to="/reports">Your Reports</Link>
                </li>
              </ul>
            </li>
            <li className="link">
              <button className="btn1" onClick={handleLogout}>
                Logout
              </button>
            </li>
          </>
        ) : (
          // Anonymous: offer Sign Up and Login
          <>
            <li className="link">
              <Link to="/signup">
                <button className="btn1">Sign Up</button>
              </Link>
            </li>
            <li className="link">
              <Link to="/login">
                <button className="btn1">Login</button>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
