import { XML_STRING } from './xmlParser';

export const DEFAULT_XSLT = `<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
  <xsl:output method="html" indent="yes"/>

  <xsl:template match="/">
    <html>
      <head>
        <style>
          body { font-family: Inter, sans-serif; padding: 16px; }
          h2 { color: #3730a3; margin-bottom: 16px; font-size: 1.4rem; }
          table { border-collapse: collapse; width: 100%; font-size: 0.9rem; }
          th { background: #4338ca; color: white; padding: 10px 14px; text-align: left; }
          td { border: 1px solid #e2e8f0; padding: 10px 14px; }
          tr:nth-child(even) { background: #f1f5f9; }
          tr:hover { background: #e0e7ff; }
          .badge { display:inline-block; padding:2px 8px; border-radius:9999px; font-size:0.75rem; font-weight:600; }
          .theory { background:#dbeafe; color:#1d4ed8; }
          .practical { background:#dcfce7; color:#16a34a; }
        </style>
      </head>
      <body>
        <h2>&#128218; High Enrollment Courses</h2>
        <table>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Faculty</th>
            <th>Students</th>
            <th>Credits</th>
            <th>Type</th>
          </tr>
          <xsl:for-each select="/courses/course[students &gt; 40]">
            <xsl:sort select="students" order="descending" data-type="number"/>
            <tr>
              <td><xsl:value-of select="code"/></td>
              <td><xsl:value-of select="name"/></td>
              <td><xsl:value-of select="faculty"/></td>
              <td><strong><xsl:value-of select="students"/></strong></td>
              <td><xsl:value-of select="credits"/></td>
              <td>
                <xsl:choose>
                  <xsl:when test="type='Theory'">
                    <span class="badge theory"><xsl:value-of select="type"/></span>
                  </xsl:when>
                  <xsl:otherwise>
                    <span class="badge practical"><xsl:value-of select="type"/></span>
                  </xsl:otherwise>
                </xsl:choose>
              </td>
            </tr>
          </xsl:for-each>
        </table>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>`;

export function runXSLT(xmlString, xsltString) {
  try {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlString, 'text/xml');
    const xsltDoc = parser.parseFromString(xsltString, 'text/xml');

    const xmlErr = xmlDoc.querySelector('parsererror');
    if (xmlErr) throw new Error('XML Parse Error: ' + xmlErr.textContent.slice(0, 200));
    const xsltErr = xsltDoc.querySelector('parsererror');
    if (xsltErr) throw new Error('XSLT Parse Error: ' + xsltErr.textContent.slice(0, 200));

    const processor = new XSLTProcessor();
    processor.importStylesheet(xsltDoc);
    const resultDoc = processor.transformToDocument(xmlDoc);
    const serializer = new XMLSerializer();
    return { success: true, html: serializer.serializeToString(resultDoc) };
  } catch (err) {
    return { success: false, error: err.message };
  }
}
