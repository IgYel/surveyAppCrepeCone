import { useState, useEffect } from "react";
import "./App.css";
import bgdeco from "./assets/bgdeco.png";
import logo from "./assets/Crepe Logo.png";

import ttIcon from "./components/tt.png";
import instaIcon from "./components/insta.png";
import streetIcon from "./components/street.png";
import friendsIcon from "./components/friends.png";
import mapsIcon from "./components/maps.png";

function App() {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const [shop, setShop] = useState(null);

  const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbx6UnMrJz901yb1_qspeX8DGbECfD2iY2FiAgP9cU8g54q3alxofre-EJxonORAibvc/exec";

  const answers = [
    {
      label: "Lost on the street",
      icon: streetIcon,
    },
    {
      label: "Instagram",
      icon: instaIcon,
    },
    {
      label: "Google Maps",
      icon: mapsIcon,
    },
    {
      label: "Friend's advice",
      icon: friendsIcon,
    },
    {
      label: "TikTok",
      icon: ttIcon,
    },
  ];

  async function handleAnswer(answer) {
    if (sending) return;

    setSending(true);
    setSelectedAnswer(answer);

    fetch(GOOGLE_SCRIPT_URL, {
  method: "POST",
  mode: "no-cors",
  body: JSON.stringify({
    answer,
  }),
}).catch((error) => {
  console.error("Error sending answer:", error);
});

    await new Promise((resolve) => setTimeout(resolve, 650));

    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
      setSelectedAnswer(null);
      setSending(false);
    }, 2000);
  }

  return (
    <main className="app">
      <section className="imageSide">
        <img src={bgdeco} alt="" />
      </section>

      <section className="contentSide">
        <img className="mainLogo" src={logo} alt="Crepe Logo"/>
        {!submitted ? (
          <div className="survey">
            <h1>Where did you find us?</h1>

            <p className="surveySubtitle">Tap one option below</p>

            <div className="answers">
              {answers.map((answer) => (
                <button
                  key={answer.label}
                  className={selectedAnswer === answer.label ? "selected" : ""}
                  onClick={() => handleAnswer(answer.label)}
                >
                  <img src={answer.icon} alt="" className="answerIcon" />

                  <span className="buttonText">{answer.label}</span>

                  <span className="shine"></span>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="survey">
            <h1>Thank you!</h1>
          </div>
        )}
      </section>
    </main>
  );
}

export default App;
