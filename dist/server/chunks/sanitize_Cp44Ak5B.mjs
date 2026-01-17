import DOMPurify from 'dompurify';

const sanitizeHTML = (html) => {
  if (typeof window === "undefined") {
    return html;
  }
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["p", "br", "strong", "em", "code", "pre", "a", "ul", "ol", "li", "blockquote"],
    ALLOWED_ATTR: ["href", "target", "rel", "class"],
    ALLOW_DATA_ATTR: false,
    FORBID_TAGS: ["script", "style", "iframe", "object", "embed", "form", "input", "textarea", "select", "button"],
    FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover", "onfocus", "onblur", "onchange", "onsubmit"]
  });
};
const validateMessageContent = (content) => {
  if (typeof content !== "string") return false;
  if (content.length > 1e4) return false;
  if (content.trim().length === 0) return false;
  return true;
};

export { sanitizeHTML as s, validateMessageContent as v };
