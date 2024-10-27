import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, ProgressBar } from "react-bootstrap";
import "./QuizPage.css";
import personalityQuiz from '../data/personalityQuiz.js'; // Corrected import statement with file extension


function QuizPage(props) {
  const [answers, setAnswers] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const questions = personalityQuiz; // Using the imported questions array

  const handleOptionSelect = (option) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = option;
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz completed, calculate personality result
      const personalityResult = calculatePersonalityResult(answers);
      console.log("Personality result:", personalityResult);
      // You can display the result or perform further actions here
    }
  };

  const calculatePersonalityResult = (answers) => {
    // Example: Calculate personality result based on selected options
    // You can define your own logic for this
    // For demonstration, let's just return the selected options
    return answers;
  };

  const progressBarValue = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <>
      <header style={{ padding: "60px", textAlign: "center", margin: "5px" }}>
        <h1 className="some-class">Personality Quiz</h1>
      </header>

      <div className="question-container">
        {currentQuestionIndex < questions.length && (
          <div>
            <h3>{questions[currentQuestionIndex].question}</h3>
            <div>
              {questions[currentQuestionIndex].options.map((option, index) => (
                <Button key={index} onClick={() => handleOptionSelect(option)} variant="outline-primary" className="m-2">
                  {option}
                </Button>
              ))}
            </div>
          </div>
        )}
      </div>
      <ProgressBar now={progressBarValue} label={`${progressBarValue}%`} className="mt-3" />
      {currentQuestionIndex < questions.length && (
        <Button onClick={() => setCurrentQuestionIndex(currentQuestionIndex + 1)} variant="primary" className="mt-3">
          Continue
        </Button>
      )}
    </>
  );
}

export default QuizPage;
