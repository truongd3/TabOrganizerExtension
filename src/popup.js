import moveToTab from "./helper/moveToTab.js";

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
    
    searchBtnPrompt.addEventListener("click", function () {
        // Added later by Thai
        console.log("Prompt is Entered");
    });
});