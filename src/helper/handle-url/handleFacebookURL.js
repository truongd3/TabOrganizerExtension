const validURL = require("./validURL.js");

// Shorten Facebook URL
// @param {url} "...facebook.com..."
// @returns {string} [facebook.com, facebook.com/abcxyz]
function handleFacebookURL(url) {
    if (!validURL(url)) return null;

    const regex = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)(\/[^\/]*)?/;
    const match = url.match(regex);

    if (!match) return null;
    const domain = match[1];

    if (match[2] && match[2].length > 1) {
        const path = match[2];
        return domain + path;
    }
    else return domain;
}

module.exports = handleFacebookURL;