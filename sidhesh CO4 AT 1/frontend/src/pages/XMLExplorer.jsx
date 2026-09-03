import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { XML_STRING } from '../utils/xmlParser';
import { Copy, RotateCcw, ChevronRight, ChevronDown, Search, CheckCircle } from 'lucide-react';

const XML_EXPLANATIONS = {
  courses: { label: 'Root Element', desc: 'The outermost element containing all course records', color: '#6366f1' },
  course: { label: 'Repeating Record', desc: 'Each <course> represents one course entry', color: '#7c3aed' },
  id: { label: 'Unique Attribute', desc: 'Uniquely identifies each course (C101–C105)', color: '#0891b2' },
  code: { label: 'Course Code', desc: 'Alphanumeric course identifier', color: '#059669' },
  name: { label: 'Course Name', desc: 'Full descriptive name of the course', color: '#d97706' },
  faculty: { label: 'Faculty Name', desc: 'Name of the instructor handling the course', color: '#7c3aed' },
  students: { label: 'Numeric Data', desc: 'Number of students enrolled — numeric information', color: '#dc2626' },
  credits: { label: 'Numeric Data', desc: 'Credit hours assigned to the course', color: '#dc2626' },
  type: { label: 'Course Type', desc: 'Theory or Practical classification', color: '#059669' },
};

function syntaxHighlight(xml) {
  return xml
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/&lt;\?[^?]*\?&gt;/g, m => `<span style="color:#7c3aed;font-style:italic">${m}</span>`)
    .replace(/&lt;\/([a-zA-Z0-9_:]+)&gt;/g, (_, t) => `<span style="color:#6366f1">&lt;/</span><span style="color:#4f46e5;font-weight:600">${t}</span><span style="color:#6366f1">&gt;</span>`)
    .replace(/&lt;([a-zA-Z0-9_:]+)((?:\s+[^&]*)*)&gt;/g, (_, tag, attrs) => {
      const attrStr = attrs.replace(/([a-zA-Z0-9_-]+)="([^"]*)"/g,
        (__, k, v) => ` <span style="color:#0891b2">${k}</span>=<span style="color:#059669">"${v}"</span>`);
      return `<span style="color:#6366f1">&lt;</span><span style="color:#4f46e5;font-weight:600">${tag}</span>${attrStr}<span style="color:#6366f1">&gt;</span>`;
    })
    .replace(/([^<>]+)(?=&lt;\/)/g, m => m.trim() ? `<span style="color:#374151">${m}</span>` : m);
}

