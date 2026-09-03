// XML Parser utility - parse XML string into structured JS objects
export const XML_STRING = `<?xml version="1.0" encoding="UTF-8"?>
<courses>
  <course id="C101">
    <code>WEB301</code>
    <name>Web Technology</name>
    <faculty>Dr. Arun</faculty>
    <students>58</students>
    <credits>4</credits>
    <type>Theory</type>
  </course>
  <course id="C102">
    <code>AI302</code>
    <name>Artificial Intelligence</name>
    <faculty>Dr. Meena</faculty>
    <students>72</students>
    <credits>4</credits>
    <type>Theory</type>
  </course>
  <course id="C103">
    <code>WEB303</code>
    <name>Web Technology Laboratory</name>
    <faculty>Dr. Ravi</faculty>
    <students>36</students>
    <credits>2</credits>
    <type>Practical</type>
  </course>
  <course id="C104">
    <code>ML304</code>
    <name>Machine Learning</name>
    <faculty>Dr. Priya</faculty>
    <students>64</students>
    <credits>4</credits>
    <type>Theory</type>
  </course>
  <course id="C105">
    <code>DB305</code>
    <name>Database Systems</name>
    <faculty>Dr. Kumar</faculty>
    <students>42</students>
    <credits>3</credits>
    <type>Theory</type>
  </course>
</courses>`;

export function parseXML(xmlString) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(xmlString, 'text/xml');
  const parseError = doc.querySelector('parsererror');
  if (parseError) throw new Error('Invalid XML: ' + parseError.textContent);
  return doc;
}

export function xmlDocToJSON(doc) {
  const courses = [];
  const courseNodes = doc.querySelectorAll('course');
  courseNodes.forEach(node => {
    courses.push({
      id: node.getAttribute('id'),
      code: node.querySelector('code')?.textContent || '',
      name: node.querySelector('name')?.textContent || '',
      faculty: node.querySelector('faculty')?.textContent || '',
      students: parseInt(node.querySelector('students')?.textContent || '0'),
      credits: parseInt(node.querySelector('credits')?.textContent || '0'),
      type: node.querySelector('type')?.textContent || ''
    });
  });
  return courses;
}

export function getXMLDoc() {
  return parseXML(XML_STRING);
}

export function getCourses() {
  const doc = getXMLDoc();
  return xmlDocToJSON(doc);
}

export function getStats() {
  const courses = getCourses();
  const totalStudents = courses.reduce((sum, c) => sum + c.students, 0);
  const totalCredits = courses.reduce((sum, c) => sum + c.credits, 0);
  const theoryCount = courses.filter(c => c.type === 'Theory').length;
  const practicalCount = courses.filter(c => c.type === 'Practical').length;
  return {
    totalCourses: courses.length,
    totalStudents,
    totalCredits,
    theoryCount,
    practicalCount
  };
}
