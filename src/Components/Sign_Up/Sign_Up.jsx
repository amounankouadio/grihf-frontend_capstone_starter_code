// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';
import './Sign_Up.css';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config';

// Function component for Sign Up form
const Sign_Up = () => {
    // State variables using useState hook
    const [role, setRole] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [showerr, setShowerr] = useState(''); // State to show error messages
    const [errors, setErrors] = useState({});   // Client side validation errors
    const navigate = useNavigate(); // Navigation hook from react-router

    // Client side validation run before the API call
    const validate = () => {
        const nextErrors = {};

        if (!role) {
            nextErrors.role = 'Please select a role';
        }

        if (!name.trim()) {
            nextErrors.name = 'Name is required';
        }

        if (!email.trim()) {
            nextErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            nextErrors.email = 'Enter a valid email address';
        }

        // StayHealthy requirement: the phone number must be exactly 10 digits
        if (!phone.trim()) {
            nextErrors.phone = 'Phone number is required';
        } else if (!/^\d{10}$/.test(phone)) {
            nextErrors.phone = 'Phone number must be exactly 10 digits';
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

    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // Stop here when the client side validation fails
        if (!validate()) {
            return;
        }

        // API Call to register user
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });

        const json = await response.json(); // Parse the response JSON

        if (json.authtoken) {
            // Store user data in session storage
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);

            // Redirect user to home page
            navigate("/");
            window.location.reload(); // Refresh the page
        } else {
            if (json.errors) {
                for (const error of json.errors) {
                    setShowerr(error.msg); // Show error messages
                }
            } else {
                setShowerr(json.error);
            }
        }
    };

    // JSX to render the Sign Up form
    return (
        <div className="container" style={{ marginTop: '0' }}>
            <div className="signup-grid">
                <div className="signup-text">
                    <h1>Sign Up</h1>
                </div>
                <div className="signup-text1" style={{ textAlign: 'left' }}>
                    Already a member?{' '}
                    <span>
                        <Link to="/login" style={{ color: '#2190FF' }}>
                            Login
                        </Link>
                    </span>
                </div>
                <div className="signup-form">
                    <form method="POST" onSubmit={register} noValidate>
                        {/* Role of the account being created */}
                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <select
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                name="role"
                                id="role"
                                className="form-control"
                            >
                                <option value="" disabled>Select role</option>
                                <option value="doctor">Doctor</option>
                                <option value="patient">Patient</option>
                                <option value="admin">Admin</option>
                            </select>
                            {errors.role && <div className="err" style={{ color: 'red' }}>{errors.role}</div>}
                        </div>

                        {/* Name of the user */}
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                name="name"
                                id="name"
                                className="form-control"
                                placeholder="Enter your name"
                                aria-describedby="helpId"
                            />
                            {errors.name && <div className="err" style={{ color: 'red' }}>{errors.name}</div>}
                        </div>

                        {/* Phone number, restricted to 10 digits */}
                        <div className="form-group">
                            <label htmlFor="phone">Phone</label>
                            <input
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                type="tel"
                                name="phone"
                                id="phone"
                                maxLength="10"
                                className="form-control"
                                placeholder="Enter your phone number"
                                aria-describedby="helpId"
                            />
                            {errors.phone && <div className="err" style={{ color: 'red' }}>{errors.phone}</div>}
                        </div>

                        {/* Email address, also checked server side for duplicates */}
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
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
                            {showerr && <div className="err" style={{ color: 'red' }}>{showerr}</div>}
                        </div>

                        {/* Password */}
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
                            <button type="submit" className="btn btn-primary mb-2 mr-1 waves-effect waves-light">Submit</button>
                            <button type="reset" className="btn btn-danger mb-2 waves-effect waves-light">Reset</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        /* Note: Sign up role is not stored in the database. Additional logic can be implemented for this based on your React code. */
    );
}

export default Sign_Up; // Export the Sign_Up component for use in other components
