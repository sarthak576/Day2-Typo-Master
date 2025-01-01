import React from "react";

const TypingArea = ({ passage, typedText, onTextChange, errors }) => {
  return (
    <div className="typing-area">
      <p className="passage">{passage}</p>
      <textarea
        value={typedText}
        onChange={onTextChange}
        placeholder="Start typing here..."
      />
      <p className="errors">Errors: {errors}</p>
    </div>
  );
};

export default TypingArea;
