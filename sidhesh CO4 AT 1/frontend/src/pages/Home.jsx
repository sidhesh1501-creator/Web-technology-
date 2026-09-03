import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { BookOpen, Zap, ArrowRight, Code2, Search, BarChart3, Brain } from 'lucide-react';

const PIPELINE = [
  { label: 'XML', icon: '📄', grad: 'linear-gradient(135deg,#6366f1,#4f46e5)', glow: '#6366f1' },
  { label: 'XPath', icon: '🔍', grad: 'linear-gradient(135deg,#8b5cf6,#7c3aed)', glow: '#8b5cf6' },
  { label: 'XSLT', icon: '⚡', grad: 'linear-gradient(135deg,#06b6d4,#0891b2)', glow: '#06b6d4' },
  { label: 'HTML', icon: '🌐', grad: 'linear-gradient(135deg,#10b981,#059669)', glow: '#10b981' },
];

const FEATURES = [
  { icon: <Code2 size={22}/>, title: 'XML Explorer', desc: 'Syntax-highlighted interactive XML viewer', color: '#6366f1', bg: 'linear-gradient(135deg,#eef2ff,#e0e7ff)' },
  { icon: <Search size={22}/>, title: 'XPath Playground', desc: 'Run live XPath queries on real data', color: '#7c3aed', bg: 'linear-gradient(135deg,#f5f3ff,#ede9fe)' },
  { icon: <Zap size={22}/>, title: 'XSLT Simulator', desc: 'Transform XML to HTML in real-time', color: '#0891b2', bg: 'linear-gradient(135deg,#ecfeff,#cffafe)' },
  { icon: <BarChart3 size={22}/>, title: 'Analytics', desc: 'Live charts from your XML dataset', color: '#059669', bg: 'linear-gradient(135deg,#f0fdf4,#dcfce7)' },
  { icon: <Brain size={22}/>, title: 'Assessment', desc: '30-mark exam with instant evaluation', color: '#d97706', bg: 'linear-gradient(135deg,#fffbeb,#fef3c7)' },
  { icon: <BookOpen size={22}/>, title: 'Learning Modules', desc: '4 structured modules with mini quizzes', color: '#e11d48', bg: 'linear-gradient(135deg,#fff1f2,#ffe4e6)' },
];

