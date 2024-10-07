import moveToTab from "./helper/moveToTab.js";
import postGeminiPrompt from "./utils/gemini.js";

document.addEventListener("DOMContentLoaded", function () { 
    const searchBtnURL = document.getElementById("searchBtnURL");
    const tabQueryURL = document.getElementById("tabQueryURL");
    const tabList = document.getElementById("tabList");

    searchBtnURL.addEventListener("click", function () {
        const tabQueryURLInput = tabQueryURL.value.toLowerCase(); 

        chrome.tabs.query({}, function (tabs) {
            tabList.innerHTML = ""; // Clear previous results

            tabs.forEach(function (tab) {
                // If URL includeds search query
                if (tab.url.toLowerCase().includes(tabQueryURLInput)) {
                    const listItem = document.createElement("li");
                    listItem.innerText = `${tab.title} = ${tab.url}`;

                    listItem.addEventListener("click", function () {
                        moveToTab(tab.id);
                    });

                    tabList.appendChild(listItem);
                }
            });
        });
    });

    const tabQueryPrompt = document.getElementById("tabQueryPrompt");
    const searchBtnPrompt = document.getElementById("searchBtnPrompt");
    
    searchBtnPrompt.addEventListener("click", async function () {
      const tabQueryPromptInput = tabQueryPrompt.value.toLowerCase();
  
      chrome.tabs.query({}, async function (tabs) {
        tabList.innerHTML = ""; // Clear any previous results
        const tabTitle = tabs.map((tab) => {return { [tab.title]: tab.url}});
        const predictedTab = await postGeminiPrompt(tabQueryPromptInput, tabTitle);
        tabs.forEach(function (tab) {
          if (predictedTab.some(tabObj => tabObj.key === tab.title && tabObj.value === tab.url)) {
            // If tab title and URL matches the search query
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
