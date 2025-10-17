// // import React from "react";
// // import Nav from "../components/Nav";






// // export default function Quiz(){





// //    return(
// //       <>
// //       <Nav/>
// //       <div>
// //          <p>I'm quiz page</p>
// //       </div>
// //       </>
// //    )
// // }

// import React from 'react';
// import { useState } from 'react';
// import { CheckCircle, XCircle, RotateCcw } from 'lucide-react';

// export default function Quiz() {
//   const questions = [
//     {
//       id: 1,
//       question: "What is the capital of France?",
//       options: ["London", "Berlin", "Paris", "Madrid"],
//       correct: 2
//     },
//     {
//       id: 2,
//       question: "Which planet is known as the Red Planet?",
//       options: ["Venus", "Mars", "Jupiter", "Saturn"],
//       correct: 1
//     },
//     {
//       id: 3,
//       question: "What is 2 + 2?",
//       options: ["3", "4", "5", "6"],
//       correct: 1
//     },
//     {
//       id: 4,
//       question: "Who painted the Mona Lisa?",
//       options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
//       correct: 2
//     },
//     {
//       id: 5,
//       question: "What is the largest ocean on Earth?",
//       options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
//       correct: 3
//     }
//   ];

//   const [current, setCurrent] = useState(0);
//   const [selected, setSelected] = useState(null);
//   const [answers, setAnswers] = useState([]);
//   const [showResult, setShowResult] = useState(false);

//   const handleSelect = (idx) => {
//     if (selected === null) {
//       setSelected(idx);
//       setAnswers([...answers, idx === questions[current].correct]);
//     }
//   };

//   const handleNext = () => {
//     if (current < questions.length - 1) {
//       setCurrent(current + 1);
//       setSelected(null);
//     } else {
//       setShowResult(true);
//     }
//   };

//   const handleRestart = () => {
//     setCurrent(0);
//     setSelected(null);
//     setAnswers([]);
//     setShowResult(false);
//   };

//   const score = answers.filter(a => a).length;

//   if (showResult) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
//           <div className="mb-6">
//             <div className="text-6xl mb-4">🎉</div>
//             <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
//             <p className="text-gray-600">Here's how you did:</p>
//           </div>
          
//           <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6 mb-6">
//             <div className="text-5xl font-bold text-purple-600 mb-2">
//               {score}/{questions.length}
//             </div>
//             <p className="text-gray-700 font-medium">
//               {score === questions.length ? "Perfect Score! 🌟" : 
//                score >= questions.length * 0.7 ? "Great Job! 👏" :
//                score >= questions.length * 0.5 ? "Good Effort! 👍" :
//                "Keep Practicing! 💪"}
//             </p>
//           </div>

//           <button
//             onClick={handleRestart}
//             className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2 mx-auto"
//           >
//             <RotateCcw size={20} />
//             Try Again
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
//       <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
//         <div className="mb-6">
//           <div className="flex justify-between items-center mb-4">
//             <span className="text-sm font-semibold text-gray-500">
//               Question {current + 1} of {questions.length}
//             </span>
//             <span className="text-sm font-semibold text-purple-600">
//               Score: {score}/{current}
//             </span>
//           </div>
//           <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
//             <div 
//               className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
//               style={{ width: `${((current + 1) / questions.length) * 100}%` }}
//             ></div>
//           </div>
//         </div>

//         <h2 className="text-2xl font-bold text-gray-800 mb-6">
//           {questions[current].question}
//         </h2>

//         <div className="space-y-3 mb-6">
//           {questions[current].options.map((option, idx) => {
//             const isCorrect = idx === questions[current].correct;
//             const isSelected = selected === idx;
            
//             let bgColor = "bg-gray-50 hover:bg-gray-100";
//             let borderColor = "border-gray-200";
//             let textColor = "text-gray-800";
            
//             if (selected !== null) {
//               if (isSelected && isCorrect) {
//                 bgColor = "bg-green-100";
//                 borderColor = "border-green-500";
//                 textColor = "text-green-800";
//               } else if (isSelected && !isCorrect) {
//                 bgColor = "bg-red-100";
//                 borderColor = "border-red-500";
//                 textColor = "text-red-800";
//               } else if (isCorrect) {
//                 bgColor = "bg-green-50";
//                 borderColor = "border-green-300";
//                 textColor = "text-green-800";
//               }
//             }

