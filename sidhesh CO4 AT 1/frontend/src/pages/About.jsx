import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';

export default function About() {
  const { isDark } = useTheme();
  const navigate = useNavigate();
  const bg = isDark ? '#1a2744' : 'white';
  const border = isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)';

  return (
    <div style={{ padding: '32px 24px', maxWidth: '900px', margin: '0 auto' }}>
      <div className="mb-6">
        <h1 className="font-bold text-2xl mb-1" style={{ color: isDark ? '#e2e8f0' : '#1e1b4b' }}>ℹ️ About This Platform</h1>
        <p style={{ color: isDark ? '#64748b' : '#94a3b8' }}>Web Technology — Unit IV Interactive Learning & Assessment Platform</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="rounded-2xl p-6" style={{ background: 'linear-gradient(135deg, #4338ca, #6366f1, #8b5cf6)', color: 'white' }}>
          <h2 style={{ fontWeight: 800, fontSize: '1.5rem', marginBottom: '8px' }}>Web Technology — Unit IV</h2>
          <p style={{ opacity: 0.85, lineHeight: 1.7 }}>
            This platform is an interactive learning and assessment application designed for the Web Technology course,
            Unit IV: Representing Web Data / Data Interpretation. It covers XML structure, XPath querying,
            XSLT transformation, and data interpretation through hands-on labs.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          {[
            { title: 'XML Explorer', desc: 'Syntax-highlighted XML viewer with interactive element guide and structure analyzer.', icon: '📄' },
            { title: 'XPath Playground', desc: 'Live XPath query engine using native browser document.evaluate() — real results, not pre-written.', icon: '🔍' },
            { title: 'XSLT Simulator', desc: 'Full in-browser XSLT transformation using XSLTProcessor API. Edit, run, download.', icon: '⚡' },
            { title: 'Analytics', desc: 'Interactive Recharts visualizations computed dynamically from the XML dataset.', icon: '📊' },
            { title: 'Assessment', desc: '20 questions across 4 parts, 30 marks total, with 60-minute timer and instant evaluation.', icon: '📝' },
            { title: 'Learning Modules', desc: '4 structured modules with topic navigation, content, and mini quizzes.', icon: '📚' },
          ].map(f => (
            <div key={f.title} className="rounded-2xl p-5 card-hover" style={{ background: bg, border: `1px solid ${border}` }}>
              <div style={{ fontSize: '1.75rem', marginBottom: '8px' }}>{f.icon}</div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: isDark ? '#e2e8f0' : '#1e1b4b', marginBottom: '4px' }}>{f.title}</div>
              <div style={{ fontSize: '0.8rem', color: isDark ? '#64748b' : '#94a3b8', lineHeight: 1.6 }}>{f.desc}</div>
            </div>
          ))}
        </div>

        <div className="rounded-2xl p-5" style={{ background: bg, border: `1px solid ${border}` }}>
          <h3 style={{ fontWeight: 700, marginBottom: '12px', color: isDark ? '#e2e8f0' : '#1e1b4b' }}>🛠️ Technology Stack</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '10px' }}>
            {[
              ['⚛️', 'React.js', 'Frontend UI'],
              ['⚡', 'Vite', 'Build tool'],
              ['🎨', 'Tailwind CSS', 'Styling'],
              ['📊', 'Recharts', 'Charts'],
              ['🔄', 'React Router', 'Navigation'],
              ['📄', 'DOMParser', 'XML Parsing'],
              ['🔍', 'XPath API', 'XPath Engine'],
              ['⚡', 'XSLTProcessor', 'XSLT Engine'],
              ['💾', 'LocalStorage', 'Persistence'],
              ['🌐', 'Node.js', 'Backend'],
            ].map(([icon, name, role]) => (
              <div key={name} style={{ padding: '10px', borderRadius: '10px', background: isDark ? 'rgba(99,102,241,0.08)' : '#f8faff', border: `1px solid ${isDark ? 'rgba(99,102,241,0.1)' : '#e0e7ff'}` }}>
                <div style={{ fontSize: '1.25rem' }}>{icon}</div>
                <div style={{ fontWeight: 600, fontSize: '0.85rem', color: '#6366f1' }}>{name}</div>
                <div style={{ fontSize: '0.72rem', color: isDark ? '#64748b' : '#94a3b8' }}>{role}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl p-5" style={{ background: bg, border: `1px solid ${border}` }}>
          <h3 style={{ fontWeight: 700, marginBottom: '8px', color: isDark ? '#e2e8f0' : '#1e1b4b' }}>📋 Dataset Summary</h3>
          <p style={{ fontSize: '0.875rem', color: isDark ? '#94a3b8' : '#64748b', lineHeight: 1.7 }}>
            5 courses · 272 total students · 17 total credits · 4 theory + 1 practical<br />
            Courses: Web Technology, Artificial Intelligence, Web Technology Lab, Machine Learning, Database Systems
          </p>
        </div>
      </div>
    </div>
  );
}
