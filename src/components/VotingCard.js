import { getAuth } from "firebase/auth";
import { useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import Button from "./Button.js";
import { getDatabase, ref, child, get, update } from "firebase/database";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function VotingCard() {
  const navigate = useNavigate();
  const location = useLocation();
  let user = getAuth().currentUser;
  const [votes, setVotes] = useState(0);
  const [opt, setOpt] = useState([0]);
  const [authenticated, setauthenticated] = useState(user);
  const [userChoice, setUserChoice] = useState(0);
  const dbRef = ref(getDatabase());


  // gets all questions
  useEffect(() => {
    get(child(dbRef, `questions`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val())
          setOpt(snapshot.val());
          setauthenticated(user);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => console.error(error));
  }, [user,dbRef]);

  function choiceUpdate(id) {
    setUserChoice(id);
  }

  useEffect(() => {
    if (user) {
      get(child(dbRef, `/users/${user.uid}/votes`))
        .then((snapshot) => {
          snapshot.exists()
            ? setVotes(snapshot.val())
            : console.log("No data anavilable");
        })
        .catch((error) => console.error(error.message));
    }
  }, [user,() => submitVote, dbRef]);

  function submitVote(userChoice) {
    if (votes > 0) {
      const db = getDatabase();
      const updates = {};
      updates[`/questions/${userChoice - 1}/votes`] =
        opt[userChoice - 1].votes + 1;
      updates[`/users/${user.uid}/votes`] = votes - 1;
      update(ref(db), updates);
      navigate("/voting");
    } else {
      toast.error("A user can vote only once", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }


  const options = Object.values(opt).map((data) => {
    return (
      <>
        <div
          className={`card--voting--options ${
            userChoice === data.id ? "clicked" : ""
          }`}
          key={data.id}
          onClick={() => choiceUpdate(data.id)}
        >
          <div className="event--title">{data.eventName}</div>
          
          {data.votes && (
                <p className="event--attr--votes">Votes: {data.votes}</p>
            )}
          <div
            className={`card--event--data ${
              userChoice === data.id ? "display" : console.log("please show")
            }`}
          >
            {data.agenda && (
              <div>
                Agenda : <p className="event--attr--info">{data.agenda}</p>
              </div>
            )}
            {data.date && (
              <div>
                Date: <p className="event--attr--info">{data.date}</p>
              </div>
            )}
            {data.speaker && (
              <div>
                Speaker: <p className="event--attr--info">{data.speaker}</p>
              </div>
            )}
            {data.timings && (
              <div>
                Time: <p className="event--attr--info">{data.timings}</p>
              </div>
            )}
            {data.venue && (
              <div>
                Venue: <p className="event--attr--info">{data.venue}</p>
              </div>
            )}
            {data.description && (
              <div>
                Description:
                <p className="event--attr--info">{data.description}</p>
              </div>
            )}
            {data.RSVP && console.log("data.RSVP")}
            {data.hoursProvided
              ? "Hours will be provided"
              : "Hours will not be provided"}
          </div>
        </div>
      </>
    );
  });
  if (authenticated) {
    return (
      <div className="voting--modal">
        <div className="card--voting">
          <h2 className="card--voting--question">
            Select the event of your choice (1)
          </h2>
          {options}
          <Button text="Submit" handleClick={() => submitVote(userChoice)} />
        </div>
        <ToastContainer />
      </div>
    );
  } else {
    return <Navigate to="/signup" replace state={{ from: location }} />;
  }
}
