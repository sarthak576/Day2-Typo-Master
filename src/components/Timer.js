import React, { useEffect } from "react";

const Timer = ({ timeLeft, onEnd }) => {
  useEffect(() => {
    if (timeLeft <= 0) {
      onEnd();
    }
  }, [timeLeft, onEnd]);

  return <div className="timer">Time Left: {timeLeft}s</div>;
};

export default Timer;
