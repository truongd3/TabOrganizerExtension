const handleFacebookURL = require("../../../src/helper/handle-url/handleFacebookURL.js");

describe("handleFacebookURL", () => {
    test("returns null for invalid URL", () => {
        const url = "invalid-url";
        const result = handleFacebookURL(url);
        expect(result).toBe(null);
    });

    test("returns domain when there is no path after the domain", () => {
        const url = 'https://www.facebook.com/';
        const result = handleFacebookURL(url);
        expect(result).toBe('facebook.com');
    });

    test('returns domain with one segment after slash when path is present', () => {
        const url = 'https://www.facebook.com/abcxyz';
        const result = handleFacebookURL(url);
        expect(result).toBe('facebook.com/abcxyz');
    });

    test('should return domain for URL without www', () => {
        const url = 'https://facebook.com/abcxyz';
        const result = handleFacebookURL(url);
        expect(result).toBe('facebook.com/abcxyz');
    });

    test('should return domain for URL with http', () => {
        const url = 'http://www.facebook.com/abcxyz';
        const result = handleFacebookURL(url);
        expect(result).toBe('facebook.com/abcxyz');
    });

    test('should return domain when URL has no scheme (http/https)', () => {
        const url = 'facebook.com/abcxyz';
        const result = handleFacebookURL(url);
        expect(result).toBe('facebook.com/abcxyz');
    });
});
