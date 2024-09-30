// Move to a specific tab
// @param {number} tabId - ID of the tab to activate
// @returns {void}
export default function moveToTab(tabId) {
    chrome.tabs.update(tabId, { active: true });
}