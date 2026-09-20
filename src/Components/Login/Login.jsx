// Following code has been commented with appropriate comments for your reference.
import React, { useState, useEffect } from 'react';
import './Login.css';

import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config';

const Login = () => {

  // State variables for email and password
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState('');
  const [errors, setErrors] = useState({}); // Client side validation errors

  // Get navigation function from react-router-dom
  const navigate = useNavigate();

  // Check if user is already authenticated, then redirect to home page
  useEffect(() => {
    if (sessionStorage.getItem("auth-token")) {
      navigate("/");
    }
  }, []);

  // Client side validation run before the API call
  const validate = () => {
    const nextErrors = {};

    if (!email.trim()) {
      nextErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = 'Enter a valid email address';
    }

    if (!password) {
      nextErrors.password = 'Password is required';
    } else if (password.length < 8) {
      nextErrors.password = 'Password must be at least 8 characters';
    }

    setErrors(nextErrors);
    // The form is valid when no error has been collected
    return Object.keys(nextErrors).length === 0;
  };

  // Function to handle login form submission
  const login = async (e) => {
    e.preventDefault();

    // Stop here when the client side validation fails
    if (!validate()) {
      return;
    }

    // Send a POST request to the login API endpoint
    const res = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    // Parse the response JSON
    const json = await res.json();
    if (json.authtoken) {
      // If authentication token is received, store it in session storage
      sessionStorage.setItem('auth-token', json.authtoken);
      sessionStorage.setItem('email', email);

      // Redirect to home page and reload the window
      navigate('/');
      window.location.reload();
    } else {
      // Handle errors if authentication fails
      if (json.errors) {
        for (const error of json.errors) {
          alert(error.msg);
        }
      } else {
        alert(json.error);
      }
    }
  };

  return (
    <div>
      <div className="container">
        <div className="login-grid">
          <div className="login-text">
            <h2>Login</h2>
          </div>
          <div className="login-text">
            Are you a new member?
            <span>
              <Link to="/signup" style={{ color: '#2190FF' }}>
                {' '}Sign Up Here
              </Link>
            </span>
          </div>
          <br />
          <div className="login-form">
            <form onSubmit={login} noValidate>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                {/* Input field for email */}
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  name="email"
                  id="email"
                  className="form-control"
                  placeholder="Enter your email"
                  aria-describedby="helpId"
                />
                {errors.email && <div className="err" style={{ color: 'red' }}>{errors.email}</div>}
              </div>
              {/* Input field for password */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  aria-describedby="helpId"
                />
                {errors.password && <div className="err" style={{ color: 'red' }}>{errors.password}</div>}
              </div>
              <div className="btn-group">
                {/* Login button */}
                <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">
                  Login
                </button>
                {/* Reset button */}
                <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">
                  Reset
                </button>
              </div>
              <br />
              <div className="login-text">
                Forgot Password?
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login;
