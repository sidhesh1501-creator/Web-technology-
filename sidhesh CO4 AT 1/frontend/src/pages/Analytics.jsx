import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { getCourses } from '../utils/xmlParser';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';

const COLORS = ['#6366f1', '#7c3aed', '#0891b2', '#059669', '#d97706'];
const TYPE_COLORS = { Theory: '#6366f1', Practical: '#059669' };

export default function Analytics() {
  const { isDark } = useTheme();
  const courses = getCourses();

  const enrollmentData = courses.map(c => ({ name: c.code, students: c.students, fullName: c.name }));
  const creditData = courses.map(c => ({ name: c.code, credits: c.credits }));
  const typeData = Object.entries(
    courses.reduce((acc, c) => { acc[c.type] = (acc[c.type] || 0) + 1; return acc; }, {})
  ).map(([name, value]) => ({ name, value }));

  const bg = isDark ? '#1a2744' : 'white';
  const border = isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)';
  const textColor = isDark ? '#94a3b8' : '#64748b';
  const gridColor = isDark ? 'rgba(99,102,241,0.1)' : '#f0f0ff';

  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload?.length) return null;
    return (
      <div style={{ background: isDark ? '#0f1729' : 'white', border: `1px solid ${isDark ? 'rgba(99,102,241,0.3)' : '#e0e7ff'}`, borderRadius: '10px', padding: '10px 14px', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
        <p style={{ fontWeight: 600, color: isDark ? '#e2e8f0' : '#1e1b4b', marginBottom: '4px' }}>{label}</p>
        {payload.map(p => (
          <p key={p.name} style={{ color: p.color, fontSize: '0.85rem' }}>{p.name}: <strong>{p.value}</strong></p>
        ))}
      </div>
    );
  };

  return (
    <div style={{ padding: '32px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="mb-6">
        <h1 className="font-bold text-2xl mb-1" style={{ color: isDark ? '#e2e8f0' : '#1e1b4b' }}>📊 Course Enrollment Analytics</h1>
        <p style={{ color: isDark ? '#64748b' : '#94a3b8' }}>Visual insights derived dynamically from the XML dataset</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Enrollment Bar Chart */}
        <div className="rounded-2xl p-5" style={{ background: bg, border: `1px solid ${border}`, boxShadow: '0 4px 24px rgba(99,102,241,0.08)', gridColumn: '1/-1' }}>
          <h3 className="font-bold mb-4" style={{ color: isDark ? '#e2e8f0' : '#1e1b4b' }}>Enrollment by Course</h3>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={enrollmentData} margin={{ top: 0, right: 16, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
              <XAxis dataKey="name" tick={{ fill: textColor, fontSize: 12 }} />
              <YAxis tick={{ fill: textColor, fontSize: 12 }} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="students" radius={[6, 6, 0, 0]} label={{ position: 'top', fill: textColor, fontSize: 11 }}>
                {enrollmentData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Credit Pie Chart */}
        <div className="rounded-2xl p-5" style={{ background: bg, border: `1px solid ${border}`, boxShadow: '0 4px 24px rgba(99,102,241,0.08)' }}>
          <h3 className="font-bold mb-4" style={{ color: isDark ? '#e2e8f0' : '#1e1b4b' }}>Credit Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={creditData} dataKey="credits" nameKey="name" cx="50%" cy="50%" outerRadius={80} label={({ name, credits }) => `${name}:${credits}`}>
                {creditData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Type Pie Chart */}
        <div className="rounded-2xl p-5" style={{ background: bg, border: `1px solid ${border}`, boxShadow: '0 4px 24px rgba(99,102,241,0.08)' }}>
          <h3 className="font-bold mb-4" style={{ color: isDark ? '#e2e8f0' : '#1e1b4b' }}>Course Type Distribution</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={typeData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}
                label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(0)}%)`}>
                {typeData.map((t, i) => <Cell key={i} fill={TYPE_COLORS[t.name] || COLORS[i]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Horizontal Bar — Ranking */}
        <div className="rounded-2xl p-5" style={{ background: bg, border: `1px solid ${border}`, boxShadow: '0 4px 24px rgba(99,102,241,0.08)', gridColumn: '1/-1' }}>
          <h3 className="font-bold mb-4" style={{ color: isDark ? '#e2e8f0' : '#1e1b4b' }}>Student Enrollment Ranking</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[...courses].sort((a, b) => b.students - a.students).map((c, i) => (
              <div key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={{ minWidth: '24px', fontWeight: 700, color: COLORS[i], fontSize: '0.9rem' }}>#{i + 1}</span>
                <span style={{ minWidth: '180px', fontSize: '0.85rem', fontWeight: 500, color: isDark ? '#e2e8f0' : '#1e1b4b' }}>{c.name}</span>
                <div style={{ flex: 1, background: isDark ? '#0f1729' : '#f0f0ff', borderRadius: '9999px', height: '10px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', borderRadius: '9999px', width: `${(c.students / 72) * 100}%`,
                    background: COLORS[i], transition: 'width 1s ease'
                  }} />
                </div>
                <span style={{ minWidth: '36px', textAlign: 'right', fontWeight: 700, color: COLORS[i] }}>{c.students}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
