import { useState } from 'react';
import quizData from '../data/quizData';

/**
  * クイズを表示するコンポーネント
  *
  * @returns {JSX.Element} クイズコンポーネントのJSX要素
  */
const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [resetQuiz, setResetQuiz] = useState(false);

  /**
   * 問題の回答を処理する
   * @param {string} answer - 回答のテキスト
   */
  const handleAnswerOptionClick = (answer) => {
    if (answer === quizData[currentQuestion].answer) {
      setScore(score + 1);
    }
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  const resetQuizState = () => {
    setCurrentQuestion(0);
    setShowScore(false);
    setScore(0);
  };

  if (resetQuiz) {
    resetQuizState();
    setResetQuiz(false);
  }

  return (
    <div className='quiz'>
      {showScore ? (
        <div className='score-section'>
          あなたの得点は {score} 点です！
          <br />
          ( {quizData.length} 点満点中 )
          <br />
          <button className='retryButton'  onClick={() => setResetQuiz(true)}>Retry</button>
        </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{quizData.length}
            </div>
            <div className='question-text'>
              {quizData[currentQuestion].question}
            </div>
          </div>
          <div className='answer-section'>
            {quizData[currentQuestion].options.map((option, index) => (
              <button className='answerButton' key={index} onClick={() => handleAnswerOptionClick(option)}>
                {option}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
