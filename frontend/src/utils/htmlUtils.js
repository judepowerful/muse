export const decodeHtmlEntities = (html) => {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = html;
    return textarea.value;
  };