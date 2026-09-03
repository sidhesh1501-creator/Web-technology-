import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { runXSLT, DEFAULT_XSLT } from '../utils/xsltProcessor';
import { XML_STRING } from '../utils/xmlParser';
import { Play, RotateCcw, Copy, Download, ChevronRight } from 'lucide-react';

export default function XSLTPage() {
  const { isDark } = useTheme();
  const [xslt, setXslt] = useState(DEFAULT_XSLT);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [running, setRunning] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleRun = () => {
    setRunning(true); setError(null); setResult(null);
    setTimeout(() => {
      const res = runXSLT(XML_STRING, xslt);
      if (res.success) setResult(res.html);
      else setError(res.error);
      setRunning(false);
    }, 400);
  };

  const handleCopyXSLT = () => {
    navigator.clipboard.writeText(xslt);
    setCopied(true); setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    if (!result) return;
    const blob = new Blob([result], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'transformed.html'; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ padding: '32px 24px', maxWidth: '1400px', margin: '0 auto' }}>
      <div className="mb-6">
        <h1 className="font-bold text-2xl mb-1" style={{ color: isDark ? '#e2e8f0' : '#1e1b4b' }}>⚡ XSLT Transformation Simulator</h1>
        <p style={{ color: isDark ? '#64748b' : '#94a3b8' }}>Transform XML to HTML using XSLT stylesheets — live in the browser</p>
      </div>

      {/* Pipeline */}
      <div className="flex items-center gap-3 mb-6 flex-wrap">
        {[
          { label: 'XML Data', icon: '📄', color: '#6366f1' },
          { label: '→', isArrow: true },
          { label: 'XSLT Processor', icon: '⚙️', color: '#7c3aed' },
          { label: '→', isArrow: true },
          { label: 'HTML Table', icon: '🌐', color: '#059669' },
        ].map((s, i) => s.isArrow ? (
          <span key={i} style={{ color: isDark ? '#475569' : '#94a3b8', fontSize: '1.25rem' }}>→</span>
        ) : (
          <div key={i} style={{
            display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px',
            borderRadius: '10px', background: `${s.color}15`, border: `1px solid ${s.color}30`
          }}>
            <span>{s.icon}</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, color: s.color }}>{s.label}</span>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* XSLT Editor */}
        <div className="rounded-2xl overflow-hidden" style={{
          background: isDark ? '#1a2744' : 'white',
          border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'}`,
        }}>
          <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${isDark ? 'rgba(99,102,241,0.1)' : '#f0f0ff'}` }}>
            <span className="font-semibold text-sm" style={{ color: isDark ? '#e2e8f0' : '#1e1b4b' }}>📝 XSLT Stylesheet</span>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button onClick={handleCopyXSLT} className="btn-ghost text-xs px-2 py-1">
                <Copy size={13} /> {copied ? 'Copied!' : 'Copy'}
              </button>
              <button onClick={() => setXslt(DEFAULT_XSLT)} className="btn-ghost text-xs px-2 py-1">
                <RotateCcw size={13} /> Reset
              </button>
            </div>
          </div>
          <textarea
            value={xslt}
            onChange={e => setXslt(e.target.value)}
            spellCheck={false}
            style={{
              width: '100%', height: '480px', padding: '16px',
              fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem', lineHeight: 1.8,
              background: isDark ? '#0f1729' : '#f8faff', color: isDark ? '#e2e8f0' : '#1e1b4b',
              border: 'none', outline: 'none', resize: 'none',
              tabSize: 2
            }}
          />
          <div className="px-4 py-3" style={{ borderTop: `1px solid ${isDark ? 'rgba(99,102,241,0.1)' : '#f0f0ff'}`, display: 'flex', gap: '10px' }}>
            <button onClick={handleRun} disabled={running} className="btn-primary flex-1 justify-center py-2.5">
              <Play size={16} /> {running ? 'Transforming...' : 'Run Transformation'}
            </button>
            <button onClick={handleDownload} disabled={!result} className="btn-secondary px-4" title="Download HTML">
              <Download size={16} />
            </button>
          </div>
        </div>

        {/* Result Panel */}
        <div className="rounded-2xl overflow-hidden" style={{
          background: isDark ? '#1a2744' : 'white',
          border: `1px solid ${result ? '#059669' : error ? '#ef4444' : isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'}`,
          display: 'flex', flexDirection: 'column'
        }}>
          <div className="px-4 py-3 flex items-center justify-between" style={{ borderBottom: `1px solid ${isDark ? 'rgba(99,102,241,0.1)' : '#f0f0ff'}` }}>
            <span className="font-semibold text-sm" style={{ color: isDark ? '#e2e8f0' : '#1e1b4b' }}>🌐 HTML Output</span>
            {result && <span style={{ background: '#dcfce7', color: '#16a34a', padding: '2px 10px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>✓ Success</span>}
            {error && <span style={{ background: '#fee2e2', color: '#dc2626', padding: '2px 10px', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 600 }}>✗ Error</span>}
          </div>
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {!result && !error && !running && (
              <div style={{ textAlign: 'center', padding: '60px 20px', color: isDark ? '#475569' : '#94a3b8' }}>
                <div style={{ fontSize: '3rem', marginBottom: '12px' }}>⚡</div>
                <p style={{ fontSize: '0.9rem' }}>Click "Run Transformation" to transform XML using the XSLT stylesheet</p>
                <div style={{ marginTop: '16px', fontSize: '0.8rem', color: isDark ? '#334155' : '#cbd5e1' }}>
                  The XSLT will filter courses with &gt;40 students and sort by enrollment
                </div>
              </div>
            )}
            {running && (
              <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                <div className="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p style={{ color: isDark ? '#64748b' : '#94a3b8' }}>Applying XSLT transformation...</p>
              </div>
            )}
            {error && (
              <div style={{ padding: '20px' }}>
                <div style={{ background: '#fee2e2', borderRadius: '10px', padding: '16px', color: '#dc2626', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                  {error}
                </div>
              </div>
            )}
            {result && (
              <iframe
                srcDoc={result}
                style={{ width: '100%', height: '480px', border: 'none' }}
                title="XSLT Result"
                sandbox="allow-same-origin"
              />
            )}
          </div>
        </div>
      </div>

      {/* What the XSLT does */}
      <div className="mt-6 rounded-2xl p-5" style={{
        background: isDark ? '#1a2744' : 'white',
        border: `1px solid ${isDark ? 'rgba(99,102,241,0.15)' : 'rgba(99,102,241,0.1)'}`,
      }}>
        <h3 className="font-bold mb-4 text-sm" style={{ color: isDark ? '#e2e8f0' : '#1e1b4b' }}>📖 How This XSLT Works</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
          {[
            { icon: '🔍', label: 'Filter', desc: 'Selects courses with students > 40' },
            { icon: '📊', label: 'Sort', desc: 'Orders by student count descending' },
            { icon: '🎨', label: 'Style', desc: 'Applies CSS for professional table look' },
            { icon: '🏷️', label: 'Badges', desc: 'Color-codes Theory vs Practical types' },
          ].map(s => (
            <div key={s.label} style={{
              padding: '12px', borderRadius: '10px',
              background: isDark ? 'rgba(99,102,241,0.08)' : '#f8faff',
              border: `1px solid ${isDark ? 'rgba(99,102,241,0.1)' : '#e0e7ff'}`
            }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '6px' }}>{s.icon}</div>
              <div style={{ fontWeight: 600, fontSize: '0.85rem', color: isDark ? '#e2e8f0' : '#1e1b4b', marginBottom: '2px' }}>{s.label}</div>
              <div style={{ fontSize: '0.75rem', color: isDark ? '#64748b' : '#94a3b8' }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
