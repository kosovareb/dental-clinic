
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./form.css";
import PasswordStrengthBar from "react-password-strength-bar";
import zxcvbn from "zxcvbn";

const Form = (props) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [userRoleLocal, setUserRoleLocal] = useState("user");
  const navigate = useNavigate();

  const login = async () => {
    try {
      const loginData = { email, password };
  
      const response = await axios.post("http://localhost:3030/login", loginData);
  
      console.log("Login successful", response.data);
  
      const { token, userRole, userId } = response.data;
  
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", userRole);
      localStorage.setItem("userId", userId);
      props.setLoggedIn(true);
      props.setUserRole(userRole);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Login failed", error);
      setErrorMessage("Login failed. Please try again.");
    }
  };
  

  const register = async () => {
    if (password !== repeatPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    try {
      const registerData = {
        name,
        surname,
        email,
        password,
        role: userRoleLocal,
      };

      const response = await axios.post("http://localhost:3030/users/create", registerData);

      console.log("Registration successful", response.data);
      setSuccessMessage("Registration successful! Please login.");
      setErrorMessage("");
      setName("");
      setSurname("");
      setEmail("");
      setPassword("");
      setRepeatPassword("");
      setIsRegistering(false); 
    } catch (error) {
      console.error("Registration failed", error);
      setErrorMessage("Registration failed. Please try again.");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isRegistering) {
      register();
    } else {
      login();
    }
  };

  const toggleRegister = () => {
    setIsRegistering(!isRegistering);
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="tabs">
          <button className={!isRegistering ? "active" : ""} onClick={toggleRegister}>
            Login
          </button>
          <button className={isRegistering ? "active" : ""} onClick={toggleRegister}>
            Register
          </button>
        </div>
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <>
              <input
                className="form-input"
                type="text"
                placeholder="First Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                className="form-input"
                type="text"
                placeholder="Last Name"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
              />
              <input
                className="form-input"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="form-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                className="form-input"
                type="password"
                placeholder="Repeat Password"
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                required
              />
              <PasswordStrengthBar password={password} />
            </>
          )}
          {!isRegistering && (
            <>
              <input
                className="form-input"
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                className="form-input"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </>
          )}
          <button type="submit" className="login-button">
            {isRegistering ? "Register" : "Login"}
          </button>
        </form>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <p className="success-message">{successMessage}</p>
        {!isRegistering && (
          <p className="signup-text">
            Create an account{" "}
            <a href="#" onClick={toggleRegister}>
              Register now
            </a>
          </p>
        )}
      </div>
    </div>
  );
};

export default Form;
