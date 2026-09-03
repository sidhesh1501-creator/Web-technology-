import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import { Mail, User, ArrowRight, BookOpen } from 'lucide-react';

export default function Login() {
  const { loginDemo, loginWithEmail } = useAuth();
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleDemo = () => { loginDemo(); navigate('/app/dashboard'); };
  const handleLogin = (e) => {
    e.preventDefault();
    if (email) { loginWithEmail(email, name); navigate('/app/dashboard'); }
  };

  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'linear-gradient(135deg, #0f0c29 0%, #1e1b4b 40%, #3730a3 100%)',
      padding: '24px', fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        background: isDark ? 'rgba(15,23,41,0.9)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(20px)', borderRadius: '24px', padding: '48px 40px',
        width: '100%', maxWidth: '420px',
        border: '1px solid rgba(99,102,241,0.2)',
        boxShadow: '0 24px 80px rgba(0,0,0,0.3)'
      }}>
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl mx-auto mb-4"
            style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>WT</div>
          <h1 className="font-bold text-2xl mb-1" style={{ color: isDark ? '#e2e8f0' : '#1e1b4b' }}>Welcome Back</h1>
          <p style={{ color: isDark ? '#64748b' : '#94a3b8', fontSize: '0.9rem' }}>Web Technology Unit IV Platform</p>
        </div>

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: isDark ? '#94a3b8' : '#64748b', display: 'block', marginBottom: '6px' }}>Name (optional)</label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input value={name} onChange={e => setName(e.target.value)} placeholder="Your name"
                style={{
                  width: '100%', padding: '10px 12px 10px 36px', borderRadius: '10px', fontSize: '0.9rem',
                  border: `1.5px solid ${isDark ? 'rgba(99,102,241,0.3)' : '#e0e7ff'}`,
                  background: isDark ? 'rgba(99,102,241,0.05)' : 'white',
                  color: isDark ? '#e2e8f0' : '#1e1b4b', outline: 'none'
                }} />
            </div>
          </div>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 600, color: isDark ? '#94a3b8' : '#64748b', display: 'block', marginBottom: '6px' }}>Email</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="student@college.edu"
                style={{
                  width: '100%', padding: '10px 12px 10px 36px', borderRadius: '10px', fontSize: '0.9rem',
                  border: `1.5px solid ${isDark ? 'rgba(99,102,241,0.3)' : '#e0e7ff'}`,
                  background: isDark ? 'rgba(99,102,241,0.05)' : 'white',
                  color: isDark ? '#e2e8f0' : '#1e1b4b', outline: 'none'
                }} />
            </div>
          </div>
          <button type="submit" className="btn-primary w-full justify-center py-3">
            <ArrowRight size={18} /> Sign In
          </button>
        </form>

        <div style={{ textAlign: 'center', marginBottom: '16px', color: isDark ? '#475569' : '#94a3b8', fontSize: '0.8rem' }}>or</div>

        <button onClick={handleDemo} className="btn-secondary w-full justify-center py-3">
          <BookOpen size={18} /> Continue as Demo Student
        </button>

        <p style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.75rem', color: isDark ? '#475569' : '#94a3b8' }}>
          No account needed — demo mode works fully offline
        </p>
      </div>
    </div>
  );
}
