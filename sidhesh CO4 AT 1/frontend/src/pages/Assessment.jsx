import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import { useNavigate } from 'react-router-dom';
import questions from '../data/questions.json';
import { CheckCircle, XCircle, ChevronLeft, ChevronRight, Clock, AlertCircle } from 'lucide-react';

const DURATION = 60 * 60; // 60 minutes

export default function Assessment() {
  const { isDark } = useTheme();
  const { saveResults } = useProgress();
  const navigate = useNavigate();
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [showHint, setShowHint] = useState(false);
  const timerRef = useRef();

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft(t => { if (t <= 1) { clearInterval(timerRef.current); handleSubmit(); return 0; } return t - 1; });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, []);

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  const timeWarning = timeLeft < 300;

  const handleAnswer = (qid, ans) => {
    setAnswers(prev => ({ ...prev, [qid]: ans }));
  };

  const handleSubmit = () => {
    clearInterval(timerRef.current);
    const score = questions.reduce((s, q) => s + (answers[q.id] === q.answer ? q.marks : 0), 0);
    const total = questions.reduce((s, q) => s + q.marks, 0);
    const results = { score, total, answers, timestamp: Date.now(), percentage: Math.round((score / total) * 100) };
    saveResults(results);
    setSubmitted(true);
    navigate('/app/results');
  };

  const q = questions[currentIdx];
  const parts = [...new Set(questions.map(q => q.part))];
  const answered = Object.keys(answers).length;

  return (
    <div style={{ padding: '24px', maxWidth: '1100px', margin: '0 auto' }}>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 className="font-bold text-2xl mb-1" style={{ color: isDark ? '#e2e8f0' : '#1e1b4b' }}>📝 Assessment</h1>
          <p style={{ color: isDark ? '#64748b' : '#94a3b8' }}>Web Technology Unit IV — 30 Marks | 60 Minutes</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '12px', background: timeWarning ? '#fee2e2' : isDark ? '#1a2744' : '#f0f0ff', border: `2px solid ${timeWarning ? '#ef4444' : '#6366f1'}` }}>
          <Clock size={18} style={{ color: timeWarning ? '#ef4444' : '#6366f1' }} />
          <span style={{ fontFamily: 'JetBrains Mono, monospace', fontWeight: 700, fontSize: '1.25rem', color: timeWarning ? '#ef4444' : '#6366f1' }}>{timeStr}</span>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4 flex items-center gap-4">
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '4px', color: isDark ? '#64748b' : '#94a3b8' }}>
            <span>{answered} of {questions.length} answered</span>
            <span>{Math.round((answered / questions.length) * 100)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${(answered / questions.length) * 100}%` }} />
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '20px' }}>
        {/* Left: Question Navigation */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {parts.map(part => {
            const partQs = questions.filter(q => q.part === part);
            const partName = partQs[0]?.partName;
            return (
              <div key={part} className="rounded-xl p-3" style={{
                background: isDark ? '#1a2744' : 'white',
                border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'}`,
              }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#6366f1', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Part {part} — {partName}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {partQs.map((pq, i) => {
                    const globalIdx = questions.indexOf(pq);
                    const isAnswered = !!answers[pq.id];
                    const isCurrent = currentIdx === globalIdx;
                    return (
                      <button key={pq.id} onClick={() => setCurrentIdx(globalIdx)}
                        style={{
                          width: '32px', height: '32px', borderRadius: '8px', fontWeight: 700, fontSize: '0.8rem',
                          cursor: 'pointer', border: isCurrent ? '2px solid #6366f1' : '1.5px solid transparent',
                          background: isCurrent ? '#6366f1' : isAnswered ? '#dcfce7' : isDark ? 'rgba(99,102,241,0.1)' : '#f0f0ff',
                          color: isCurrent ? 'white' : isAnswered ? '#16a34a' : isDark ? '#94a3b8' : '#64748b',
                          transition: 'all 0.15s'
                        }}>
                        {globalIdx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          <button onClick={() => {
            if (window.confirm('Submit assessment? You cannot change answers after submission.')) handleSubmit();
          }} className="btn-primary justify-center py-3 mt-2">
            Submit Assessment
          </button>
        </div>

        {/* Right: Question */}
        <div className="rounded-2xl overflow-hidden" style={{
          background: isDark ? '#1a2744' : 'white',
          border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'}`,
        }}>
          {/* Header */}
          <div className="px-6 py-4 flex items-center justify-between" style={{ borderBottom: `1px solid ${isDark ? 'rgba(99,102,241,0.1)' : '#f0f0ff'}`, background: isDark ? 'rgba(99,102,241,0.06)' : '#f8faff' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ background: '#6366f1', color: 'white', borderRadius: '8px', padding: '4px 10px', fontSize: '0.8rem', fontWeight: 700 }}>Q{currentIdx + 1}</span>
              <span style={{ fontSize: '0.8rem', color: isDark ? '#64748b' : '#94a3b8' }}>Part {q.part} — {q.partName}</span>
            </div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: '#6366f1' }}>{q.marks} mark{q.marks > 1 ? 's' : ''}</span>
          </div>

          {/* Question */}
          <div style={{ padding: '24px' }}>
            <p style={{ fontSize: '1rem', fontWeight: 500, lineHeight: 1.7, color: isDark ? '#e2e8f0' : '#1e1b4b', marginBottom: '24px' }}>
              {q.question}
            </p>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {q.options.map((opt, i) => {
                const isSelected = answers[q.id] === opt;
                return (
                  <button key={i} onClick={() => handleAnswer(q.id, opt)}
                    style={{
                      textAlign: 'left', padding: '14px 18px', borderRadius: '12px', cursor: 'pointer',
                      background: isSelected ? 'rgba(99,102,241,0.12)' : isDark ? 'rgba(255,255,255,0.03)' : '#f8faff',
                      border: `2px solid ${isSelected ? '#6366f1' : isDark ? 'rgba(99,102,241,0.15)' : '#e0e7ff'}`,
                      color: isSelected ? '#6366f1' : isDark ? '#e2e8f0' : '#1e1b4b',
                      fontWeight: isSelected ? 600 : 400, fontSize: '0.9rem',
                      transition: 'all 0.15s', display: 'flex', alignItems: 'center', gap: '12px'
                    }}>
                    <span style={{
                      width: '28px', height: '28px', borderRadius: '50%', flexShrink: 0,
                      border: `2px solid ${isSelected ? '#6366f1' : isDark ? '#334155' : '#cbd5e1'}`,
                      background: isSelected ? '#6366f1' : 'transparent',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontWeight: 700, fontSize: '0.75rem'
                    }}>
                      {isSelected ? '✓' : String.fromCharCode(65 + i)}
                    </span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Hint */}
            <div style={{ marginTop: '20px' }}>
              <button onClick={() => setShowHint(!showHint)} className="btn-ghost text-xs" style={{ color: '#d97706' }}>
                <AlertCircle size={14} /> {showHint ? 'Hide' : 'Show'} Hint
              </button>
              {showHint && (
                <div style={{ marginTop: '10px', padding: '12px 16px', borderRadius: '10px', background: '#fffbeb', border: '1px solid #fde68a', fontSize: '0.8rem', color: '#92400e' }}>
                  💡 {q.explanation}
                </div>
              )}
            </div>
          </div>

          {/* Nav */}
          <div className="px-6 py-4 flex items-center justify-between" style={{ borderTop: `1px solid ${isDark ? 'rgba(99,102,241,0.1)' : '#f0f0ff'}` }}>
            <button onClick={() => { setCurrentIdx(i => Math.max(0, i - 1)); setShowHint(false); }}
              disabled={currentIdx === 0} className="btn-secondary px-4">
              <ChevronLeft size={16} /> Previous
            </button>
            <span style={{ fontSize: '0.8rem', color: isDark ? '#64748b' : '#94a3b8' }}>
              {currentIdx + 1} / {questions.length}
            </span>
            <button onClick={() => { setCurrentIdx(i => Math.min(questions.length - 1, i + 1)); setShowHint(false); }}
              disabled={currentIdx === questions.length - 1} className="btn-primary px-4">
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