//             return (
//               <button
//                 key={idx}
//                 onClick={() => handleSelect(idx)}
//                 disabled={selected !== null}
//                 className={`w-full p-4 rounded-xl border-2 ${bgColor} ${borderColor} ${textColor} transition-all font-medium text-left flex items-center justify-between ${selected === null ? 'hover:scale-102 cursor-pointer' : 'cursor-default'}`}
//               >
//                 <span>{option}</span>
//                 {selected !== null && isSelected && (
//                   isCorrect ? <CheckCircle className="text-green-600" size={24} /> : <XCircle className="text-red-600" size={24} />
//                 )}
//                 {selected !== null && !isSelected && isCorrect && (
//                   <CheckCircle className="text-green-600" size={24} />
//                 )}
//               </button>
//             );
//           })}
//         </div>

//         {selected !== null && (
//           <button
//             onClick={handleNext}
//             className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
//           >
//             {current < questions.length - 1 ? "Next Question" : "Show Results"}
//           </button>
//         )}
//       </div>
//     </div>
//   );
// }



import React from 'react';
import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, RotateCcw, Loader2, AlertCircle } from 'lucide-react';

export default function QuizPage() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [userName, setUserName] = useState('');
  const [quizStarted, setQuizStarted] = useState(false);

  // Simulated API call to fetch questions from database
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulated response from your backend API
      // Replace this with: const response = await fetch('YOUR_API_ENDPOINT/questions');
      // const data = await response.json();
      
      const mockData = [
        {
          id: 1,
          question: "What is the capital of France?",
          options: ["London", "Berlin", "Paris", "Madrid"],
          correct: 2
        },
        {
          id: 2,
          question: "Which planet is known as the Red Planet?",
          options: ["Venus", "Mars", "Jupiter", "Saturn"],
          correct: 1
        },
        {
          id: 3,
          question: "What is 2 + 2?",
          options: ["3", "4", "5", "6"],
          correct: 1
        },
        {
          id: 4,
          question: "Who painted the Mona Lisa?",
          options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
          correct: 2
        },
        {
          id: 5,
          question: "What is the largest ocean on Earth?",
          options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
          correct: 3
        }
      ];
      
      setQuestions(mockData);
      setLoading(false);
    } catch (err) {
      setError('Failed to load quiz questions. Please try again.');
      setLoading(false);
    }
  };

  // Simulated API call to submit results to database
  const submitResults = async (resultData) => {
    try {
      setSubmitting(true);
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Replace this with your actual API call:
      // const response = await fetch('YOUR_API_ENDPOINT/submit-result', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(resultData)
      // });
      
      console.log('Submitting to database:', resultData);
      
      setSubmitting(false);
      setShowResult(true);
    } catch (err) {
      setError('Failed to submit results. Please try again.');
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleStartQuiz = () => {
    if (userName.trim()) {
      setQuizStarted(true);
    }
  };

  const handleSelect = (idx) => {
    if (selected === null) {
      setSelected(idx);
      const isCorrect = idx === questions[current].correct;
      setAnswers([...answers, {
        questionId: questions[current].id,
        selectedAnswer: idx,
        correctAnswer: questions[current].correct,
        isCorrect: isCorrect
      }]);
    }
  };

  const handleNext = () => {
    if (current < questions.length - 1) {
      setCurrent(current + 1);
      setSelected(null);
    } else {
      // Prepare data for submission
      const score = answers.filter(a => a.isCorrect).length + (selected === questions[current].correct ? 1 : 0);
      const resultData = {
        userName: userName,
        score: score,
        totalQuestions: questions.length,
        percentage: ((score / questions.length) * 100).toFixed(2),
        answers: answers,
        completedAt: new Date().toISOString(),
        timeTaken: null // You can add a timer if needed
      };
      
      submitResults(resultData);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setShowResult(false);
    setQuizStarted(false);
    setUserName('');
    fetchQuestions();
  };

  const score = answers.filter(a => a.isCorrect).length;

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          <Loader2 className="animate-spin text-purple-600 mx-auto mb-4" size={48} />
          <p className="text-gray-700 font-medium">Loading quiz questions...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error && !questions.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center max-w-md">
          <AlertCircle className="text-red-500 mx-auto mb-4" size={48} />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Oops!</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={fetchQuestions}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Submitting state
  if (submitting) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          <Loader2 className="animate-spin text-purple-600 mx-auto mb-4" size={48} />
          <p className="text-gray-700 font-medium">Submitting your results...</p>
        </div>
      </div>
    );
  }

  // Result screen
  if (showResult) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <div className="text-6xl mb-4">🎉</div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Quiz Complete!</h2>
            <p className="text-gray-600 mb-2">Great job, {userName}!</p>
            <p className="text-sm text-green-600 font-medium">✓ Results saved to database</p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl p-6 mb-6">
            <div className="text-5xl font-bold text-purple-600 mb-2">
              {score}/{questions.length}
            </div>
            <p className="text-gray-700 font-medium text-lg mb-1">
              {((score / questions.length) * 100).toFixed(0)}% Correct
            </p>
            <p className="text-gray-600 text-sm">
              {score === questions.length ? "Perfect Score! 🌟" : 
               score >= questions.length * 0.7 ? "Great Job! 👏" :
               score >= questions.length * 0.5 ? "Good Effort! 👍" :
               "Keep Practicing! 💪"}
            </p>
          </div>

          <button
            onClick={handleRestart}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all flex items-center justify-center gap-2 mx-auto"
          >
            <RotateCcw size={20} />
            Take Quiz Again
          </button>
        </div>
      </div>
    );
  }

  // Start screen
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
          <div className="text-center mb-6">
            <div className="text-6xl mb-4">📝</div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to the Quiz!</h1>
            <p className="text-gray-600">Enter your name to begin</p>
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-2">Your Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleStartQuiz()}
              placeholder="Enter your name"
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-purple-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="bg-purple-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-2">Quiz Info:</h3>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• {questions.length} questions</li>
              <li>• Multiple choice format</li>
              <li>• Results saved automatically</li>
            </ul>
          </div>

          <button
            onClick={handleStartQuiz}
            disabled={!userName.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  // Quiz screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-2xl w-full">
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <span className="text-sm font-semibold text-gray-500">
              Question {current + 1} of {questions.length}
            </span>
            <div className="text-right">
              <div className="text-sm font-semibold text-purple-600">
                {userName}
              </div>
              <div className="text-xs text-gray-500">
                Score: {score}/{current}
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((current + 1) / questions.length) * 100}%` }}
            ></div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          {questions[current].question}
        </h2>

        <div className="space-y-3 mb-6">
          {questions[current].options.map((option, idx) => {
            const isCorrect = idx === questions[current].correct;
            const isSelected = selected === idx;
            
            let bgColor = "bg-gray-50 hover:bg-gray-100";
            let borderColor = "border-gray-200";
            let textColor = "text-gray-800";
            
            if (selected !== null) {
              if (isSelected && isCorrect) {
                bgColor = "bg-green-100";
                borderColor = "border-green-500";
                textColor = "text-green-800";
              } else if (isSelected && !isCorrect) {
                bgColor = "bg-red-100";
                borderColor = "border-red-500";
                textColor = "text-red-800";
              } else if (isCorrect) {
                bgColor = "bg-green-50";
                borderColor = "border-green-300";
                textColor = "text-green-800";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={selected !== null}
                className={`w-full p-4 rounded-xl border-2 ${bgColor} ${borderColor} ${textColor} transition-all font-medium text-left flex items-center justify-between ${selected === null ? 'hover:scale-102 cursor-pointer' : 'cursor-default'}`}
              >
                <span>{option}</span>
                {selected !== null && isSelected && (
                  isCorrect ? <CheckCircle className="text-green-600" size={24} /> : <XCircle className="text-red-600" size={24} />
                )}
                {selected !== null && !isSelected && isCorrect && (
                  <CheckCircle className="text-green-600" size={24} />
                )}
              </button>
            );
          })}
        </div>

        {selected !== null && (
          <button
            onClick={handleNext}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition-all"
          >
            {current < questions.length - 1 ? "Next Question" : "Submit Quiz"}
          </button>
        )}
      </div>
    </div>
  );
}