export default function XMLExplorer() {
  const { isDark } = useTheme();
  const [search, setSearch] = useState('');
  const [highlighted, setHighlighted] = useState(null);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(XML_STRING);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const xmlLines = XML_STRING.split('\n');
  const filteredXml = search
    ? XML_STRING.split('\n').filter(l => l.toLowerCase().includes(search.toLowerCase())).join('\n')
    : XML_STRING;

  return (
    <div style={{ padding: '32px 24px', maxWidth: '1200px', margin: '0 auto' }}>
      <div className="mb-6">
        <h1 className="font-bold text-2xl mb-1" style={{ color: isDark ? '#e2e8f0' : '#1e1b4b' }}>XML Explorer</h1>
        <p style={{ color: isDark ? '#64748b' : '#94a3b8' }}>Explore and understand the course XML structure interactively</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: '24px' }}>
        {/* XML Viewer */}
        <div className="rounded-2xl overflow-hidden" style={{
          background: isDark ? '#1a2744' : 'white',
          border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'}`,
          boxShadow: '0 4px 24px rgba(99,102,241,0.08)'
        }}>
          {/* Toolbar */}
          <div className="flex items-center gap-3 px-4 py-3" style={{ borderBottom: `1px solid ${isDark ? 'rgba(99,102,241,0.1)' : '#f0f0ff'}` }}>
            <div style={{ position: 'relative', flex: 1 }}>
              <Search size={14} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search XML..."
                style={{
                  width: '100%', padding: '7px 10px 7px 30px', borderRadius: '8px', fontSize: '0.8rem',
                  border: `1px solid ${isDark ? 'rgba(99,102,241,0.2)' : '#e0e7ff'}`,
                  background: isDark ? 'rgba(99,102,241,0.05)' : '#f8faff',
                  color: isDark ? '#e2e8f0' : '#1e1b4b', outline: 'none'
                }} />
            </div>
            <button onClick={handleCopy} className="btn-ghost text-xs flex items-center gap-1 px-3 py-2">
              {copied ? <CheckCircle size={14} style={{ color: '#059669' }} /> : <Copy size={14} />}
              {copied ? 'Copied!' : 'Copy'}
            </button>
            <button onClick={() => setSearch('')} className="btn-ghost text-xs px-3 py-2">
              <RotateCcw size={14} /> Reset
            </button>
          </div>

          {/* XML Content */}
          <div style={{ padding: '16px', overflowX: 'auto' }}>
            <pre className="code-editor" style={{
              margin: 0, lineHeight: 1.8,
              background: isDark ? '#0f1729' : '#f8faff',
              borderRadius: '12px', padding: '20px',
              fontSize: '0.82rem', overflowX: 'auto'
            }}>
              {(search ? filteredXml : XML_STRING).split('\n').map((line, i) => (
                <div key={i}
                  style={{
                    display: 'flex', borderRadius: '4px',
                    background: highlighted && line.includes(highlighted) ? 'rgba(99,102,241,0.15)' : 'transparent',
                    cursor: 'pointer', padding: '0 4px'
                  }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(99,102,241,0.08)'}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = highlighted && line.includes(highlighted) ? 'rgba(99,102,241,0.15)' : 'transparent';
                  }}>
                  <span style={{ color: isDark ? '#334155' : '#cbd5e1', userSelect: 'none', minWidth: '32px', marginRight: '12px', fontSize: '0.75rem' }}>{i + 1}</span>
                  <span dangerouslySetInnerHTML={{ __html: syntaxHighlight(line) }} />
                </div>
              ))}
            </pre>
          </div>
        </div>

        {/* Right Panel */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Structure Analyzer */}
          <div className="rounded-2xl p-5" style={{
            background: isDark ? '#1a2744' : 'white',
            border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'}`,
            boxShadow: '0 4px 24px rgba(99,102,241,0.08)'
          }}>
            <h3 className="font-bold mb-4 text-sm" style={{ color: isDark ? '#e2e8f0' : '#1e1b4b' }}>📐 XML Structure</h3>
            {[
              { key: 'Root Element', value: '<courses>', color: '#6366f1' },
              { key: 'Repeating Element', value: '<course>', color: '#7c3aed' },
              { key: 'Unique Attribute', value: 'id (C101–C105)', color: '#0891b2' },
              { key: 'Numeric Elements', value: 'students, credits', color: '#dc2626' },
              { key: 'Well-Formed', value: '✓ Valid XML', color: '#059669' },
            ].map(item => (
              <div key={item.key} className="flex items-start gap-3 mb-3 pb-3" style={{ borderBottom: `1px solid ${isDark ? 'rgba(99,102,241,0.08)' : '#f0f0ff'}` }}>
                <div className="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" style={{ background: item.color }} />
                <div>
                  <div className="text-xs" style={{ color: isDark ? '#64748b' : '#94a3b8' }}>{item.key}</div>
                  <div className="text-sm font-semibold font-mono" style={{ color: item.color }}>{item.value}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Element Guide */}
          <div className="rounded-2xl p-5" style={{
            background: isDark ? '#1a2744' : 'white',
            border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'}`,
            boxShadow: '0 4px 24px rgba(99,102,241,0.08)'
          }}>
            <h3 className="font-bold mb-4 text-sm" style={{ color: isDark ? '#e2e8f0' : '#1e1b4b' }}>🏷️ Element Guide</h3>
            {Object.entries(XML_EXPLANATIONS).map(([el, info]) => (
              <button key={el} onClick={() => setHighlighted(highlighted === el ? null : el)}
                style={{
                  width: '100%', textAlign: 'left', padding: '8px 10px', borderRadius: '8px', marginBottom: '4px',
                  background: highlighted === el ? `${info.color}15` : 'transparent',
                  border: `1px solid ${highlighted === el ? info.color + '40' : 'transparent'}`,
                  cursor: 'pointer', transition: 'all 0.2s'
                }}>
                <div className="flex items-center gap-2">
                  <code style={{ fontSize: '0.78rem', fontWeight: 600, color: info.color, fontFamily: 'JetBrains Mono, monospace' }}>
                    {el === 'id' ? `@${el}` : `<${el}>`}
                  </code>
                  <span style={{ fontSize: '0.75rem', color: isDark ? '#64748b' : '#94a3b8' }}>{info.label}</span>
                </div>
                {highlighted === el && (
                  <div style={{ fontSize: '0.72rem', color: isDark ? '#94a3b8' : '#64748b', marginTop: '4px' }}>{info.desc}</div>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
