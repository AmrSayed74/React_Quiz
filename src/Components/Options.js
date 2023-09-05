import React from "react";

const Options = ({ question, answer, dispatch, index }) => {
  const hasAnswered = answer !== null;
  return (
    <>
      <div className="options">
        {question.options.map((option, index) => (
          <button
            className={`btn btn-option ${index === answer ? "answer" : ""} ${
              hasAnswered
                ? index === question.correctOption
                  ? "correct"
                  : "wrong"
                : ""
            }`}
            disabled={hasAnswered}
            key={option}
            /*
          payload: index => means the index of correct option
          if the correctOption is number to this means the correctOption is index 1
          in next line i take the index of correctOption
          */
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {option}
          </button>
        ))}
      </div>
    </>
  );
};

export default Options;
