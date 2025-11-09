import React, { useEffect, useState } from 'react';
import axiosClient from '../API/axiosClient';
import Header from './Header';
import { useParams } from 'react-router';

const QuizPage = () => {


  const [quizData, setQuizData] = useState([]); //Array inside array [[data1], [data2], [data3], ...]
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  

  const params = useParams()
  const {lessonId, courseId} = params

  // Fetch quiz data
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);
        const res = await axiosClient.get(`/quiz/${courseId}/${lessonId}`); // update with your endpoint
        console.log(res.data)
        setQuizData(res.data.quiz || []);
      } catch (err) {
        setLoading(true);
        console.error('Error fetching quiz:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, []);


  // Handle answer selection
  const handleSelect = (questionId, option) => {
    setAnswers(prev => ({ ...prev, [questionId]: option }));
  };


  // Submit quiz
  const submitQuiz = async () => {
    try {
      setLoading(true);
      const result = await axiosClient.post('/quiz/submit', {
        courseId,
        lessonId,
        answers: Object.keys(answers).map(key => ({
          questionId: key,
          answer: answers[key]
        }))
      });
      console.log(result.data);
      setScore(result.data.score);
    } catch (error) {
      setLoading(true);
      console.error('Error submitting quiz:', error);
    } finally {
      setLoading(false);
    }
  };

  // Move to next question or submit
  const handleNext = async () => {
    const totalQuestions = quizData[0]?.questions?.length || 0;
    if (currentQuestion + 1 < totalQuestions) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsSubmitted(true);
      const result = await submitQuiz();
      console.log('User Answers:', result);
    }
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-semibold">
        Loading Quiz...
      </div>
    );

  if (quizData.length === 0)
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-semibold">
        No quiz data found.
      </div>
    );

  const current = quizData[0].questions[currentQuestion];

  return (
    <div className="min-h-screen bg-base-200 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <Header />
      <div className="w-full max-w-3xl bg-zinc-800 shadow-lg rounded-2xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6">🧠 Quiz</h1>

        {!isSubmitted ? (
          <>
            <div className="mb-8">
              <h2 className="text-lg font-semibold mb-4">
                Question {currentQuestion + 1}: {current.question}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {current.options.map((opt, index) => (
                  <label
                    key={index}
                    className={`p-3 border rounded-lg cursor-pointer transition-all ${
                      answers[current._id] === opt
                        ? 'bg-blue-600 border-blue-00'
                        : 'hover:bg-blue-600'
                    }`}
                  >
                    <input
                      type="radio"
                      name={current._id}
                      value={opt}
                      checked={answers[current._id] === opt}
                      onChange={() => handleSelect(current._id, opt)}
                      className="mr-2"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-500">
                Question {currentQuestion + 1} of {quizData[0].questions.length}
              </p>
              <button
                onClick={handleNext}
                disabled={!answers[current._id]}
                className={`px-6 py-2 rounded-lg font-medium text-white ${
                  !answers[current._id]
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 hover:bg-blue-700'
                }`}
              >
                {currentQuestion + 1 === quizData[0].questions.length
                  ? 'Submit Quiz'
                  : 'Next Question'}
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-10">
            <h2 className="text-2xl font-bold mb-4 text-green-600">
              Quiz Submitted Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              You have answered {quizData[0].questions.length} questions.
            </p>
            <p className="text-gray-600 mb-6">
              Your score is: {score}/{quizData[0].questions.length}
            </p>
            <button
              onClick={() => {
                setCurrentQuestion(0);
                setAnswers({});
                setIsSubmitted(false);
              }}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
            >
              Retake Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPage;
