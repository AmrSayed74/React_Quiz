import React from "react";

const Progress = ({ index, questionsNum, points, numOfPoints, answer }) => {
  return (
    <header className="progress">
      {/* why we add Number(answer !== null) to index
         index is a state but it is only change when we dispatch on the next button. 
         So the progress bar would not update until then. 
         we add this line + index to make the progress bar update before clicking next, 
         so we changed the value by using the answer is not null trick.

         - if answer !== null => true this means truthy value replace true with 1
         and the result will be index + 1

        - if answer !== null => false this means falsy value replace false with 0
         is it clear?!
        */}
      <progress max={questionsNum} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong>/{questionsNum}{" "}
      </p>
      <p>
        <strong>{points}</strong>/{numOfPoints} Points
      </p>
    </header>
  );
};

export default Progress;
