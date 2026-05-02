import { useState, useCallback, useMemo } from 'react';
import { Award, RefreshCcw, CheckCircle2, XCircle } from 'lucide-react';

const quizQuestions = [
  {
    question: "How many seats are there in the Lok Sabha (House of the People)?",
    options: [
      "250",
      "543",
      "545",
      "552",
    ],
    answer: 1,
    explanation: "The Lok Sabha has 543 directly elected seats. 2 seats (Anglo-Indian community) were removed by the 104th Constitutional Amendment in 2020.",
  },
  {
    question: "Which constitutional body conducts General Elections in India?",
    options: [
      "The Supreme Court of India",
      "The Ministry of Home Affairs",
      "The Election Commission of India (ECI)",
      "The President of India",
    ],
    answer: 2,
    explanation: "The Election Commission of India (ECI), established under Article 324, is an independent constitutional body that conducts all Lok Sabha, Rajya Sabha, and State Assembly elections.",
  },
  {
    question: "What does EVM stand for in Indian elections?",
    options: [
      "Electronic Voter Machine",
      "Election Verification Module",
      "Electronic Voting Machine",
      "Electoral Vote Mechanism",
    ],
    answer: 2,
    explanation: "EVM stands for Electronic Voting Machine. India pioneered large-scale paperless electronic voting. EVMs were first used nationwide in the 2004 General Election.",
  },
  {
    question: "What is the minimum age to vote in India?",
    options: [
      "16 years",
      "21 years",
      "25 years",
      "18 years",
    ],
    answer: 3,
    explanation: "The minimum voting age in India is 18 years. This was lowered from 21 years by the 61st Constitutional Amendment Act in 1988, effective from 1989.",
  },
  {
    question: "What does NOTA stand for on an Indian EVM ballot?",
    options: [
      "No Official Tally Available",
      "None of the Above",
      "National Option for Total Abstention",
      "Not On The Attendance",
    ],
    answer: 1,
    explanation: "NOTA stands for 'None of the Above'. It was introduced in 2013 following a Supreme Court order. Even if NOTA gets the most votes, the candidate with the highest votes among listed candidates wins.",
  },
  {
    question: "What is the Model Code of Conduct (MCC)?",
    options: [
      "A law passed by Parliament to regulate elections",
      "Guidelines for ethical political conduct enforced by the ECI during elections",
      "A code of conduct for Election Commission officers",
      "Rules for media coverage of elections",
    ],
    answer: 1,
    explanation: "The MCC is a set of guidelines issued by the ECI that comes into effect from the date the election schedule is announced. It restricts the ruling government from making new policy announcements and prevents misuse of government resources for campaigning.",
  },
  {
    question: "What does VVPAT stand for?",
    options: [
      "Voter Verified Paper Audit Trail",
      "Validated Voting Paper and Audit Track",
      "Verified Voter Polling Audit Tool",
      "Vote Verification and Paper Audit Test",
    ],
    answer: 0,
    explanation: "VVPAT (Voter Verified Paper Audit Trail) is a machine paired with the EVM that prints a paper slip showing the candidate voted for. The slip is visible to the voter for 7 seconds before dropping into a sealed box, providing a physical audit trail.",
  },
];

const getRank = (score, total) => {
  const pct = (score / total) * 100;
  if (pct === 100) return { label: <span><span lang="hi">भारत रत्न</span> — Election Expert! 🏆</span>, color: 'text-yellow-600' };
  if (pct >= 71) return { label: 'Lok Sabha Scholar 🏛️', color: 'text-blue-700' };
  if (pct >= 43) return { label: 'Engaged Voter 🗳️', color: 'text-green-700' };
  return { label: 'Naagrik Shagird (Civic Learner) 📚', color: 'text-orange-600' };
};

const ElectionQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const questions = useMemo(() => quizQuestions, []);

  const handleOptionClick = useCallback((index) => {
    if (hasAnswered) return;
    setSelectedOption(index);
    setHasAnswered(true);
    if (index === questions[currentQuestion].answer) {
      setScore((prev) => prev + 1);
    }
  }, [hasAnswered, currentQuestion, questions]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      setShowResults(true);
    }
  }, [currentQuestion, questions.length]);

  const resetQuiz = useCallback(() => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResults(false);
    setHasAnswered(false);
  }, []);

  const q = questions[currentQuestion];
  const rank = getRank(score, quizQuestions.length);

  if (showResults) {
    return (
      <section id="quiz" className="w-full bg-white rounded-2xl shadow-md border border-slate-100 p-8 md:p-12 text-center">
        <Award size={72} className="mx-auto text-yellow-500 mb-6" aria-hidden="true" />
        <h2 className="text-3xl md:text-4xl text-slate-900 font-bold mb-2">Quiz Complete! 🇮🇳</h2>
        <p className="text-slate-500 mb-8">Here's how you did on India's election knowledge quiz</p>

        <div role="status" className="bg-gradient-to-br from-orange-50 to-blue-50 rounded-2xl p-8 max-w-lg mx-auto mb-8 border border-orange-100">
          <p className="text-lg text-slate-600 mb-1">Your Score</p>
          <p className="text-6xl font-extrabold text-india-navy mb-3">{score}<span className="text-2xl text-slate-400 font-normal"> / {quizQuestions.length}</span></p>

          {/* Tri-color progress bar */}
          <div className="w-full h-5 bg-slate-200 rounded-full overflow-hidden mb-5 flex">
            <div
              className="h-full bg-gradient-to-r from-saffron-500 via-white to-india-green transition-all duration-1000 border-y border-slate-200"
              style={{ width: `${(score / quizQuestions.length) * 100}%` }}
            />
          </div>

          <p className={`text-xl font-bold ${rank.color}`}>{rank.label}</p>
        </div>

        <button
          onClick={resetQuiz}
          className="bg-india-navy text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-900 transition-colors flex items-center justify-center gap-2 mx-auto"
        >
          <RefreshCcw size={18} aria-hidden="true" /> Retake Quiz
        </button>
      </section>
    );
  }

  return (
    <section id="quiz" className="w-full bg-white rounded-2xl shadow-md border border-slate-100 p-8 md:p-12">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl text-slate-900 font-bold mb-3">
          🇮🇳 Test Your Knowledge
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          7 questions on India's election system — EVMs, ECI, Lok Sabha, and more. How well do you know your democracy?
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {/* Progress */}
        <div className="flex justify-between items-center mb-3">
          <span className="text-sm text-slate-500 font-medium">Question {currentQuestion + 1} of {quizQuestions.length}</span>
          <span className="text-sm text-slate-500 font-medium">Score: <strong className="text-india-navy">{score}</strong></span>
        </div>
        <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mb-6">
          <div
            className="h-full bg-saffron-500 transition-all duration-300 rounded-full"
            style={{ width: `${((currentQuestion) / quizQuestions.length) * 100}%` }}
          />
        </div>

        <h3 id="question-text" className="text-xl md:text-2xl text-slate-800 font-semibold mb-6 leading-relaxed">
          {q.question}
        </h3>

        <div className="flex flex-col gap-3 mb-6">
          {q.options.map((option, index) => {
            const isSelected   = selectedOption === index;
            const isCorrect    = index === q.answer;
            const showCorrect  = hasAnswered && isCorrect;
            const showIncorrect = hasAnswered && isSelected && !isCorrect;

            let cls = "w-full text-left p-4 rounded-xl border-2 transition-all font-medium flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 ";
            if (!hasAnswered) {
              cls += "bg-slate-50 border-slate-200 text-slate-700 hover:border-saffron-400 hover:bg-orange-50 cursor-pointer";
            } else if (showCorrect) {
              cls += "bg-green-50 border-green-500 text-green-900";
            } else if (showIncorrect) {
              cls += "bg-red-50 border-red-500 text-red-900";
            } else {
              cls += "bg-slate-50 border-slate-200 text-slate-400 opacity-50 cursor-not-allowed";
            }

            return (
              <button 
                key={index} 
                onClick={() => handleOptionClick(index)} 
                disabled={hasAnswered} 
                className={cls}
                aria-label={`Option ${index + 1}: ${option}`}
                aria-describedby="question-text"
              >
                <span>{option}</span>
                {showCorrect  && <CheckCircle2 className="text-green-600 flex-shrink-0" size={22} aria-hidden="true" />}
                {showIncorrect && <XCircle className="text-red-600 flex-shrink-0" size={22} aria-hidden="true" />}
              </button>
            );
          })}
        </div>

        {/* Explanation after answering */}
        {hasAnswered && (
          <div aria-live="polite" className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-800 leading-relaxed">
            <strong>💡 Explanation:</strong> {q.explanation}
          </div>
        )}

        {hasAnswered && (
          <div className="flex justify-end">
            <button
              onClick={handleNextQuestion}
              className="bg-india-navy text-white px-8 py-3 rounded-xl font-semibold shadow-md hover:bg-blue-900 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {currentQuestion < quizQuestions.length - 1 ? 'Next Question →' : 'View Results 🏆'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ElectionQuiz;
