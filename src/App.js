import React, { useState, useEffect } from "react";
import TypingArea from "./components/TypingArea";
import Results from "./components/Results";
import Timer from "./components/Timer";
import useTimer from "./hooks/userTimer"; // Import custom timer hook
import "./App.css";

const passages = [
  "The quick brown fox jumps over the lazy dog.",
  "React is a popular JavaScript library for building user interfaces.",
  "Speed typing tests help improve your typing accuracy and speed.",
];

function App() {
  const [selectedPassage, setSelectedPassage] = useState("");
  const [typedText, setTypedText] = useState("");
  const [errors, setErrors] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [wpm, setWpm] = useState(0);
  const [testActive, setTestActive] = useState(false);

  const [timeLeft, startTimer, stopTimer, resetTimer] = useTimer(60); // 60 seconds

  useEffect(() => {
    const randomPassage =
      passages[Math.floor(Math.random() * passages.length)];
    setSelectedPassage(randomPassage);
  }, []);

  const calculateAccuracy = (text) => {
    const correctChars = text.split("").filter((char, idx) => char === selectedPassage[idx]).length;
    const accuracyPercent = (correctChars / selectedPassage.length) * 100;
    setAccuracy(accuracyPercent.toFixed(2));
  };

  const handleTextChange = (e) => {
    const input = e.target.value;
    setTypedText(input);

    const errorsCount = input
      .split("")
      .reduce((acc, char, idx) => acc + (char !== selectedPassage[idx] ? 1 : 0), 0);
    setErrors(errorsCount);

    calculateAccuracy(input);
  };

  const handleTestEnd = () => {
    stopTimer();
    const wordsTyped = typedText.split(" ").filter((word) => word).length;
    setWpm(wordsTyped);
    setTestActive(false);
  };

  const handleRestart = () => {
    setTypedText("");
    setErrors(0);
    setAccuracy(100);
    setWpm(0);
    const newPassage =
      passages[Math.floor(Math.random() * passages.length)];
    setSelectedPassage(newPassage);
    resetTimer(60);
    startTimer();
    setTestActive(true);
  };

  return (
    <div className="App">
      <h1>Speed Typing Test</h1>
      <Timer timeLeft={timeLeft} onEnd={handleTestEnd} />
      {testActive ? (
        <TypingArea
          passage={selectedPassage}
          typedText={typedText}
          onTextChange={handleTextChange}
          errors={errors}
        />
      ) : (
        <Results
          wpm={wpm}
          accuracy={accuracy}
          onRestart={handleRestart}
        />
      )}
    </div>
  );
}

export default App;
