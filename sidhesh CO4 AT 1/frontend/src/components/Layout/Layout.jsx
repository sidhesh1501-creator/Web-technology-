import React, { useState } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTheme } from '../../contexts/ThemeContext';
import {
  LayoutDashboard, BookOpen, Code2, Search, Zap, BarChart3,
  ClipboardList, Trophy, Info, Menu, X, Sun, Moon, LogOut, ChevronRight
} from 'lucide-react';

const NAV = [
  { path:'/app/dashboard',    label:'Dashboard',       icon:LayoutDashboard, color:'#6366f1' },
  { path:'/app/learn',        label:'Learn',           icon:BookOpen,        color:'#8b5cf6' },
  { path:'/app/xml-explorer', label:'XML Explorer',    icon:Code2,           color:'#0891b2' },
  { path:'/app/xpath',        label:'XPath Playground',icon:Search,          color:'#10b981' },
  { path:'/app/xslt',         label:'XSLT Simulator',  icon:Zap,             color:'#f59e0b' },
  { path:'/app/analytics',    label:'Analytics',       icon:BarChart3,       color:'#ef4444' },
  { path:'/app/assessment',   label:'Assessment',      icon:ClipboardList,   color:'#ec4899' },
  { path:'/app/results',      label:'Results',         icon:Trophy,          color:'#d97706' },
  { path:'/app/about',        label:'About',           icon:Info,            color:'#64748b' },
];

