
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.js";
import "./LoginPage.css"

function  LoginPage(props) {
  const auth = useAuth();

  const[username, setUsername] = useState("");
  const[password, setPassword] = useState("");
  const[bio, setBio] = useState("");
  const[email, setEmail] = useState("");
  const [success, setSuccess] = useState(false);
 
  let [authMode, setAuthMode] = useState("signin")

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin")
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      let response = await fetch("/api/auth/signup", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          bio: bio,
          password: password,
          email: email
        }),
      });
      if (response.ok) {
        setSuccess(true);
      } 
    } catch (error) {
      console.error("Server error while creating a new user", error);
    }
  };
  

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      await auth.authenticate(email, password);
      console.log("logged in");
      setSuccess(true);
      
    } catch (error) {
      console.error("Server error while loging in", error);
    }
    
  };
  if (success) return <Navigate to="/user-profile" />;

  if (authMode === "signin") {
    return (
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleLogin}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Login</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control mt-1"
                placeholder="Enter email"
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control mt-1"
                placeholder="Enter password"
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button type="submit" className="btn text-white">
                Submit
              </button>
            </div>
            {/* <p className="text-center mt-2 text-white">
              Forgot <a href="#" className= "navbarcolor">password?</a>
            </p> */}
          </div>
        </form>
      </div>
    )
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign up</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="" onClick={changeAuthMode}>
              Login
            </span>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
            />
          </div>
          <div className="form-group mt-3">
              <label>Bio</label>
              <input
                type="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="form-control mt-1"
                placeholder="Enter bio"
              />
            </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn text-white" >
              Submit
            </button>
          </div>
          {/* <p className="text-center mt-2">
            Forgot <a href="#" className= "">password?</a>
          </p> */}
        </div>
      </form>
    </div>
  )
}
export default LoginPage;


