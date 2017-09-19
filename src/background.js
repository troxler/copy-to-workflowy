browser.browserAction.onClicked.addListener(onClick);
browser.runtime.onMessage.addListener(notify);

function onClick() {
  getCurrentTab()
    .then(tab => tab && browser.tabs.sendMessage(tab.id, 'clicked'));
}

function getCurrentTab() {
  return browser.tabs.query({
    currentWindow: true,
    active: true,
  })
    .then(tabs => Array.isArray(tabs) && tabs.length ? tabs[0] : null);
}

function notify() {
  browser.notifications.create({
    type: 'basic',
    iconUrl: browser.extension.getURL('icons/workflowy-48.png'),
    title: 'Copy to Workflowy',
    message: `Page title and address have been copied and can now be pasted into Workflowy.`,
  });
}