export default function Home() {
  const { loginDemo } = useAuth();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const go = (path) => { loginDemo(); navigate(path); };

  return (
    <div style={{ fontFamily: 'Inter, sans-serif', minHeight: '100vh', background: isDark ? '#080d1a' : '#f4f6ff' }}>
      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 32px', height: '64px',
        background: 'rgba(8,12,26,0.85)', backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(99,102,241,0.2)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width:36, height:36, borderRadius:10, background:'linear-gradient(135deg,#6366f1,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:900, fontSize:'0.8rem' }}>WT</div>
          <span style={{ color:'white', fontWeight:700, fontSize:'0.95rem' }}>WebTech Unit IV</span>
        </div>
        <div style={{ display:'flex', gap:12 }}>
          <button onClick={toggleTheme} style={{ background:'rgba(255,255,255,0.08)', border:'1px solid rgba(255,255,255,0.15)', color:'white', padding:'6px 14px', borderRadius:8, cursor:'pointer', fontSize:'0.8rem' }}>
            {isDark ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button onClick={() => go('/app/dashboard')} style={{ background:'linear-gradient(135deg,#6366f1,#8b5cf6)', border:'none', color:'white', padding:'8px 20px', borderRadius:10, cursor:'pointer', fontWeight:700, fontSize:'0.85rem' }}>
            Enter Platform →
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '80px 24px 60px', position: 'relative', overflow: 'hidden',
        background: 'linear-gradient(135deg, #0f0c29 0%, #1a1248 20%, #24186b 45%, #312e81 65%, #4338ca 85%, #6366f1 100%)',
      }}>
        {/* Orbs */}
        {[{top:'10%',left:'5%',size:500,color:'rgba(139,92,246,0.15)'},{top:'60%',right:'2%',size:400,color:'rgba(6,182,212,0.12)'},{bottom:'10%',left:'30%',size:300,color:'rgba(99,102,241,0.1)'}].map((o,i)=>(
          <div key={i} style={{ position:'absolute', width:o.size, height:o.size, borderRadius:'50%', background:`radial-gradient(circle,${o.color},transparent 70%)`, top:o.top, left:o.left, right:o.right, bottom:o.bottom, filter:'blur(40px)', pointerEvents:'none' }} />
        ))}

        {/* Badge */}
        <div style={{ background:'rgba(99,102,241,0.2)', border:'1px solid rgba(165,180,252,0.4)', borderRadius:99, padding:'6px 20px', color:'#a5b4fc', fontSize:'0.8rem', fontWeight:700, marginBottom:24, animation:'fadeIn 0.5s ease-out' }}>
          📚 Web Technology — Unit IV · Representing Web Data
        </div>

        {/* Title */}
        <h1 style={{ fontSize:'clamp(2.8rem,7vw,5rem)', fontWeight:900, color:'white', textAlign:'center', lineHeight:1.1, marginBottom:16, maxWidth:800, animation:'fadeIn 0.6s ease-out 0.1s both' }}>
          Master{' '}
          <span style={{ background:'linear-gradient(135deg,#a5b4fc,#c084fc,#67e8f9)', WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text' }}>
            XML · XPath · XSLT
          </span>
        </h1>
        <p style={{ color:'rgba(196,181,253,0.9)', fontSize:'1.1rem', textAlign:'center', marginBottom:10, fontWeight:600, animation:'fadeIn 0.6s ease-out 0.2s both' }}>
          Explore XML • Master XPath • Transform with XSLT • Interpret Data
        </p>
        <p style={{ color:'rgba(148,163,184,0.8)', textAlign:'center', maxWidth:480, lineHeight:1.7, marginBottom:40, fontSize:'0.9rem', animation:'fadeIn 0.6s ease-out 0.3s both' }}>
          A premium interactive learning platform with live labs, real-time XPath execution, XSLT transformation, and intelligent assessment.
        </p>

        {/* CTAs */}
        <div style={{ display:'flex', gap:16, flexWrap:'wrap', justifyContent:'center', marginBottom:64, animation:'fadeIn 0.6s ease-out 0.4s both' }}>
          <button onClick={()=>go('/app/dashboard')} style={{ background:'linear-gradient(135deg,#6366f1,#8b5cf6)', border:'none', color:'white', padding:'14px 36px', borderRadius:14, fontWeight:800, fontSize:'1rem', cursor:'pointer', boxShadow:'0 8px 32px rgba(99,102,241,0.45)', display:'flex', alignItems:'center', gap:8, transition:'all 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.transform='translateY(-2px)'}
            onMouseLeave={e=>e.currentTarget.style.transform='translateY(0)'}>
            <BookOpen size={20}/> Start Learning <ArrowRight size={18}/>
          </button>
          <button onClick={()=>go('/app/xslt')} style={{ background:'rgba(255,255,255,0.08)', border:'1.5px solid rgba(255,255,255,0.3)', color:'white', padding:'14px 36px', borderRadius:14, fontWeight:700, fontSize:'1rem', cursor:'pointer', backdropFilter:'blur(10px)', display:'flex', alignItems:'center', gap:8, transition:'all 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.15)'}
            onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.08)'}>
            <Zap size={20}/> Launch Simulator
          </button>
        </div>

        {/* Pipeline */}
        <div style={{ display:'flex', alignItems:'center', gap:16, flexWrap:'wrap', justifyContent:'center', animation:'fadeIn 0.6s ease-out 0.5s both' }}>
          {PIPELINE.map((p,i)=>(
            <React.Fragment key={i}>
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:8 }} className="animate-float" style2={{ animationDelay:`${i*0.3}s` }}>
                <div style={{ width:72, height:72, borderRadius:20, background:p.grad, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'2rem', boxShadow:`0 12px 40px ${p.glow}55`, border:'1px solid rgba(255,255,255,0.15)' }}>
                  {p.icon}
                </div>
                <span style={{ color:'rgba(255,255,255,0.85)', fontWeight:800, fontSize:'0.85rem', letterSpacing:'0.05em', textTransform:'uppercase' }}>{p.label}</span>
              </div>
              {i < PIPELINE.length-1 && <div style={{ color:'rgba(165,180,252,0.5)', fontSize:'1.75rem', fontWeight:300 }}>→</div>}
            </React.Fragment>
          ))}
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding:'80px 24px', background: isDark ? '#080d1a' : '#f4f6ff' }}>
        <div style={{ maxWidth:1100, margin:'0 auto' }}>
          <div style={{ textAlign:'center', marginBottom:48 }}>
            <h2 style={{ fontSize:'2.2rem', fontWeight:900, color: isDark?'#f1f5f9':'#1e1b4b', marginBottom:8 }}>Everything You Need</h2>
            <p style={{ color: isDark?'#64748b':'#6b7280' }}>6 powerful interactive tools in one platform</p>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(320px,100%),1fr))', gap:20 }}>
            {FEATURES.map((f,i)=>(
              <div key={i} style={{ background: isDark ? '#111827' : 'white', border:`1px solid ${isDark?'rgba(99,102,241,0.15)':'rgba(99,102,241,0.1)'}`, borderRadius:20, padding:24, cursor:'pointer', transition:'all 0.25s' }}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 12px 40px ${f.color}25`; e.currentTarget.style.borderColor=f.color+'60'; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow=''; e.currentTarget.style.borderColor=isDark?'rgba(99,102,241,0.15)':'rgba(99,102,241,0.1)'; }}
                onClick={()=>go('/app/dashboard')}>
                <div style={{ width:48, height:48, borderRadius:14, background:f.bg, display:'flex', alignItems:'center', justifyContent:'center', color:f.color, marginBottom:16 }}>{f.icon}</div>
                <div style={{ fontWeight:700, fontSize:'1rem', color: isDark?'#f1f5f9':'#1e1b4b', marginBottom:6 }}>{f.title}</div>
                <div style={{ fontSize:'0.85rem', color: isDark?'#64748b':'#6b7280', lineHeight:1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* STATS BANNER */}
      <section style={{ padding:'60px 24px', background:'linear-gradient(135deg,#4338ca 0%,#6366f1 40%,#8b5cf6 70%,#a855f7 100%)' }}>
        <div style={{ maxWidth:900, margin:'0 auto', display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))', gap:32, textAlign:'center' }}>
          {[['5','Courses'],['272','Students'],['17','Total Credits'],['80%','Theory']].map(([v,l],i)=>(
            <div key={i}>
              <div style={{ fontWeight:900, fontSize:'3rem', color:'white', lineHeight:1 }}>{v}</div>
              <div style={{ color:'rgba(255,255,255,0.75)', fontWeight:500, marginTop:4 }}>{l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding:'80px 24px', textAlign:'center', background: isDark?'#080d1a':'#f4f6ff' }}>
        <h2 style={{ fontSize:'2rem', fontWeight:900, color: isDark?'#f1f5f9':'#1e1b4b', marginBottom:12 }}>Ready to Excel?</h2>
        <p style={{ color: isDark?'#64748b':'#6b7280', marginBottom:32 }}>Start learning XML, XPath and XSLT with hands-on interactive labs</p>
        <button onClick={()=>go('/app/dashboard')} style={{ background:'linear-gradient(135deg,#6366f1,#8b5cf6)', border:'none', color:'white', padding:'16px 48px', borderRadius:16, fontWeight:800, fontSize:'1.05rem', cursor:'pointer', boxShadow:'0 8px 32px rgba(99,102,241,0.35)' }}>
          Get Started — Free ✨
        </button>
      </section>

      {/* FOOTER */}
      <footer style={{ padding:'24px', textAlign:'center', borderTop:`1px solid ${isDark?'rgba(99,102,241,0.1)':'rgba(99,102,241,0.1)'}`, background: isDark?'#040810':'white', color: isDark?'#334155':'#94a3b8', fontSize:'0.82rem' }}>
        Web Technology Unit IV — Representing Web Data · Interactive Learning Platform
      </footer>
    </div>
  );
}
