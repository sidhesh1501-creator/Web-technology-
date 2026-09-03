import React, { useState } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { useProgress } from '../contexts/ProgressContext';
import { CheckCircle } from 'lucide-react';

const MODULES = [
  {
    id:'xml-structure', num:1, title:'Understanding XML', emoji:'📄',
    color:'#6366f1', grad:'linear-gradient(135deg,#6366f1,#8b5cf6)',
    topics:[
      {title:'What is XML?',content:'XML (eXtensible Markup Language) is a markup language designed to store and transport data. Unlike HTML which displays data, XML describes data using custom tags. It is both human-readable and machine-readable.'},
      {title:'Root Element',content:'Every XML document must have exactly one root element that contains all other elements. In our dataset, <courses> is the root element — it wraps all <course> records.'},
      {title:'Elements & Tags',content:'Elements are defined by opening and closing tags: <name>Web Technology</name>. Elements can contain text, attributes, or other elements (child elements).'},
      {title:'Attributes',content:'Attributes provide additional metadata about an element: <course id="C101">. The id attribute uniquely identifies each course and uses the @ symbol in XPath.'},
      {title:'Repeating Records',content:'XML supports repeating elements to represent collections. Each <course> element repeats with the same structure — this is the basis of XML data modeling.'},
      {title:'Numeric Data',content:'Elements like <students>58</students> and <credits>4</credits> hold numeric values. XPath can perform comparisons on these: [students > 50].'},
      {title:'Well-Formed XML',content:'A well-formed XML document has a single root element, every opening tag has a closing tag, elements are properly nested, and attributes are quoted. Our courses XML is well-formed.'},
    ],
    quiz:{q:'What is the root element in the course XML?',opts:['<course>','<courses>','<code>','<type>'],ans:'<courses>'},
  },
  {
    id:'xpath', num:2, title:'XPath Queries', emoji:'🔍',
    color:'#8b5cf6', grad:'linear-gradient(135deg,#8b5cf6,#a855f7)',
    topics:[
      {title:'What is XPath?',content:'XPath (XML Path Language) is a query language for selecting nodes from an XML document. It uses path expressions to navigate the tree structure of XML.'},
      {title:'Selecting Nodes',content:'/courses/course selects all <course> elements that are direct children of <courses>. The leading / means "from the root".'},
      {title:'Predicates [ ]',content:'Predicates filter nodes: /courses/course[students > 50] returns only courses where the <students> value exceeds 50.'},
      {title:'Attribute @',content:'The @ symbol accesses attributes: /courses/course[@id="C104"] selects the course with id equal to C104.'},
      {title:'Numeric Conditions',content:'XPath supports comparisons: = != > < >= <= . Example: [credits >= 4] selects courses with 4 or more credits.'},
      {title:'Multiple Conditions',content:'Combine with and / or: [type="Theory" and students > 50] — Theory courses with more than 50 students.'},
    ],
    quiz:{q:'Which XPath selects the course with id C103?',opts:['/courses/course[id="C103"]','/courses/course[@id="C103"]','/courses[@id="C103"]','//C103'],ans:'/courses/course[@id="C103"]'},
  },
  {
    id:'xslt', num:3, title:'XSLT Transformation', emoji:'⚡',
    color:'#0891b2', grad:'linear-gradient(135deg,#0891b2,#06b6d4)',
    topics:[
      {title:'What is XSLT?',content:'XSLT (eXtensible Stylesheet Language Transformations) transforms XML into other formats — most commonly HTML. It uses templates to match and process XML nodes.'},
      {title:'xsl:template',content:'<xsl:template match="/"> matches the root of the XML document. Inside the template, you define the HTML output for that matched content.'},
      {title:'xsl:for-each',content:'<xsl:for-each select="/courses/course"> iterates over each <course>. Add predicates to filter: select="/courses/course[students > 40]".'},
      {title:'xsl:value-of',content:'<xsl:value-of select="name"/> outputs the text content of the <name> element of the current context node.'},
      {title:'xsl:sort',content:'<xsl:sort select="students" order="descending" data-type="number"/> sorts nodes by student count, descending.'},
      {title:'xsl:if & xsl:choose',content:'<xsl:if test="type=\'Theory\'"> is conditional. <xsl:choose> with <xsl:when> and <xsl:otherwise> works like if-else.'},
      {title:'HTML Output',content:'XSLT generates complete HTML with <html>, <head>, <style>, <body> tags. Set output method with <xsl:output method="html"/>.'},
    ],
    quiz:{q:'Which element iterates over matching XML nodes in XSLT?',opts:['<xsl:template>','<xsl:for-each>','<xsl:value-of>','<xsl:sort>'],ans:'<xsl:for-each>'},
  },
  {
    id:'data-interpretation', num:4, title:'Data Interpretation', emoji:'📊',
    color:'#10b981', grad:'linear-gradient(135deg,#10b981,#059669)',
    topics:[
      {title:'Reading XML Data',content:'Data interpretation starts with reading raw XML. Identify what each element represents — <students> is a count, <credits> is a weight, <type> is a category.'},
      {title:'Finding Extremes',content:'Compare numeric values to find max/min. From our data: AI (72) is highest enrollment, Lab (36) is lowest. Use XPath predicates to filter these.'},
      {title:'Grouping & Counting',content:'Count elements by category: 4 Theory, 1 Practical. Use XPath: count(/courses/course[type="Theory"]).'},
      {title:'Identifying Patterns',content:'Courses with > 60 students (AI: 72, ML: 64) may need extra resources. This is a business insight derived from numeric XML data.'},
    ],
    quiz:{q:'Which course has the highest enrollment?',opts:['Web Technology','Machine Learning','Artificial Intelligence','Database Systems'],ans:'Artificial Intelligence'},
  },
];

