import Button from "./components/Button";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Voting from "./components/Voting";
import VotingCard from "./components/VotingCard";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { firebaseConfig } from "./firebase-config";
import { signOutUser } from "./utility-files/authenticate";
import "./App.css";
import { useState } from "react";

const firebase = initializeApp(firebaseConfig);
const auth = getAuth();

function App() {
  return (
    <div className="home--page">
      <Router>
        <Routes>
          <Route exact path="/login" element={<LogIn />} />
          <Route exact path="/signup" element={<SignUp />} />
          <Route exact path="/voting" element={<Voting />} />
          <Route exact path="/voting/vote" element={<VotingCard />} />
          <Route
            exact
            path="/"
            element={
              <>
                <>
                  <Link to="/signup" >
                    <Button text="Sign Up" />
                  </Link>
                  <Link to="/login" >
                    <Button text="Log In" />
                  </Link>
                </>
                <Link to="/voting">
                  <Button text="New Event!!" />
                </Link>
                <>
                  <Button text="Sign Out" handleClick={() => signOutUser()} />
                </>
              </>
            }
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
