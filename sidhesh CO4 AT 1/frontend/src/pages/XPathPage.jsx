import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { evaluateXPath } from '../utils/xpathEngine';
import { XML_STRING } from '../utils/xmlParser';
import xpathExamples from '../data/xpathExamples.json';
import { Play, RotateCcw, ChevronRight } from 'lucide-react';

function syntaxHL(xml) {
  return xml
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/&lt;\/([a-z]+)&gt;/g, (_, t) => `<span style="color:#6366f1">&lt;/${t}&gt;</span>`)
    .replace(/&lt;([a-z]+)((?:\s+[^&]*)*)&gt;/g, (_, tag, attrs) => {
      const a = attrs.replace(/([a-z-]+)="([^"]*)"/g, (__, k, v) =>
        ` <span style="color:#0891b2">${k}</span>=<span style="color:#059669">"${v}"</span>`);
      return `<span style="color:#6366f1">&lt;</span><span style="color:#4f46e5;font-weight:600">${tag}</span>${a}<span style="color:#6366f1">&gt;</span>`;
    });
}

export default function XPathPage() {
  const { isDark } = useTheme();
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [running, setRunning] = useState(false);

  const runXPath = () => {
    if (!expression.trim()) return;
    setRunning(true); setError(null);
    setTimeout(() => {
      const res = evaluateXPath(expression.trim());
      if (!res.success) { setError(res.error); setResult(null); }
      else setResult(res.results);
      setRunning(false);
    }, 300);
  };

  const loadExample = (ex) => {
    setExpression(ex.expression);
    setResult(null); setError(null);
  };

  return (
    <div style={{ padding: '32px 24px', maxWidth: '1400px', margin: '0 auto' }}>
      <div className="mb-6">
        <h1 className="font-bold text-2xl mb-1" style={{ color: isDark ? '#e2e8f0' : '#1e1b4b' }}>🔍 XPath Playground</h1>
        <p style={{ color: isDark ? '#64748b' : '#94a3b8' }}>Write and run XPath queries live against the course dataset</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', alignItems: 'start' }}>
        {/* Left: XML + Examples */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* XML Preview */}
          <div className="rounded-2xl overflow-hidden" style={{
            background: isDark ? '#1a2744' : 'white',
            border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'}`,
          }}>
            <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${isDark ? 'rgba(99,102,241,0.1)' : '#f0f0ff'}` }}>
              <span className="font-semibold text-sm" style={{ color: isDark ? '#e2e8f0' : '#1e1b4b' }}>📄 XML Dataset</span>
              <span className="badge-theory text-xs">5 courses</span>
            </div>
            <pre className="code-editor" style={{
              margin: 0, padding: '16px', fontSize: '0.75rem', lineHeight: 1.8, overflowX: 'auto',
              background: isDark ? '#0f1729' : '#f8faff', maxHeight: '280px', overflowY: 'auto'
            }}>
              {XML_STRING.split('\n').map((line, i) => (
                <div key={i} style={{ display: 'flex' }}>
                  <span style={{ color: isDark ? '#334155' : '#cbd5e1', userSelect: 'none', minWidth: '28px', fontSize: '0.7rem' }}>{i + 1}</span>
                  <span dangerouslySetInnerHTML={{ __html: syntaxHL(line) }} />
                </div>
              ))}
            </pre>
          </div>

          {/* Examples */}
          <div className="rounded-2xl p-4" style={{
            background: isDark ? '#1a2744' : 'white',
            border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'}`,
          }}>
            <div className="font-semibold text-sm mb-3" style={{ color: isDark ? '#e2e8f0' : '#1e1b4b' }}>📚 Predefined Examples</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {xpathExamples.map(ex => (
                <button key={ex.id} onClick={() => loadExample(ex)}
                  style={{
                    textAlign: 'left', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer',
                    background: expression === ex.expression ? 'rgba(99,102,241,0.12)' : isDark ? 'rgba(255,255,255,0.03)' : '#f8faff',
                    border: `1px solid ${expression === ex.expression ? '#6366f1' : isDark ? 'rgba(99,102,241,0.1)' : '#e0e7ff'}`,
                    transition: 'all 0.15s'
                  }}>
                  <div className="flex items-center gap-2">
                    <span style={{ color: '#6366f1', fontWeight: 700, fontSize: '0.75rem', minWidth: '20px' }}>{ex.id}.</span>
                    <div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 500, color: isDark ? '#e2e8f0' : '#1e1b4b' }}>{ex.title}</div>
                      <code style={{ fontSize: '0.7rem', color: '#6366f1', fontFamily: 'JetBrains Mono, monospace' }}>{ex.expression}</code>
                    </div>
                    <ChevronRight size={12} className="ml-auto" style={{ color: '#94a3b8' }} />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Query + Results */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="rounded-2xl p-5" style={{
            background: isDark ? '#1a2744' : 'white',
            border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'}`,
          }}>
            <div className="font-semibold text-sm mb-3" style={{ color: isDark ? '#e2e8f0' : '#1e1b4b' }}>✏️ XPath Expression</div>
            <input
              value={expression}
              onChange={e => setExpression(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && runXPath()}
              placeholder="/courses/course[students > 50]"
              style={{
                width: '100%', padding: '12px 16px', borderRadius: '10px',
                border: `2px solid ${error ? '#ef4444' : expression ? '#6366f1' : isDark ? 'rgba(99,102,241,0.3)' : '#e0e7ff'}`,
                background: isDark ? 'rgba(99,102,241,0.05)' : '#f8faff',
                color: isDark ? '#e2e8f0' : '#1e1b4b', outline: 'none',
                fontFamily: 'JetBrains Mono, monospace', fontSize: '0.875rem',
                marginBottom: '12px', transition: 'border-color 0.2s'
              }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={runXPath} disabled={!expression || running} className="btn-primary flex-1 justify-center py-2.5">
                <Play size={16} /> {running ? 'Running...' : 'Run XPath'}
              </button>
              <button onClick={() => { setExpression(''); setResult(null); setError(null); }} className="btn-secondary px-4">
                <RotateCcw size={16} />
              </button>
            </div>

            {/* Category Badge */}
            {expression && (
              <div className="mt-3">
                {xpathExamples.find(e => e.expression === expression) && (
                  <div style={{ fontSize: '0.75rem', color: isDark ? '#64748b' : '#94a3b8' }}>
                    {xpathExamples.find(e => e.expression === expression)?.description}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Results */}
          <div className="rounded-2xl overflow-hidden" style={{
            background: isDark ? '#1a2744' : 'white',
            border: `1px solid ${error ? '#ef4444' : result ? '#059669' : isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'}`,
            minHeight: '300px'
          }}>
            <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${isDark ? 'rgba(99,102,241,0.1)' : '#f0f0ff'}` }}>
              <span className="font-semibold text-sm" style={{ color: isDark ? '#e2e8f0' : '#1e1b4b' }}>📋 Results</span>
              {result && <span className="badge-theory">{result.length} node{result.length !== 1 ? 's' : ''} matched</span>}
              {error && <span className="badge-practical" style={{ background: '#fee2e2', color: '#dc2626' }}>Error</span>}
            </div>
            <div style={{ padding: '16px', overflowY: 'auto', maxHeight: '480px' }}>
              {!result && !error && (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: isDark ? '#475569' : '#94a3b8' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔍</div>
                  <p style={{ fontSize: '0.9rem' }}>Select an example or type an XPath expression, then click Run XPath</p>
                </div>
              )}
              {error && (
                <div style={{ background: '#fee2e2', borderRadius: '10px', padding: '16px', color: '#dc2626', fontSize: '0.875rem', fontFamily: 'JetBrains Mono, monospace' }}>
                  ❌ {error}
                </div>
              )}
              {result && result.length === 0 && (
                <div style={{ textAlign: 'center', padding: '40px 20px', color: isDark ? '#475569' : '#94a3b8' }}>
                  <p>No matching nodes found</p>
                </div>
              )}
              {result && result.map((r, i) => (
                <div key={i} className="mb-3 rounded-xl overflow-hidden" style={{
                  border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : '#e0e7ff'}`,
                  animation: 'fadeIn 0.3s ease-out'
                }}>
                  <div style={{ background: isDark ? 'rgba(99,102,241,0.1)' : '#f0f0ff', padding: '6px 12px', fontSize: '0.72rem', fontWeight: 600, color: '#6366f1' }}>
                    Node {i + 1} — {r.type}
                  </div>
                  <div style={{ padding: '12px' }}>
                    {r.type === 'element' && r.children && Object.keys(r.children).length > 0 ? (
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
                        {r.attributes && Object.entries(r.attributes).map(([k, v]) => (
                          <div key={k} style={{ gridColumn: '1/-1', fontSize: '0.75rem' }}>
                            <span style={{ color: '#0891b2', fontFamily: 'monospace' }}>@{k}</span>
                            <span style={{ color: isDark ? '#64748b' : '#94a3b8', margin: '0 6px' }}>=</span>
                            <span style={{ color: '#059669', fontFamily: 'monospace', fontWeight: 600 }}>"{v}"</span>
                          </div>
                        ))}
                        {Object.entries(r.children).map(([k, v]) => (
                          <div key={k} style={{ fontSize: '0.8rem', padding: '4px 8px', borderRadius: '6px', background: isDark ? 'rgba(99,102,241,0.08)' : '#f8faff' }}>
                            <span style={{ color: '#6366f1', fontFamily: 'monospace', fontSize: '0.72rem' }}>&lt;{k}&gt;</span>
                            <span style={{ color: isDark ? '#e2e8f0' : '#1e1b4b', fontWeight: 500, marginLeft: '4px' }}>{v}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.875rem', color: isDark ? '#a5b4fc' : '#4f46e5', fontWeight: 600 }}>
                        {r.text || r.value || (r.name && `@${r.name}="${r.value}"`) || JSON.stringify(r)}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