function ModuleCard({ mod }) {
  const { isDark } = useTheme();
  const { progress, markComplete } = useProgress();
  const [open, setOpen] = useState(false);
  const [activeTopic, setActiveTopic] = useState(0);
  const [quizAns, setQuizAns] = useState(null);
  const modProg = progress[mod.id] || { completed:0, total:1, percentage:0 };

  return (
    <div style={{ borderRadius:20, overflow:'hidden', marginBottom:14, border:`1px solid ${open ? mod.color+'40' : isDark?'rgba(99,102,241,0.12)':'rgba(99,102,241,0.08)'}`, boxShadow: open?`0 8px 40px ${mod.color}20`:'0 2px 12px rgba(99,102,241,0.06)', transition:'all 0.3s ease', background: isDark?'#111827':'white' }}>
      {/* Header */}
      <button onClick={()=>setOpen(!open)} style={{ width:'100%', padding:'20px 24px', display:'flex', alignItems:'center', gap:16, background:'transparent', border:'none', cursor:'pointer', textAlign:'left' }}>
        <div style={{ width:52, height:52, borderRadius:16, background:mod.grad, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.6rem', boxShadow:`0 6px 20px ${mod.color}40`, flexShrink:0 }}>{mod.emoji}</div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:'0.72rem', fontWeight:800, color:mod.color, textTransform:'uppercase', letterSpacing:'0.08em' }}>Module {mod.num}</div>
          <div style={{ fontWeight:800, fontSize:'1.05rem', color: isDark?'#f1f5f9':'#1e1b4b' }}>{mod.title}</div>
          <div style={{ fontSize:'0.73rem', color: isDark?'#475569':'#94a3b8', marginTop:2 }}>{modProg.completed}/{modProg.total} topics · {modProg.percentage}% complete</div>
        </div>
        {/* Progress mini */}
        <div style={{ display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
          <div style={{ width:60, height:5, borderRadius:99, background: isDark?'rgba(99,102,241,0.15)':'#e0e7ff', overflow:'hidden' }}>
            <div style={{ height:'100%', borderRadius:99, width:`${modProg.percentage}%`, background:mod.grad }}/>
          </div>
          <div style={{ color: open?mod.color:isDark?'#475569':'#94a3b8', fontSize:'1.1rem', transition:'transform 0.2s', transform: open?'rotate(90deg)':'rotate(0deg)' }}>›</div>
        </div>
      </button>

      {/* Body */}
      {open && (
        <div style={{ borderTop:`1px solid ${isDark?'rgba(99,102,241,0.1)':'#f0f0ff'}` }}>
          <div style={{ display:'grid', gridTemplateColumns:'min(220px,35%) 1fr' }}>
            {/* Topic Sidebar */}
            <div style={{ borderRight:`1px solid ${isDark?'rgba(99,102,241,0.1)':'#f0f0ff'}`, padding:14, overflowY:'auto', maxHeight:400 }}>
              {mod.topics.map((t,i)=>(
                <button key={i} onClick={()=>{ setActiveTopic(i); markComplete(mod.id,i); }}
                  style={{ width:'100%', textAlign:'left', padding:'9px 12px', borderRadius:10, marginBottom:4, background: activeTopic===i?`${mod.color}15`:'transparent', border:`1px solid ${activeTopic===i?mod.color+'30':'transparent'}`, cursor:'pointer', display:'flex', alignItems:'center', gap:8, transition:'all 0.15s' }}>
                  <div style={{ width:22, height:22, borderRadius:6, background:activeTopic===i?mod.color:`${mod.color}20`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <span style={{ fontSize:'0.65rem', fontWeight:800, color: activeTopic===i?'white':mod.color }}>{i+1}</span>
                  </div>
                  <span style={{ fontSize:'0.78rem', fontWeight: activeTopic===i?700:400, color: activeTopic===i?mod.color:isDark?'#94a3b8':'#6b7280', lineHeight:1.3 }}>{t.title}</span>
                </button>
              ))}
            </div>

            {/* Content */}
            <div style={{ padding:24, overflowY:'auto', maxHeight:400 }}>
              <h3 style={{ fontWeight:800, fontSize:'1.05rem', color: isDark?'#f1f5f9':'#1e1b4b', marginBottom:12, display:'flex', alignItems:'center', gap:8 }}>
                <span style={{ color:mod.color }}>◆</span> {mod.topics[activeTopic].title}
              </h3>
              <p style={{ lineHeight:1.8, color: isDark?'#94a3b8':'#374151', fontSize:'0.9rem' }}>
                {mod.topics[activeTopic].content}
              </p>

              {activeTopic===mod.topics.length-1 && (
                <div style={{ marginTop:24, padding:20, borderRadius:16, background: isDark?`${mod.color}10`:`${mod.color}08`, border:`1px solid ${mod.color}25` }}>
                  <div style={{ fontWeight:800, fontSize:'0.88rem', color:mod.color, marginBottom:12 }}>🎯 Quick Quiz</div>
                  <p style={{ fontSize:'0.875rem', fontWeight:600, color: isDark?'#e2e8f0':'#1e1b4b', marginBottom:14, lineHeight:1.5 }}>{mod.quiz.q}</p>
                  <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                    {mod.quiz.opts.map((opt,i)=>{
                      const sel=quizAns===opt, correct=opt===mod.quiz.ans, shown=quizAns!==null;
                      return (
                        <button key={i} disabled={shown} onClick={()=>setQuizAns(opt)}
                          style={{ textAlign:'left', padding:'10px 14px', borderRadius:10, cursor:shown?'default':'pointer', fontFamily:'inherit', fontSize:'0.85rem', fontWeight:sel&&shown?700:400, transition:'all 0.15s',
                            background:!shown?(sel?`${mod.color}12`:'transparent'):(correct?'#f0fdf4':sel?'#fff1f2':'transparent'),
                            border:`1.5px solid ${!shown?(sel?mod.color:isDark?'rgba(99,102,241,0.15)':'#e0e7ff'):(correct?'#10b981':sel?'#ef4444':isDark?'rgba(99,102,241,0.1)':'#e0e7ff')}`,
                            color:!shown?(isDark?'#e2e8f0':'#374151'):(correct?'#166534':sel?'#9f1239':isDark?'#64748b':'#94a3b8'),
                            display:'flex', alignItems:'center', gap:8 }}>
                          {shown && correct && <CheckCircle size={14} style={{color:'#10b981'}}/>}
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {quizAns && <div style={{ marginTop:10, fontSize:'0.82rem', fontWeight:700, color:quizAns===mod.quiz.ans?'#10b981':'#ef4444' }}>
                    {quizAns===mod.quiz.ans?'✓ Correct! Great job.':` ✗ Correct: ${mod.quiz.ans}`}
                  </div>}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function Learning() {
  const { isDark } = useTheme();
  return (
    <div style={{ padding:'28px 24px', maxWidth:1000, margin:'0 auto' }}>
      <div style={{ marginBottom:28 }}>
        <h1 style={{ fontWeight:900, fontSize:'1.75rem', color: isDark?'#f1f5f9':'#1e1b4b', marginBottom:4 }}>📚 Learning Modules</h1>
        <p style={{ color: isDark?'#64748b':'#6b7280' }}>4 structured modules — XML, XPath, XSLT & Data Interpretation</p>
      </div>
      {/* Module Color Bar */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:24 }}>
        {MODULES.map(m=>(
          <div key={m.id} style={{ borderRadius:12, padding:'12px 14px', background: isDark?`${m.color}15`:`${m.color}10`, border:`1px solid ${m.color}30`, display:'flex', alignItems:'center', gap:8 }}>
            <span style={{ fontSize:'1.2rem' }}>{m.emoji}</span>
            <div>
              <div style={{ fontSize:'0.72rem', fontWeight:800, color:m.color, textTransform:'uppercase', letterSpacing:'0.05em' }}>M{m.num}</div>
              <div style={{ fontSize:'0.8rem', fontWeight:600, color: isDark?'#e2e8f0':'#1e1b4b' }}>{m.title}</div>
            </div>
          </div>
        ))}
      </div>
      {MODULES.map(m=><ModuleCard key={m.id} mod={m}/>)}
    </div>
  );
}
