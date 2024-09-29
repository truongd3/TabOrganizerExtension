document.addEventListener("DOMContentLoaded", function () { 
    const searchBtn = document.getElementById("searchBtn");
    const tabQueryInput = document.getElementById("tabQuery");
    const tabList = document.getElementById("tab-list");

    searchBtn.addEventListener("click", function () {
        const searchQuery = tabQueryInput.value.toLowerCase(); 

        chrome.tabs.query({}, function (tabs) {
            tabList.innerHTML = ""; // Clear any previous results

            tabs.forEach(function (tab) {
                if (tab.url.toLowerCase().includes(searchQuery)) { // If tab URL matches the search query
                    const listItem = document.createElement("li"); // Create a list item
                    listItem.innerText = `${tab.title} = ${tab.url}`;

                    listItem.addEventListener("click", function () { // Move to that tab when clicked
                        chrome.tabs.update(tab.id, { active: true });
                    });

                    tabList.appendChild(listItem); // Append the list item to list
                }
            });
        });
    });
});

// chrome.tabs.query({}, (tabs) => {
//     const tabsList = document.createElement('ul');
  
//     for (let tab of tabs) {
//       const listItem = document.createElement('li');
//       listItem.innerText = tab.title;
//       tabsList.append(listItem);
//     }
  
//     document.body.append(tabsList);
//   });