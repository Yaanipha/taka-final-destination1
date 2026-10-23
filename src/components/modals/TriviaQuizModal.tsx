import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { triviaQuestions } from '../../data/mockData';

export const TriviaQuizModal: React.FC = () => {
  const { isTriviaModalOpen, setIsTriviaModalOpen, showToast } = useApp();
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  if (!isTriviaModalOpen) return null;

  const currentQ = triviaQuestions[currentIdx];

  const handleSelectOption = (idx: number) => {
    if (showResult) return;
    setSelectedOption(idx);
    setShowResult(true);
    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < triviaQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setShowResult(false);
    } else {
      setIsCompleted(true);
      showToast('🌸 Takashimaya Trivia Completed! +10 Petals added to your account.');
    }
  };

  const handleReset = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setShowResult(false);
    setScore(0);
    setIsCompleted(false);
    setIsTriviaModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#fff8f7] w-full max-w-md rounded-3xl shadow-2xl border border-[#ffe1e1] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 bg-gradient-to-r from-[#b7002d] via-[#df2040] to-[#b7002d] text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xl">🌸</span>
            <div>
              <h3 className="font-serif-luxury font-bold text-base">
                Takashimaya Spring Trivia
              </h3>
              <p className="text-[11px] text-white/80">Question {currentIdx + 1} of 3</p>
            </div>
          </div>
          <button
            onClick={() => setIsTriviaModalOpen(false)}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex-1">
          {!isCompleted ? (
            <div>
              {/* Question */}
              <div className="mb-4">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#b7002d]">
                  Daily Challenge • +10 Petals
                </span>
                <h4 className="text-sm md:text-base font-bold text-[#40000a] mt-1 leading-snug">
                  {currentQ.question}
                </h4>
              </div>

              {/* Options */}
              <div className="space-y-2 mb-4">
                {currentQ.options.map((opt, idx) => {
                  let btnStyle = 'bg-white border-[#ffe1e1] text-[#40000a] hover:bg-[#ffe9e8]';
                  if (showResult) {
                    if (idx === currentQ.correctIndex) {
                      btnStyle = 'bg-emerald-50 border-emerald-400 text-emerald-800 font-bold';
                    } else if (idx === selectedOption) {
                      btnStyle = 'bg-red-50 border-red-400 text-red-800 font-bold';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      disabled={showResult}
                      className={`w-full text-left p-3 rounded-xl border text-xs font-medium transition-all flex items-center justify-between ${btnStyle}`}
                    >
                      <span>{opt}</span>
                      {showResult && idx === currentQ.correctIndex && (
                        <span className="material-symbols-outlined text-emerald-600 text-[18px]">
                          check_circle
                        </span>
                      )}
                      {showResult && idx === selectedOption && idx !== currentQ.correctIndex && (
                        <span className="material-symbols-outlined text-red-500 text-[18px]">
                          cancel
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Explanation & Next Button */}
              {showResult && (
                <div className="p-3 rounded-xl bg-[#ffe9e8] border border-[#e5bdbc] mb-4">
                  <p className="text-xs text-[#5c3f3f] leading-relaxed">
                    💡 {currentQ.explanation}
                  </p>
                  <button
                    onClick={handleNext}
                    className="mt-3 w-full py-2 rounded-full bg-[#b7002d] text-white font-bold text-xs hover:bg-[#920022] transition-colors"
                  >
                    {currentIdx < triviaQuestions.length - 1 ? 'Next Question →' : 'Complete Quiz 🎉'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-4 space-y-3">
              <span className="text-5xl animate-bounce inline-block">🌸</span>
              <h4 className="font-serif-luxury font-bold text-xl text-[#40000a]">
                Congratulations!
              </h4>
              <p className="text-xs text-[#5c3f3f]">
                You scored {score} of {triviaQuestions.length} correct answers! +10 Sakura Petals
                have been awarded to your account.
              </p>
              <button
                onClick={handleReset}
                className="w-full py-2.5 rounded-full bg-[#b7002d] text-white font-bold text-xs shadow-md hover:bg-[#920022] transition-colors"
              >
                Close &amp; Return to Rewards
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
