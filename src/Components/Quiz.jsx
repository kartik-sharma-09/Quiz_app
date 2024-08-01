import React, { useCallback, useState } from "react";
import QUESTIONS from "../Question";
import quizCompleteImg from "../assets/quiz-complete.png";
import Question from "./Question";

const Quiz = () => {
  const [answerState, setAnswerState] = useState("");
  const [userAnswers, setUserAnswers] = useState([]);

  const activeQuestionIndex =
    answerState === "" ? userAnswers.length : userAnswers.length - 1;

  console.log("activeQuestionIndex is ", activeQuestionIndex);
  console.log("answer state is ", answerState);
  const quizIsComplete = activeQuestionIndex === QUESTIONS.length;
  // console.log('quizIsComplete is ',quizIsComplete)

  const handelSelectAnswer = useCallback(
    function handelSelectAnswer(selectedAnswer) {
      // console.log("Selected answer:", selectedAnswer);
      // setAnswerState("answered");
      setUserAnswers((prevUserAnswers) => {
        const newUserAnswers = [...prevUserAnswers, selectedAnswer];
        console.log("User answers:", newUserAnswers);
        return newUserAnswers;
      });

      setTimeout(() => {
        if (selectedAnswer === QUESTIONS[activeQuestionIndex].answers[0]) {
          setAnswerState("correct");
        } else {
          setAnswerState("wrong");
        }

        setTimeout(() => {
          setAnswerState("");
        }, 2000);
      }, 1000);
    },
    [activeQuestionIndex]
  );

  const handelSkipAnswer = useCallback(
    () => handelSelectAnswer(null),
    [handelSelectAnswer]
  );

  // console.log("Active question index:", activeQuestionIndex);

  if (quizIsComplete) {
    // console.log("Quiz is complete.");
    return (
      <div id="summary">
        <img src={quizCompleteImg} alt="Trophy icon" />
        <h2>Quiz Completed!</h2>
      </div>
    );
  }

  // console.log("Rendering question...");
  return (
    <div id="quiz">
      <Question
        key={activeQuestionIndex}
        questionText={QUESTIONS[activeQuestionIndex].text}
        answers={QUESTIONS[activeQuestionIndex].answers}
        onSelectAnswer={handelSelectAnswer}
        answerState={answerState}
        selectedAnswer={userAnswers[userAnswers.length - 1]}
        onskipAnswer={handelSkipAnswer}
      />
    </div>
  );
};

export default Quiz;
