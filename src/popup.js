import moveToTab from "./helper/moveToTab.js";

document.addEventListener("DOMContentLoaded", function () { 
    const searchBtn = document.getElementById("searchBtn");
    const tabQuery = document.getElementById("tabQuery");
    const tabList = document.getElementById("tab-list");

    searchBtn.addEventListener("click", function () {
        const tabQueryInput = tabQuery.value.toLowerCase(); 

        chrome.tabs.query({}, function (tabs) {
            tabList.innerHTML = ""; // Clear any previous results

            tabs.forEach(function (tab) {
                if (tab.url.toLowerCase().includes(searchQueryInput)) { // If tab URL matches the search query
                    const listItem = document.createElement("li"); // Create a list item
                    listItem.innerText = `${tab.title} = ${tab.url}`;

                    listItem.addEventListener("click", function () { // Move to that tab when clicked
                        moveToTab(tab.id);
                    });

                    tabList.appendChild(listItem); // Append the list item to list
                }
            });
        });
    });
});