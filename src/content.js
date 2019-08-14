browser.runtime.onMessage.addListener(onClick);

function onClick() {
  copyText(getWorkflowyText());
  browser.runtime.sendMessage('notify');
}

// based on https://rawbytz.wordpress.com/clip-to-workflowy-code/
function getWorkflowyText() {
  const {
    title,
    url
  } = formatBookmark(document.title, document.location.href);
  return `<opml><body>` +
    `<outline text="${title}" _note="${url}" />` +
    `</body></opml>`;
}

function formatBookmark(title, url) {
  // handle Workflowy links
  if (url.startsWith('https://workflowy.com/#/')) {
    const titlePrefix = ' - WorkFlowy';
    if (title.endsWith(titlePrefix)) {
      title = title.substring(0, title.length - titlePrefix.length);
    }
    url = `>> ${url}`;
  }

  title = title.trim();

  title = toOpmlAttribute(title);
  url = toOpmlAttribute(url);

  return {
    title,
    url
  };
}

function toOpmlAttribute(text) {
  return text
    .replace(/&/g, '&amp;amp;')
    .replace(/</g, '&amp;lt;')
    .replace(/>/g, '&amp;gt;')
    .replace(/"/g, '&quot;')
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
