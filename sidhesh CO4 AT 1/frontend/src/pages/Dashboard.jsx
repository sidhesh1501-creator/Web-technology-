import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import { getCourses, getStats } from '../utils/xmlParser';
import { ArrowRight, Users, CreditCard, BookOpen, Layers, GraduationCap } from 'lucide-react';

const STAT_COLORS = [
  { color:'#6366f1', light:'#eef2ff', glow:'rgba(99,102,241,0.3)' },
  { color:'#8b5cf6', light:'#f5f3ff', glow:'rgba(139,92,246,0.3)' },
  { color:'#0891b2', light:'#ecfeff', glow:'rgba(8,145,178,0.3)' },
  { color:'#10b981', light:'#f0fdf4', glow:'rgba(16,185,129,0.3)' },
  { color:'#f59e0b', light:'#fffbeb', glow:'rgba(245,158,11,0.3)' },
];

const PROGRESS_MODULES = [
  { id:'xml-structure', label:'XML Structure', icon:'📄', color:'#6366f1', path:'/app/learn' },
  { id:'xpath',         label:'XPath Queries', icon:'🔍', color:'#8b5cf6', path:'/app/xpath' },
  { id:'xslt',          label:'XSLT Transform',icon:'⚡', color:'#0891b2', path:'/app/xslt' },
  { id:'data-interpretation', label:'Data Insights', icon:'📊', color:'#10b981', path:'/app/analytics' },
];

function CountUp({ end, duration=1200 }) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    let start = 0; const step = end / (duration / 16);
    const t = setInterval(() => {
      start += step;
      if(start >= end) { setVal(end); clearInterval(t); }
      else setVal(Math.floor(start));
    }, 16);
    return () => clearInterval(t);
  }, [end]);
  return val;
}

