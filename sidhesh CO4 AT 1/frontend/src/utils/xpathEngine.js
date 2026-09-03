import { getXMLDoc, XML_STRING } from './xmlParser';

// Execute XPath expression against the XML document
// Returns array of result nodes/values
export function evaluateXPath(expression) {
  const doc = getXMLDoc();
  const results = [];

  try {
    const xpathResult = doc.evaluate(
      expression,
      doc,
      null,
      XPathResult.ANY_TYPE,
      null
    );

    const type = xpathResult.resultType;

    if (type === XPathResult.NUMBER_TYPE) {
      results.push({ type: 'number', value: xpathResult.numberValue });
    } else if (type === XPathResult.STRING_TYPE) {
      results.push({ type: 'string', value: xpathResult.stringValue });
    } else if (type === XPathResult.BOOLEAN_TYPE) {
      results.push({ type: 'boolean', value: xpathResult.booleanValue });
    } else {
      // Node set - iterate
      let node = xpathResult.iterateNext();
      while (node) {
        results.push(serializeNode(node));
        node = xpathResult.iterateNext();
      }
    }
    return { success: true, results, expression };
  } catch (err) {
    return { success: false, error: err.message, results: [], expression };
  }
}

function serializeNode(node) {
  if (node.nodeType === Node.ELEMENT_NODE) {
    // Build a clean XML representation
    const serializer = new XMLSerializer();
    let xml = serializer.serializeToString(node);
    // Remove namespace artifacts for cleanliness
    xml = xml.replace(/ xmlns="[^"]*"/g, '');
    const attrs = {};
    if (node.attributes) {
      Array.from(node.attributes).forEach(attr => {
        attrs[attr.name] = attr.value;
      });
    }
    const children = {};
    Array.from(node.children).forEach(child => {
      children[child.tagName] = child.textContent;
    });
    return {
      type: 'element',
      tagName: node.tagName,
      attributes: attrs,
      children,
      text: node.textContent.trim(),
      xml
    };
  } else if (node.nodeType === Node.TEXT_NODE) {
    return { type: 'text', value: node.textContent.trim() };
  } else if (node.nodeType === Node.ATTRIBUTE_NODE) {
    return { type: 'attribute', name: node.name, value: node.value };
  }
  return { type: 'other', value: node.textContent };
}

export function formatResultForDisplay(result) {
  if (!result.success) {
    return { error: result.error };
  }
  return result.results.map(r => {
    if (r.type === 'element') {
      return r.children && Object.keys(r.children).length > 0
        ? r.children
        : { text: r.text };
    }
    if (r.type === 'text' || r.type === 'string') {
      return { value: r.value };
    }
    if (r.type === 'attribute') {
      return { [r.name]: r.value };
    }
    return r;
  });
}
