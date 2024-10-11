// 
// @param {url} /^(?:https?:\/\/)?(?:www\.)?([^\/]+)/
// @returns {string}
function shortenURL(url) {
    try {
        const parsedUrl = new URL(url);
        const domain = parsedUrl.hostname;
    } catch (error) {
        console.error("Invalid URL:", error);
        return null;
    }

    if (str.split('.')[0] == "github") {

    } else if (str.split('.')[0] == "facebook") {

    } else {
        const regex = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)/;
        const match = url.match(regex);
        return match ? match[1] : null;
    }
}

// Example usage:
console.log(shortenURL('github.com/truongd3/TabOrganizerExtension/issues/new'));
console.log(shortenURL('google.com/search?q=what+is+love'));
console.log(shortenURL('facebook.com/reel/512527281604749'));

// Located in helper/getDomain.js
function getDomain(url) {
    // Use the URL constructor to parse the input URL
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.hostname; // Return the hostname (domain)
    } catch (error) {
        console.error('Invalid URL:', error);
        return null; // Return null for invalid URLs
    }
}

// Example usage:
console.log(getDomain('https://github.com/truongd3/TabOrganizerExtension/issues/new')); // Output: 'github.com'
console.log(getDomain('http://google.com/search?q=what+is+love')); // Output: 'google.com'
console.log(getDomain('http://facebook.com/reel/512527281604749')); // Output: 'facebook.com'
