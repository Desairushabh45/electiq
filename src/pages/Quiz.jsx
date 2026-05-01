import { useState } from 'react';
import { Award, RefreshCcw } from 'lucide-react';

const questions = [
  {
    question: "What is the primary purpose of voter registration?",
    options: [
      "To pay election taxes",
      "To ensure citizens are eligible to vote",
      "To choose a political party",
      "To apply for a mail-in ballot"
    ],
    answer: 1
  },
  {
    question: "During which stage do candidates typically debate opponents and rally supporters?",
    options: [
      "Inauguration",
      "Candidate Declaration",
      "Counting & Verification",
      "Campaigning"
    ],
    answer: 3
  },
  {
    question: "What happens after the ballots are collected on Voting Day?",
    options: [
      "The candidate with the most money wins",
      "They are immediately destroyed",
      "Counting and Verification",
      "A new election is scheduled"
    ],
    answer: 2
  },
  {
    question: "What is the final stage of the election process where the winner takes office?",
    options: [
      "Results Announcement",
      "Inauguration",
      "Campaigning",
      "Certification"
    ],
    answer: 1
  }
];

const Quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleOptionClick = (index) => {
    if (hasAnswered) return;
    setSelectedOption(index);
    setHasAnswered(true);

    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setHasAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setScore(0);
    setShowResults(false);
    setHasAnswered(false);
  };

  if (showResults) {
    return (
      <div className="animate-fade-in" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="glass-panel" style={{ padding: '4rem', textAlign: 'center', maxWidth: '600px', width: '100%' }}>
          <Award size={80} color="var(--warning)" style={{ marginBottom: '1rem' }} />
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Quiz Completed!</h2>
          <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>
            You scored <span className="text-gradient" style={{ fontWeight: 'bold' }}>{score}</span> out of {questions.length}
          </p>
          <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', marginBottom: '2rem', overflow: 'hidden' }}>
            <div style={{ width: `${(score / questions.length) * 100}%`, height: '100%', background: 'var(--accent-gradient)', transition: 'width 1s ease' }} />
          </div>
          <button className="btn btn-primary" onClick={resetQuiz}>
            <RefreshCcw size={20} /> Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2rem' }}>
      <header style={{ textAlign: 'center', marginBottom: '1rem' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Knowledge <span className="text-gradient">Check</span></h1>
        <p style={{ color: 'var(--text-secondary)' }}>Test your understanding of the election process.</p>
      </header>

      <div className="glass-panel" style={{ maxWidth: '800px', width: '100%', padding: '3rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-muted)' }}>
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>Score: {score}</span>
        </div>

        <h3 style={{ fontSize: '1.8rem', lineHeight: '1.4' }}>{q.question}</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {q.options.map((option, index) => {
            let bgColor = 'rgba(255,255,255,0.05)';
            let borderColor = 'var(--border-color)';
            
            if (hasAnswered) {
              if (index === q.answer) {
                bgColor = 'rgba(16, 185, 129, 0.2)'; // Success
                borderColor = 'var(--success)';
              } else if (index === selectedOption) {
                bgColor = 'rgba(239, 68, 68, 0.2)'; // Danger
                borderColor = 'var(--danger)';
              }
            } else if (selectedOption === index) {
              bgColor = 'rgba(59, 130, 246, 0.2)';
              borderColor = 'var(--accent-primary)';
            }

            return (
              <button
                key={index}
                onClick={() => handleOptionClick(index)}
                disabled={hasAnswered}
                style={{
                  padding: '1.2rem',
                  borderRadius: '8px',
                  border: `1px solid ${borderColor}`,
                  background: bgColor,
                  color: 'var(--text-primary)',
                  fontSize: '1.1rem',
                  textAlign: 'left',
                  cursor: hasAnswered ? 'default' : 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'var(--font-sans)'
                }}
                onMouseOver={(e) => {
                  if (!hasAnswered) {
                    e.currentTarget.style.borderColor = 'var(--accent-primary)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  }
                }}
                onMouseOut={(e) => {
                  if (!hasAnswered) {
                    e.currentTarget.style.borderColor = borderColor;
                    e.currentTarget.style.background = bgColor;
                  }
                }}
              >
                {option}
              </button>
            );
          })}
        </div>

        {hasAnswered && (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button className="btn btn-primary" onClick={handleNextQuestion}>
              {currentQuestion < questions.length - 1 ? 'Next Question' : 'View Results'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
