let div;

export default function encode(content) {
  if (typeof content !== 'string' || !content) {
    return '';
  }

  if (!div) {
    div = document.createElement('div');
  }

  if (div.innerText) {
    div.innerText = content;
  } else {
    div.textContent = content; // Support firefox
  }

  return div.innerHTML;
}
