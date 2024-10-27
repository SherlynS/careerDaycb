import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, ProgressBar } from "react-bootstrap";
import "./QuizPage.css";
import personalityQuizAnswers from '../data/personalityQuizAnswers.js';
import CardTemplate from "../components/CardTemplate.js";


function QuizPage(props) {
  const [questions, setQuestions] = useState([]);
  const [selectedValuesString, setSelectedValuesString] = useState('');
  const [quizComplete, setQuizComplete] = useState(false);
  const [quizResults, setQuizResults] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const handleChoiceClick = (questionIndex, value) => {
    setSelectedValuesString(prevState => {
      const newValuesString = prevState + String(value);
      console.log("value", value);
      console.log("selected value string", selectedValuesString);
      if(questionIndex < questions.length - 1){
        setCurrentQuestionIndex(questionIndex + 1);
      }
      else{
        setQuizComplete(true);
        fetchQuizResults(newValuesString);
      }
      return newValuesString;
    })};

    const fetchQuizResults = async(resultString) => {
      try{
        const response = await fetch('/api/quizResults', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ results: resultString })
        });
        const results = await response.json();
        setQuizResults(results);
        console.log(quizResults);
      }
      catch(err){
        console.error("Error rendering quiz results:", err);
      }
    }

  const progressBarValue = (((currentQuestionIndex + 1) / questions.length) * 100).toFixed(1);

  useEffect(() =>{
    setSelectedValuesString('');
    fetchQuiz();
}, []);

  const fetchQuiz = async() => {
    const data = await fetch('/Quiz');
    const items = await data.json();
    setQuestions(items);
    console.log(items);
  };
  return (
    <>
      <header style={{ padding: "60px", textAlign: "center", margin: "5px" }}>
        <h1 className="some-class">Personality Quiz</h1>
      </header>

      {!quizComplete ? (
        <div className="question-container">
          {currentQuestionIndex < questions.length && (
            <div>
              <h3>{questions[currentQuestionIndex].question_text}</h3>
              <div>
                {personalityQuizAnswers.map((answer, index) => (
                  <Button
                    key={index}
                    onClick={() => handleChoiceClick(currentQuestionIndex, answer.value)}
                    variant="outline-primary"
                    className="m-2 personality-answer-button"
                  >
                    {answer.name}
                  </Button>
                ))}
              </div>
            </div>
          )}
          <ProgressBar now={progressBarValue} label={`${progressBarValue}%`} className="mt-3" />
          {/* {currentQuestionIndex < questions.length && (
            <Button onClick={handleContinueClick} variant="primary" className="mt-3">
              Continue
            </Button>
          )} */}
        </div>
      ) : (
        <div className="results-container">
          <h3 className = "center-text">Top 5 Careers</h3>
          {quizResults.map((occupation, index) => (
            <CardTemplate key = {occupation.id || index} occupation = {occupation}/>
          ))}
        </div>
      )}
    </>
  );
}

export default QuizPage;
