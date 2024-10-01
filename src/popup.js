import moveToTab from "./helper/moveToTab.js";
import postGeminiPrompt from "./utils/gemini.js";

document.addEventListener("DOMContentLoaded", function () {
  const searchBtn = document.getElementById("searchBtn");
  const tabQuery = document.getElementById("tabQuery");
  const tabList = document.getElementById("tab-list");

  searchBtn.addEventListener("click", async function () {
    const tabQueryInput = tabQuery.value.toLowerCase();

    chrome.tabs.query({}, async function (tabs) {
      tabList.innerHTML = ""; // Clear any previous results
      const tabTitle = tabs.map((tab) => tab.title);
      console.log(tabTitle)
      const predictedTab = await postGeminiPrompt(tabQueryInput, tabTitle);
      console.log(predictedTab);
      tabs.forEach(function (tab) {
        if (predictedTab.includes(tab.title)) {
          // If tab URL matches the search query
          const listItem = document.createElement("li"); // Create a list item
          listItem.innerText = `${tab.title}`;

          listItem.addEventListener("click", async function () {
            // Move to that tab when clicked
            moveToTab(tab.id);
          });

          tabList.appendChild(listItem); // Append the list item to list
        }
      });
    });
  });
});
