import React from "react";

const Results = ({ wpm, accuracy, onRestart }) => {
  return (
    <div className="results">
      <h2>Test Results</h2>
      <p>Words per Minute (WPM): {wpm}</p>
      <p>Accuracy: {accuracy}%</p>
      <button onClick={onRestart}>Restart</button>
    </div>
  );
};

export default Results;
