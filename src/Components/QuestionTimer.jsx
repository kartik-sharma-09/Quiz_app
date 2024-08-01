import React, { useEffect, useState } from "react";

const QuestionTimer = ({ timeOut, onTimeOut }) => {
  const [remainingTime, setremainingTime] = useState(timeOut);

  useEffect(()=>{
    // console.log('SETTING TIMEOUT')
   const timer =  setTimeout(onTimeOut, timeOut);

   return ()=>{
    clearTimeout(timer)
   }
  },[timeOut,onTimeOut])

  useEffect(() => {
    // console.log('SETTING INTERVAL')
    const interval = setInterval(() => {
      setremainingTime((prevRemainingTime) => prevRemainingTime - 100);
    }, 100);

    return ()=>{
      clearInterval(interval)
    }
  }, []);

  return (
    <>
      <progress id="question-time" max={timeOut} value={remainingTime} />
    </>
  );
};

export default QuestionTimer;
