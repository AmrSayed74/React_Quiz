import { useEffect, useReducer } from "react";
import Header from "./Components/Header";
import Main from "./Components/Main";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import StartScreen from "./Components/StartScreen";
import { Question } from "./Components/Question";
import Progress from "./Components/Progress";
import FinishScreen from "./Components/FinishScreen";
import NextButton from "./Components/NextButton";
import Timer from "./Components/Timer";

const initialState = {
  questions: [],
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  secondsRemaining: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "dataReceived":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "dataFailed":
      return {
        ...state,
        status: "error",
      };
    case "start":
      const SECs_PER_QUESTION = 30;
      return {
        ...state,
        status: "active",
        secondsRemaining: state.questions.length * SECs_PER_QUESTION,
      };
    case "newAnswer":
      // This line to determine the current question
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          /*in this lines of code we make a comparison 
          if the action.payload(index of answer) === question.correctOption ? 
            - if true we get points from state and added the points in current question 
            to points in main state 
            - if false we return the points as it is from initialState 
          note: question.correctOption => question here refer to the index of current question
          note: action.payload === index that passed from Options.js Component
        */
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    case "finished":
      return { ...state, status: "finished" };
    case "restart":
      return {
        ...initialState,
        questions: state.questions,
        status: "ready",
      };
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Action Unknown");
  }
};
function App() {
  const [
    { questions, status, index, answer, points, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);
  const numOfPoints = questions.reduce((acc, curr) => acc + curr.points, 0);

  useEffect(() => {
    fetch("http://localhost:9000/questions").then((res) =>
      res
        .json()
        .then((data) => dispatch({ type: "dataReceived", payload: data }))
        .catch((err) => dispatch({ type: "dataFailed" }))
    );
  }, []);
  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen questionsNum={questions.length} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              questionsNum={questions.length}
              points={points}
              numOfPoints={numOfPoints}
              answer={answer}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
              index={index}
            />
            <footer>
              <NextButton
                answer={answer}
                dispatch={dispatch}
                questionsNum={questions.length}
                index={index}
              />
              <Timer secondsRemaining={secondsRemaining} dispatch={dispatch} />
            </footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            numOfPoints={numOfPoints}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
