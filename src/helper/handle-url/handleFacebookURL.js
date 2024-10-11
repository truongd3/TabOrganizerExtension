// Shorten Facebook URL
// @param {url} "...facebook.com..."
// @returns {string} [facebook.com, facebook.com/abcxyz]
export default function handleFacebookURL(url) {
    try {
        const validatedURL = new URL(url);
    } catch (error) {
        return null;
    }

    const regex = /^(?:https?:\/\/)?(?:www\.)?([^\/]+)(\/[^\/]*)?/;
    const match = url.match(regex);
    console.log(match);

    if (!match) return null;
    const domain = match[1];

    if (match[2] && match[2].length > 1) {
        const path = match[2];
        return domain + path;
    }
    else return domain;
}

console.log(handleFacebookURL("invalid-url"));
console.log(handleFacebookURL("facebook.com/abc"))
console.log(handleFacebookURL("facebook.com"))
