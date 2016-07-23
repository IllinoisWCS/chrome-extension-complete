// Listens for messages from the content script
chrome.runtime.onMessage.addListener(function (msg, sender) {
    // Validate the message's structure
    if ((msg.from === 'content') && (msg.subject === 'showPageAction')) {
        // Initiates the page action to show (aka the icon to be active) on this current tab
        chrome.pageAction.show(sender.tab.id);
    }
});