import React from "react";

const StartScreen = ({ questionsNum, dispatch }) => {
  const startQuizHandler = () => {
    dispatch({ type: "start" });
  };
  return (
    <div className="start">
      <h2>Welcome To React Quiz!</h2>
      <h3>{questionsNum} Questions To Test Your React Mastery</h3>
      <button className="btn btn-ui" onClick={startQuizHandler}>
        Let's Start
      </button>
    </div>
  );
};

export default StartScreen;
