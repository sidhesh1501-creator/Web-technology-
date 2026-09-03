import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import { useNavigate } from 'react-router-dom';
import questions from '../data/questions.json';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy } from 'lucide-react';

function getPerf(pct) {
  if(pct>=90) return {label:'Outstanding 🏆',color:'#f59e0b',bg:'linear-gradient(135deg,#78350f,#b45309)'};
  if(pct>=75) return {label:'Excellent ⭐',  color:'#10b981',bg:'linear-gradient(135deg,#064e3b,#065f46)'};
  if(pct>=60) return {label:'Good 👍',        color:'#6366f1',bg:'linear-gradient(135deg,#312e81,#4338ca)'};
  if(pct>=40) return {label:'Needs Practice 📚',color:'#f59e0b',bg:'linear-gradient(135deg,#78350f,#92400e)'};
  return         {label:'Keep Trying 💪',   color:'#ef4444',bg:'linear-gradient(135deg,#7f1d1d,#991b1b)'};
}

export default function Results() {
  const { isDark } = useTheme();
  const { results } = useProgress();
  const navigate = useNavigate();

  if(!results) return (
    <div style={{ padding:'80px 24px', textAlign:'center' }}>
      <div style={{ fontSize:'4rem', marginBottom:16 }}>📋</div>
      <h2 style={{ fontWeight:900, fontSize:'1.5rem', color: isDark?'#f1f5f9':'#1e1b4b', marginBottom:8 }}>No Results Yet</h2>
      <p style={{ color: isDark?'#64748b':'#6b7280', marginBottom:24 }}>Take the assessment first to see your score here.</p>
      <button onClick={()=>navigate('/app/assessment')} style={{ background:'linear-gradient(135deg,#6366f1,#8b5cf6)', border:'none', color:'white', padding:'12px 28px', borderRadius:12, fontWeight:700, cursor:'pointer', display:'inline-flex', alignItems:'center', gap:8 }}>
        Start Assessment <ArrowRight size={16}/>
      </button>
    </div>
  );

  const perf = getPerf(results.percentage);
  const partScores = [1,2,3,4].map(part => {
    const qs = questions.filter(q=>q.part===part);
    const score = qs.reduce((s,q)=>s+(results.answers?.[q.id]===q.answer?q.marks:0),0);
    return { part, name:qs[0]?.partName, score, total:qs.reduce((s,q)=>s+q.marks,0) };
  });

  const card = { background: isDark?'#111827':'white', border:`1px solid ${isDark?'rgba(99,102,241,0.15)':'rgba(99,102,241,0.08)'}`, borderRadius:20, overflow:'hidden' };

  return (
    <div style={{ padding:'28px 24px', maxWidth:900, margin:'0 auto' }}>
      {/* Score Hero */}
      <div style={{ borderRadius:28, padding:'48px 32px', textAlign:'center', marginBottom:24, background:'linear-gradient(135deg,#1e1b4b 0%,#312e81 30%,#4f46e5 60%,#8b5cf6 100%)', boxShadow:'0 20px 60px rgba(99,102,241,0.4)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-60, right:-60, width:240, height:240, borderRadius:'50%', background:'rgba(255,255,255,0.06)' }}/>
        <div style={{ fontSize:'3.5rem', marginBottom:8 }}>
          {results.percentage>=90?'🏆':results.percentage>=75?'⭐':results.percentage>=60?'👍':'💪'}
        </div>
        <div style={{ fontSize:'0.85rem', color:'rgba(165,180,252,0.8)', fontWeight:600, marginBottom:10, textTransform:'uppercase', letterSpacing:'0.1em' }}>Web Technology Unit IV — Assessment Result</div>
        <div style={{ fontSize:'5rem', fontWeight:900, color:'white', lineHeight:1 }}>
          {results.score}<span style={{ fontSize:'50%', opacity:0.6 }}>/{results.total}</span>
        </div>
        <div style={{ fontSize:'1.8rem', fontWeight:800, color:'rgba(196,181,253,0.9)', marginBottom:12 }}>{results.percentage}%</div>
        <div style={{ display:'inline-block', background:'rgba(255,255,255,0.15)', backdropFilter:'blur(10px)', borderRadius:99, padding:'8px 24px', color:'white', fontWeight:700, fontSize:'0.95rem', border:'1px solid rgba(255,255,255,0.25)' }}>
          {perf.label}
        </div>
      </div>

      {/* Part Scores */}
      <div style={{ ...card, marginBottom:20 }}>
        <div style={{ padding:'14px 20px', borderBottom:`1px solid ${isDark?'rgba(99,102,241,0.1)':'#f0f0ff'}`, fontWeight:800, color: isDark?'#f1f5f9':'#1e1b4b', background: isDark?'rgba(99,102,241,0.05)':'#f8faff' }}>Part-wise Breakdown</div>
        <div style={{ padding:20, display:'flex', flexDirection:'column', gap:14 }}>
          {partScores.map((p,i) => {
            const pct = Math.round((p.score/p.total)*100);
            const colors = ['#6366f1','#8b5cf6','#0891b2','#10b981'];
            return (
              <div key={p.part}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}>
                  <span style={{ fontSize:'0.88rem', fontWeight:600, color: isDark?'#e2e8f0':'#1e1b4b' }}>Part {p.part} — {p.name}</span>
                  <span style={{ fontWeight:800, color:colors[i] }}>{p.score}/{p.total}</span>
                </div>
                <div style={{ height:8, borderRadius:99, background: isDark?'rgba(99,102,241,0.1)':'#e0e7ff', overflow:'hidden' }}>
                  <div style={{ height:'100%', borderRadius:99, width:`${pct}%`, background:`linear-gradient(90deg,${colors[i]},${colors[i]}aa)`, transition:'width 1s ease' }}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Review */}
      <div style={{ ...card, marginBottom:20 }}>
        <div style={{ padding:'14px 20px', borderBottom:`1px solid ${isDark?'rgba(99,102,241,0.1)':'#f0f0ff'}`, fontWeight:800, color: isDark?'#f1f5f9':'#1e1b4b', background: isDark?'rgba(99,102,241,0.05)':'#f8faff' }}>Detailed Answer Review</div>
        <div style={{ maxHeight:420, overflowY:'auto' }}>
          {questions.map((q,i) => {
            const correct = results.answers?.[q.id]===q.answer;
            return (
              <div key={q.id} style={{ padding:'14px 20px', borderBottom:`1px solid ${isDark?'rgba(99,102,241,0.06)':'#f9f9ff'}`, display:'flex', gap:12, alignItems:'flex-start' }}>
                {correct ? <CheckCircle size={18} style={{ color:'#10b981', flexShrink:0, marginTop:2 }}/> : <XCircle size={18} style={{ color:'#ef4444', flexShrink:0, marginTop:2 }}/>}
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:'0.85rem', fontWeight:500, color: isDark?'#e2e8f0':'#1e1b4b', marginBottom:4, lineHeight:1.5 }}>Q{i+1}. {q.question}</p>
                  <p style={{ fontSize:'0.78rem', color:'#10b981', fontWeight:600 }}>✓ {q.answer}</p>
                  {!correct && results.answers?.[q.id] && <p style={{ fontSize:'0.78rem', color:'#ef4444' }}>✗ {results.answers[q.id]}</p>}
                  <p style={{ fontSize:'0.73rem', color: isDark?'#475569':'#94a3b8', marginTop:3, lineHeight:1.5 }}>{q.explanation}</p>
                </div>
                <span style={{ fontWeight:800, color:correct?'#10b981':'#ef4444', fontSize:'0.8rem', flexShrink:0 }}>{correct?`+${q.marks}`:0}/{q.marks}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div style={{ display:'flex', gap:12, flexWrap:'wrap' }}>
        <button onClick={()=>navigate('/app/assessment')} style={{ background:'linear-gradient(135deg,#6366f1,#8b5cf6)', border:'none', color:'white', padding:'12px 24px', borderRadius:12, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:8, boxShadow:'0 4px 20px rgba(99,102,241,0.3)' }}>
          <RotateCcw size={16}/> Retake
        </button>
        <button onClick={()=>navigate('/app/dashboard')} style={{ background:'transparent', border:'2px solid #6366f1', color:'#6366f1', padding:'12px 24px', borderRadius:12, fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', gap:8 }}>
          Dashboard <ArrowRight size={16}/>
        </button>
      </div>
    </div>
  );
}
