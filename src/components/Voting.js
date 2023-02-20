import React, { useState, useEffect } from "react";
import Button from "./Button";
import event from "../images/event.jpg";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { get, child, ref, getDatabase } from "firebase/database";

export default function Voting() {
  const auth = getAuth();
  const [curUser,setCurUser] = useState(null)
  onAuthStateChanged(auth, (user) => {
    if (user) {
      setCurUser(user)
    }
  });

  let time = "Sunday 11:59 pm";
  const [votes, setVotes] = useState(0);
  const dbRef = ref(getDatabase());

  useEffect(() => {
  console.log(curUser);
    if (curUser) {
      get(child(dbRef, `/users/${curUser.uid}/votes`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            setVotes( snapshot.val());
          } else {
            console.log("No data available");
          }
        })
        .catch((error) => console.error(error));
    } else {
      console.log("no user lol")
    }
  }, [curUser, dbRef]);

  return (
    <div className="choose--your--event">
      <img
        className="choose--your--event--image"
        src={event}
        alt="Choose Your Event"
      />
      <div className="choose--your--event--desc">
        <div className="choose--your--event--header">
          <div>Time Left: {time}</div>
          <div>Votes Left: {votes}</div>
        </div>
        <h2 className="choose--your--event--title">Chose Your Event</h2>
        <h4 className="choose--your--event--subtitle">
          We planned the menu. <br />
          Now it's your turn to order!!
        </h4>
        <p className="choose--your--event--text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor
        </p>
        <Link to={"/voting/vote"} replace>
          <Button
            className="choose--your--event--button"
            text={"Vote Now!!!"}
          />
        </Link>
      </div>
    </div>
  );
}
