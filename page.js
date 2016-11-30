// This script gets loaded when the page that matches the regular expression in manifest.json gets loaded too.
// It sends a message to background.js (which is the supreme communicator channel) to say, "Hey, show the page action, this page matches our criteria."
chrome.runtime.sendMessage({
    from:    'content',
    subject: 'showPageAction'
});

// This script will also listen for a message from the popup (which is part of the page action).
chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        // Validate the message structure
        if( request.message === "popup" ) {
            // A content script is able to read the HTML/source of the current tab it's active on
            var location = $("a[href='#neighborhood']").children("span").children("span").text();
            console.log(location)
            var city = location.split(',')[0];
            var state = location.split(',')[1].trim();
            // sendResponse is a call back function that is executed after this message listener actually activates
            sendResponse(city + ',' + state);
        }
    }
);