function Sidebar({ mobile, onClose }) {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div style={{
      display:'flex', flexDirection:'column', height:'100%', width: mobile ? 280 : '100%',
      background: isDark ? 'linear-gradient(180deg,#0d111f 0%,#0a0e1a 100%)' : 'linear-gradient(180deg,#ffffff 0%,#f8faff 100%)',
      borderRight: `1px solid ${isDark?'rgba(99,102,241,0.15)':'rgba(99,102,241,0.08)'}`,
    }}>
      {/* Logo */}
      <div style={{ padding:'20px 16px', borderBottom:`1px solid ${isDark?'rgba(99,102,241,0.1)':'#f0f0ff'}`, display:'flex', alignItems:'center', gap:12 }}>
        <div style={{ width:38, height:38, borderRadius:12, background:'linear-gradient(135deg,#6366f1,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:900, fontSize:'0.85rem', boxShadow:'0 4px 16px rgba(99,102,241,0.4)', flexShrink:0 }}>WT</div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontWeight:800, fontSize:'0.9rem', color: isDark?'#f1f5f9':'#1e1b4b' }}>WebTech IV</div>
          <div style={{ fontSize:'0.7rem', color: isDark?'#475569':'#94a3b8' }}>XML · XPath · XSLT</div>
        </div>
        {mobile && <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color: isDark?'#64748b':'#94a3b8', padding:4 }}><X size={18}/></button>}
      </div>

      {/* Nav */}
      <nav style={{ flex:1, padding:'12px 10px', overflowY:'auto', display:'flex', flexDirection:'column', gap:2 }}>
        <div style={{ fontSize:'0.65rem', fontWeight:800, color: isDark?'#334155':'#cbd5e1', textTransform:'uppercase', letterSpacing:'0.1em', padding:'4px 8px', marginBottom:4 }}>Navigation</div>
        {NAV.map(item => {
          const active = location.pathname === item.path;
          const Icon = item.icon;
          return (
            <button key={item.path} onClick={() => { navigate(item.path); if(onClose) onClose(); }}
              style={{
                display:'flex', alignItems:'center', gap:10, padding:'9px 12px', borderRadius:10,
                fontWeight: active ? 700 : 500, fontSize:'0.85rem', cursor:'pointer', border:'none',
                width:'100%', textAlign:'left', transition:'all 0.18s',
                background: active ? `${item.color}15` : 'transparent',
                color: active ? item.color : isDark?'#64748b':'#6b7280',
                boxShadow: active ? `inset 3px 0 0 ${item.color}` : 'none',
              }}
              onMouseEnter={e => { if(!active) { e.currentTarget.style.background=`${item.color}0d`; e.currentTarget.style.color=item.color; }}}
              onMouseLeave={e => { if(!active) { e.currentTarget.style.background='transparent'; e.currentTarget.style.color=isDark?'#64748b':'#6b7280'; }}}>
              <div style={{ width:28, height:28, borderRadius:8, background: active?`${item.color}20`:isDark?'rgba(255,255,255,0.04)':'rgba(0,0,0,0.04)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Icon size={15} style={{ color: active ? item.color : isDark?'#64748b':'#94a3b8' }} />
              </div>
              <span style={{ flex:1 }}>{item.label}</span>
              {active && <ChevronRight size={13} style={{ color:item.color }}/>}
            </button>
          );
        })}
      </nav>

      {/* User */}
      <div style={{ padding:'12px 10px', borderTop:`1px solid ${isDark?'rgba(99,102,241,0.1)':'#f0f0ff'}` }}>
        <div style={{ display:'flex', alignItems:'center', gap:10, padding:'10px 12px', borderRadius:12, background: isDark?'rgba(99,102,241,0.08)':'rgba(99,102,241,0.05)', marginBottom:6 }}>
          <div style={{ width:34, height:34, borderRadius:10, background:'linear-gradient(135deg,#6366f1,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:800, fontSize:'0.85rem', flexShrink:0 }}>
            {user?.displayName?.[0]?.toUpperCase()||'S'}
          </div>
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ fontSize:'0.82rem', fontWeight:700, color: isDark?'#e2e8f0':'#1e1b4b', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user?.displayName||'Student'}</div>
            <div style={{ fontSize:'0.7rem', color: isDark?'#475569':'#94a3b8', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{user?.isDemo?'Demo Mode':user?.email||''}</div>
          </div>
        </div>
        <button onClick={() => { logout(); navigate('/'); }}
          style={{ display:'flex', alignItems:'center', gap:8, padding:'8px 12px', borderRadius:10, background:'rgba(239,68,68,0.08)', border:'1px solid rgba(239,68,68,0.15)', color:'#ef4444', cursor:'pointer', fontWeight:600, fontSize:'0.8rem', width:'100%', transition:'all 0.15s' }}>
          <LogOut size={14}/> Sign Out
        </button>
      </div>
    </div>
  );
}

export default function Layout() {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme, isDark } = useTheme();
  const { user } = useAuth();
  const location = useLocation();
  const active = NAV.find(n => n.path === location.pathname);

  return (
    <div style={{ display:'flex', height:'100vh', overflow:'hidden', background: isDark?'#080d1a':'#f4f6ff' }}>
      {/* Desktop Sidebar */}
      <div style={{ width:260, flexShrink:0, display:'none' }} className="lg-sidebar">
        <div style={{ display:'flex', flexDirection:'column', height:'100%', width:260 }}>
          <Sidebar />
        </div>
      </div>
      <style>{`@media(min-width:1024px){.lg-sidebar{display:flex!important}.hamburger{display:none!important}}`}</style>

      {/* Mobile Overlay */}
      {open && (
        <div style={{ position:'fixed', inset:0, zIndex:999 }}>
          <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.6)', backdropFilter:'blur(4px)' }} onClick={()=>setOpen(false)} />
          <div style={{ position:'absolute', left:0, top:0, bottom:0, zIndex:1000 }}>
            <Sidebar mobile onClose={()=>setOpen(false)} />
          </div>
        </div>
      )}

      {/* Main */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden', minWidth:0 }}>
        {/* Topbar */}
        <header style={{
          height:64, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 20px',
          background: isDark?'rgba(8,12,26,0.95)':'rgba(255,255,255,0.95)', backdropFilter:'blur(20px)',
          borderBottom:`1px solid ${isDark?'rgba(99,102,241,0.15)':'rgba(99,102,241,0.08)'}`,
          boxShadow:'0 2px 12px rgba(99,102,241,0.06)'
        }}>
          <div style={{ display:'flex', alignItems:'center', gap:12 }}>
            <button className="hamburger" onClick={()=>setOpen(true)} style={{ background:'none', border:`1px solid ${isDark?'rgba(99,102,241,0.2)':'#e0e7ff'}`, borderRadius:8, padding:'6px 8px', cursor:'pointer', color: isDark?'#94a3b8':'#6366f1', display:'flex' }}>
              <Menu size={18}/>
            </button>
            <div>
              <div style={{ fontWeight:800, fontSize:'0.95rem', color: isDark?'#f1f5f9':'#1e1b4b', display:'flex', alignItems:'center', gap:6 }}>
                {active && <span style={{ color:active.color }}>{React.createElement(active.icon,{size:16})}</span>}
                {active?.label||'WebTech Unit IV'}
              </div>
              <div style={{ fontSize:'0.72rem', color: isDark?'#475569':'#94a3b8' }}>Web Technology — Representing Web Data</div>
            </div>
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <button onClick={toggleTheme} style={{ background: isDark?'rgba(250,204,21,0.1)':'rgba(99,102,241,0.08)', border:`1px solid ${isDark?'rgba(250,204,21,0.2)':'rgba(99,102,241,0.15)'}`, borderRadius:10, padding:'7px 12px', cursor:'pointer', display:'flex', alignItems:'center', gap:6, fontSize:'0.8rem', color: isDark?'#fbbf24':'#6366f1', fontWeight:600 }}>
              {isDark?<><Sun size={14}/>Light</>:<><Moon size={14}/>Dark</>}
            </button>
            <div style={{ width:34, height:34, borderRadius:10, background:'linear-gradient(135deg,#6366f1,#8b5cf6)', display:'flex', alignItems:'center', justifyContent:'center', color:'white', fontWeight:800, fontSize:'0.85rem', boxShadow:'0 4px 12px rgba(99,102,241,0.3)' }}>
              {user?.displayName?.[0]?.toUpperCase()||'S'}
            </div>
          </div>
        </header>

        {/* Content */}
        <main style={{ flex:1, overflowY:'auto' }}>
          <div className="page-enter">
            <Outlet/>
          </div>
        </main>
      </div>
    </div>
  );
}
