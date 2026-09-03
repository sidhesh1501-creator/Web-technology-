const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// Serve courses JSON
app.get('/api/courses', (req, res) => {
  const data = require('./data/courses.json');
  res.json(data);
});

// Serve courses XML
app.get('/api/courses.xml', (req, res) => {
  const xmlPath = path.join(__dirname, 'data', 'courses.xml');
  res.setHeader('Content-Type', 'application/xml');
  res.sendFile(xmlPath);
});

// Stats endpoint
app.get('/api/stats', (req, res) => {
  const { courses } = require('./data/courses.json');
  res.json({
    totalCourses: courses.length,
    totalStudents: courses.reduce((s, c) => s + c.students, 0),
    totalCredits: courses.reduce((s, c) => s + c.credits, 0),
    theoryCount: courses.filter(c => c.type === 'Theory').length,
    practicalCount: courses.filter(c => c.type === 'Practical').length,
  });
});

app.listen(PORT, () => {
  console.log(`✅ WebTech API running at http://localhost:${PORT}`);
});
