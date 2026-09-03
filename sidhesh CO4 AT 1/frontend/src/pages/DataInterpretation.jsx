import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { getCourses } from '../utils/xmlParser';
import { ChevronDown, ChevronUp } from 'lucide-react';

function InsightCard({ title, emoji, children, color }) {
  const { isDark } = useTheme();
  return (
    <div className="rounded-2xl p-5 card-hover" style={{
      background: isDark ? '#1a2744' : 'white',
      border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'}`,
      boxShadow: '0 4px 24px rgba(99,102,241,0.08)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
        <span style={{ fontSize: '1.5rem' }}>{emoji}</span>
        <h3 style={{ fontWeight: 700, color: color || (isDark ? '#e2e8f0' : '#1e1b4b') }}>{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function Analytics() {
  const { isDark } = useTheme();
  const courses = getCourses();

  const highest = courses.reduce((a, b) => a.students > b.students ? a : b);
  const lowest = courses.reduce((a, b) => a.students < b.students ? a : b);
  const theoryCourses = courses.filter(c => c.type === 'Theory');
  const fourCredits = courses.filter(c => c.credits === 4);
  const highEnrollment = courses.filter(c => c.students > 60).sort((a, b) => b.students - a.students);
  const avg = Math.round(courses.reduce((s, c) => s + c.students, 0) / courses.length);

  return (
    <div style={{ padding: '32px 24px', maxWidth: '1100px', margin: '0 auto' }}>
      <div className="mb-6">
        <h1 className="font-bold text-2xl mb-1" style={{ color: isDark ? '#e2e8f0' : '#1e1b4b' }}>🔎 Data Interpretation</h1>
        <p style={{ color: isDark ? '#64748b' : '#94a3b8' }}>What does the XML data tell us? Auto-calculated insights from the dataset</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        <InsightCard title="Highest Enrollment" emoji="🥇" color="#d97706">
          <div style={{ fontWeight: 800, fontSize: '1.5rem', color: '#d97706' }}>{highest.name}</div>
          <div style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.9rem' }}>{highest.students} students · {highest.code}</div>
        </InsightCard>

        <InsightCard title="Lowest Enrollment" emoji="📉" color="#6366f1">
          <div style={{ fontWeight: 800, fontSize: '1.5rem', color: '#6366f1' }}>{lowest.name}</div>
          <div style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.9rem' }}>{lowest.students} students · {lowest.code}</div>
        </InsightCard>

        <InsightCard title="Average Enrollment" emoji="📊">
          <div style={{ fontWeight: 800, fontSize: '2.5rem', color: '#0891b2' }}>{avg}</div>
          <div style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.9rem' }}>students per course</div>
        </InsightCard>

        <InsightCard title="Theory Courses" emoji="📚" color="#7c3aed">
          <div style={{ fontWeight: 800, fontSize: '2.5rem', color: '#7c3aed' }}>{theoryCourses.length}</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '8px' }}>
            {theoryCourses.map(c => (
              <div key={c.id} style={{ fontSize: '0.8rem', color: isDark ? '#94a3b8' : '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span style={{ color: '#7c3aed' }}>•</span> {c.name}
              </div>
            ))}
          </div>
        </InsightCard>

        <InsightCard title="Courses with 4 Credits" emoji="💎">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {fourCredits.map(c => (
              <div key={c.id} style={{
                padding: '8px 12px', borderRadius: '8px',
                background: isDark ? 'rgba(99,102,241,0.1)' : '#f0f0ff',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 500, color: isDark ? '#e2e8f0' : '#1e1b4b' }}>{c.name}</span>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#6366f1' }}>4 credits</span>
              </div>
            ))}
          </div>
        </InsightCard>

        <InsightCard title="Needs Extra Support" emoji="🆘" color="#dc2626">
          <div style={{ color: isDark ? '#94a3b8' : '#64748b', fontSize: '0.8rem', marginBottom: '10px' }}>Courses with &gt;60 students</div>
          {highEnrollment.length === 0
            ? <div style={{ color: isDark ? '#64748b' : '#94a3b8', fontSize: '0.85rem' }}>No courses exceed 60 students</div>
            : highEnrollment.map(c => (
              <div key={c.id} style={{
                padding: '10px 14px', borderRadius: '10px', marginBottom: '8px',
                background: '#fee2e2', border: '1px solid #fecaca',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                <div>
                  <div style={{ fontWeight: 600, color: '#dc2626', fontSize: '0.9rem' }}>{c.name}</div>
                  <div style={{ color: '#ef4444', fontSize: '0.75rem' }}>{c.faculty}</div>
                </div>
                <div style={{ fontWeight: 800, color: '#dc2626', fontSize: '1.25rem' }}>{c.students}</div>
              </div>
            ))
          }
        </InsightCard>
      </div>

      {/* Summary Table */}
      <div className="mt-8 rounded-2xl overflow-hidden" style={{
        background: isDark ? '#1a2744' : 'white',
        border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'}`,
      }}>
        <div className="px-6 py-4" style={{ borderBottom: `1px solid ${isDark ? 'rgba(99,102,241,0.1)' : '#f0f0ff'}` }}>
          <h2 className="font-bold" style={{ color: isDark ? '#e2e8f0' : '#1e1b4b' }}>Complete Interpretation Summary</h2>
        </div>
        <div className="table-responsive">
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem' }}>
            <thead>
              <tr style={{ background: isDark ? 'rgba(99,102,241,0.08)' : '#f8faff' }}>
                {['Metric', 'Value', 'Details'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 600, color: isDark ? '#94a3b8' : '#64748b' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { metric: 'Total Courses', value: courses.length, detail: 'Loaded from XML dataset' },
                { metric: 'Total Students', value: courses.reduce((s, c) => s + c.students, 0), detail: 'Sum of all <students> elements' },
                { metric: 'Average Enrollment', value: avg, detail: 'Total ÷ number of courses' },
                { metric: 'Highest Enrollment', value: `${highest.name} (${highest.students})`, detail: `XPath: /courses/course[students=max...]` },
                { metric: 'Lowest Enrollment', value: `${lowest.name} (${lowest.students})`, detail: `XPath: /courses/course[students=min...]` },
                { metric: 'Theory Courses', value: theoryCourses.length, detail: `XPath: /courses/course[type='Theory']` },
                { metric: 'Practical Courses', value: courses.filter(c => c.type === 'Practical').length, detail: `XPath: /courses/course[type='Practical']` },
                { metric: 'Courses > 60 Students', value: highEnrollment.length, detail: `XPath: /courses/course[students > 60]` },
                { metric: 'Total Credits', value: courses.reduce((s, c) => s + c.credits, 0), detail: 'Sum of all <credits> elements' },
              ].map((row, i) => (
                <tr key={i} style={{ borderTop: `1px solid ${isDark ? 'rgba(99,102,241,0.06)' : '#f0f0ff'}` }}>
                  <td style={{ padding: '12px 16px', fontWeight: 500, color: isDark ? '#e2e8f0' : '#1e1b4b' }}>{row.metric}</td>
                  <td style={{ padding: '12px 16px', fontWeight: 700, color: '#6366f1', fontVariantNumeric: 'tabular-nums' }}>{row.value}</td>
                  <td style={{ padding: '12px 16px', color: isDark ? '#64748b' : '#94a3b8', fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem' }}>{row.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