export default function Dashboard() {
  const { user } = useAuth();
  const { isDark } = useTheme();
  const { progress } = useProgress();
  const navigate = useNavigate();
  const stats = getStats();
  const courses = getCourses();

  const statItems = [
    { label:'Total Courses',   value:stats.totalCourses,   icon:<Layers size={20}/>,       ...STAT_COLORS[0] },
    { label:'Total Students',  value:stats.totalStudents,  icon:<Users size={20}/>,        ...STAT_COLORS[1] },
    { label:'Total Credits',   value:stats.totalCredits,   icon:<CreditCard size={20}/>,   ...STAT_COLORS[2] },
    { label:'Theory Courses',  value:stats.theoryCount,    icon:<BookOpen size={20}/>,     ...STAT_COLORS[3] },
    { label:'Practical',       value:stats.practicalCount, icon:<GraduationCap size={20}/>, ...STAT_COLORS[4] },
  ];

  const card = { background: isDark?'#111827':'white', border:`1px solid ${isDark?'rgba(99,102,241,0.15)':'rgba(99,102,241,0.08)'}`, borderRadius:20, boxShadow:'0 4px 20px rgba(99,102,241,0.07)' };

  return (
    <div style={{ padding:'28px 24px', maxWidth:1280, margin:'0 auto' }}>
      {/* Welcome Banner */}
      <div style={{ borderRadius:24, padding:'28px 32px', marginBottom:28, background:'linear-gradient(135deg,#4338ca 0%,#6366f1 40%,#8b5cf6 70%,#a855f7 100%)', boxShadow:'0 12px 48px rgba(99,102,241,0.35)', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-40, right:-40, width:200, height:200, borderRadius:'50%', background:'rgba(255,255,255,0.08)', pointerEvents:'none' }}/>
        <div style={{ position:'absolute', bottom:-60, right:80, width:150, height:150, borderRadius:'50%', background:'rgba(255,255,255,0.05)', pointerEvents:'none' }}/>
        <h1 style={{ color:'white', fontWeight:900, fontSize:'1.75rem', marginBottom:4 }}>
          Welcome back 👋
        </h1>
        <p style={{ color:'rgba(255,255,255,0.78)', fontSize:'0.9rem' }}>
          Continue your Web Technology Unit IV journey — XML, XPath & XSLT await.
        </p>
      </div>

      {/* Stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(180px,100%),1fr))', gap:16, marginBottom:28 }}>
        {statItems.map((s,i) => (
          <div key={i} style={{ ...card, padding:20, transition:'all 0.25s' }}
            onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow=`0 12px 40px ${s.glow}`; }}
            onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.boxShadow='0 4px 20px rgba(99,102,241,0.07)'; }}>
            <div style={{ width:44, height:44, borderRadius:14, background:`${s.color}15`, display:'flex', alignItems:'center', justifyContent:'center', color:s.color, marginBottom:14 }}>{s.icon}</div>
            <div style={{ fontSize:'2.2rem', fontWeight:900, color:s.color, lineHeight:1, marginBottom:4 }}><CountUp end={s.value}/></div>
            <div style={{ fontSize:'0.78rem', color: isDark?'#64748b':'#6b7280', fontWeight:500 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Progress */}
      <div style={{ marginBottom:28 }}>
        <h2 style={{ fontWeight:800, fontSize:'1.1rem', color: isDark?'#f1f5f9':'#1e1b4b', marginBottom:14 }}>Your Learning Progress</h2>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(min(220px,100%),1fr))', gap:14 }}>
          {PROGRESS_MODULES.map((m) => {
            const mod = progress[m.id] || { completed:0, total:1, percentage:0 };
            return (
              <div key={m.id} style={{ ...card, padding:20, cursor:'pointer', transition:'all 0.25s' }}
                onClick={() => navigate(m.path)}
                onMouseEnter={e=>{ e.currentTarget.style.transform='translateY(-3px)'; e.currentTarget.style.borderColor=m.color+'60'; }}
                onMouseLeave={e=>{ e.currentTarget.style.transform=''; e.currentTarget.style.borderColor=isDark?'rgba(99,102,241,0.15)':'rgba(99,102,241,0.08)'; }}>
                <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:14 }}>
                  <div style={{ width:40, height:40, borderRadius:12, background:`${m.color}15`, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem' }}>{m.icon}</div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontWeight:700, fontSize:'0.88rem', color: isDark?'#e2e8f0':'#1e1b4b' }}>{m.label}</div>
                    <div style={{ fontSize:'0.73rem', color: isDark?'#475569':'#94a3b8' }}>{mod.completed}/{mod.total} topics</div>
                  </div>
                  <div style={{ fontWeight:800, fontSize:'0.9rem', color:m.color }}>{mod.percentage}%</div>
                </div>
                <div style={{ height:6, borderRadius:99, background: isDark?'rgba(99,102,241,0.1)':'#e0e7ff', overflow:'hidden' }}>
                  <div style={{ height:'100%', borderRadius:99, width:`${mod.percentage}%`, background:`linear-gradient(90deg,${m.color},${m.color}cc)`, transition:'width 1s ease' }}/>
                </div>
                <div style={{ marginTop:12, display:'flex', alignItems:'center', gap:4, color:m.color, fontSize:'0.78rem', fontWeight:700, cursor:'pointer', background:'none', border:'none' }}>
                  Continue <ArrowRight size={12}/>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Table */}
      <div style={{ ...card, overflow:'hidden' }}>
        <div style={{ padding:'16px 20px', borderBottom:`1px solid ${isDark?'rgba(99,102,241,0.1)':'#f0f0ff'}`, display:'flex', alignItems:'center', justifyContent:'space-between', background: isDark?'rgba(99,102,241,0.05)':'linear-gradient(to right,#f8faff,white)' }}>
          <h2 style={{ fontWeight:800, fontSize:'0.95rem', color: isDark?'#f1f5f9':'#1e1b4b' }}>📊 Course Dataset — XML Source</h2>
          <span style={{ background:'#ede9fe', color:'#6d28d9', padding:'3px 10px', borderRadius:99, fontSize:'0.72rem', fontWeight:700 }}>5 records</span>
        </div>
        <div style={{ overflowX:'auto' }}>
          <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.85rem' }}>
            <thead>
              <tr style={{ background: isDark?'rgba(99,102,241,0.06)':'#f8faff' }}>
                {['ID','Code','Course Name','Faculty','Students','Credits','Type'].map(h=>(
                  <th key={h} style={{ padding:'11px 16px', textAlign:'left', fontWeight:700, fontSize:'0.72rem', textTransform:'uppercase', letterSpacing:'0.06em', color: isDark?'#64748b':'#94a3b8', whiteSpace:'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {courses.map((c,i) => (
                <tr key={c.id} style={{ transition:'background 0.15s' }}
                  onMouseEnter={e=>e.currentTarget.style.background=isDark?'rgba(99,102,241,0.06)':'#f8faff'}
                  onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                  <td style={{ padding:'13px 16px', borderTop:`1px solid ${isDark?'rgba(99,102,241,0.07)':'#f0f0ff'}`, fontWeight:800, color:STAT_COLORS[i%5].color, fontFamily:'JetBrains Mono,monospace', fontSize:'0.82rem' }}>{c.id}</td>
                  <td style={{ padding:'13px 16px', borderTop:`1px solid ${isDark?'rgba(99,102,241,0.07)':'#f0f0ff'}`, fontFamily:'JetBrains Mono,monospace', fontSize:'0.8rem', color: isDark?'#a5b4fc':'#4f46e5', fontWeight:600 }}>{c.code}</td>
                  <td style={{ padding:'13px 16px', borderTop:`1px solid ${isDark?'rgba(99,102,241,0.07)':'#f0f0ff'}`, fontWeight:600, color: isDark?'#e2e8f0':'#1e1b4b' }}>{c.name}</td>
                  <td style={{ padding:'13px 16px', borderTop:`1px solid ${isDark?'rgba(99,102,241,0.07)':'#f0f0ff'}`, color: isDark?'#94a3b8':'#6b7280' }}>{c.faculty}</td>
                  <td style={{ padding:'13px 16px', borderTop:`1px solid ${isDark?'rgba(99,102,241,0.07)':'#f0f0ff'}`, fontWeight:700, color: isDark?'#e2e8f0':'#1e1b4b' }}>{c.students}</td>
                  <td style={{ padding:'13px 16px', borderTop:`1px solid ${isDark?'rgba(99,102,241,0.07)':'#f0f0ff'}`, color: isDark?'#94a3b8':'#6b7280' }}>{c.credits}</td>
                  <td style={{ padding:'13px 16px', borderTop:`1px solid ${isDark?'rgba(99,102,241,0.07)':'#f0f0ff'}` }}>
                    <span style={{ background:c.type==='Theory'?isDark?'rgba(109,40,217,0.25)':'#ede9fe':isDark?'rgba(6,95,70,0.25)':'#d1fae5', color:c.type==='Theory'?isDark?'#c4b5fd':'#6d28d9':isDark?'#6ee7b7':'#065f46', padding:'3px 10px', borderRadius:99, fontSize:'0.72rem', fontWeight:700 }}>{c.type}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
