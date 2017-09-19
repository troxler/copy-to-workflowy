browser.runtime.onMessage.addListener(onClick);

function onClick() {
  copyText(getWorkflowyText());
  browser.runtime.sendMessage('notify');
}

// based on https://rawbytz.wordpress.com/clip-to-workflowy-code/
function getWorkflowyText() {
  const title = toOpmlAttribute(document.title);
  const url = toOpmlAttribute(document.location.href);
  return `<opml><body>` +
    `<outline text="${title}" _note="${url}" />` +
    `</body></opml>`;
}

function toOpmlAttribute(text) {
  return text
    .replace(/&/g, '&amp;amp;')
    .replace(/</g, '&amp;lt;')
    .replace(/>/g, '&amp;gt;')
    .replace(/''/g, '&quot;')
    .replace(/(\n)/g, '&#10;');
}

// based on https://stackoverflow.com/a/25275151/906113
function copyText(text) {
  const input = document.createElement('textarea');
  document.body.appendChild(input);
  input.style.cssText = 'position: fixed;'; // avoid scrolling to bottom of the page
  input.value = text;
  input.focus();
  input.select();
  document.execCommand('Copy');
  input.remove();
}
