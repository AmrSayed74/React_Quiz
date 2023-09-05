import React from "react";

const FinishScreen = ({ points, numOfPoints, dispatch }) => {
  const percentage = (points / numOfPoints) * 100;
  let emoji;
  if (percentage === 100) emoji = "🥇";
  if (percentage >= 80 && percentage < 100) emoji = "🎉";
  if (percentage >= 50 && percentage < 80) emoji = "😞";
  if (percentage >= 0 && percentage < 80) emoji = "🤔";
  if (percentage === 0) emoji = "🤦‍♂️";
  return (
    <>
      <p className="result">
        <span>{emoji}</span>You Scored <strong>{points}</strong> of{" "}
        {numOfPoints} ({`${Math.ceil(percentage)}%`})
      </p>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: "restart" });
        }}
      >
        Restart Quiz
      </button>
    </>
  );
};

export default FinishScreen;
