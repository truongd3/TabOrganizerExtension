const handleFacebookURL = require("../../../src/helper/handle-url/handleFacebookURL.js");

describe("handleFacebookURL", () => {
    test("returns null for invalid URL", () => {
        const url = "invalid-url";
        const result = handleFacebookURL(url);
        expect(result).toBe(null);
    });

    test("returns domain when there is no path after the domain", () => {
        const url = "https://www.facebook.com/";
        const result = handleFacebookURL(url);
        expect(result).toBe("facebook.com");
    });

    test("returns domain with one segment after slash when path is present", () => {
        const url1 = 'https://www.facebook.com/abcxyz';
        const result1 = handleFacebookURL(url1);
        expect(result1).toBe('facebook.com/abcxyz');

        const url2 = 'https://www.facebook.com/abcxyz/def';
        const result2 = handleFacebookURL(url2);
        expect(result2).toBe('facebook.com/abcxyz');
    });

    test("returns domain for URL with http", () => {
        const url = 'http://www.facebook.com/abcxyz';
        const result = handleFacebookURL(url);
        expect(result).toBe('facebook.com/abcxyz');
    });

    test("returns domain for URL without http/https", () => {
        const url = 'facebook.com/abcxyz';
        const result = handleFacebookURL(url);
        expect(result).toBe('facebook.com/abcxyz');
    });

    test("returns domain for URL without www", () => {
        const url = 'https://facebook.com/abcxyz';
        const result = handleFacebookURL(url);
        expect(result).toBe('facebook.com/abcxyz');
    });
});
