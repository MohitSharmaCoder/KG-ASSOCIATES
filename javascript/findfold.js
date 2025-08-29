

///////////////////////////////////////////////////////////1111111111111111111111111111111111
// Sample nested data
const data = {
  name: "root",
  type: "folder",
  children: [
    {
      name: "file1",
      type: "folder",
      children: [
        {
          name: "underfile1",
          type: "folder",
          children: [
            {
              name: "underfile2",
              type: "folder",
              children: [
                {
                  name: "underfile3 (Open with Tallyprime 3.1)",
                  type: "folder",
                  children: [
                    { name: "Open with Tally Prime 6.1", type: "file" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "file2",
      type: "folder",
      children: [
        {
          name: "underfileA",
          type: "folder",
          children: [
            {
              name: "underfileB",
              type: "folder",
              children: [
                {
                  name: "underfileC (Open with Tallyprime 6.1)",
                  type: "folder",
                  children: [
                    { name: "Report_Jan2025.pdf", type: "file" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: "file3",
      type: "folder",
      children: [
        {
          name: "projectX",
          type: "folder",
          children: [
            {
              name: "module1",
              type: "folder",
              children: [
                {
                  name: "docs (Open with Tallyerp 9)",
                  type: "folder",
                  children: [
                    { name: "Readme.txt", type: "file" },
                    { name: "Instructions.docx", type: "file" }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
};

const searchInput = document.getElementById("search");
const searchResults = document.getElementById("searchResults");

// Recursive search
function searchFiles(query, node, path = []) {
  let results = [];

  if (node.name.toLowerCase().includes(query.toLowerCase())) {
    results.push([...path, node.name].join(" → "));
  }

  if (node.children) {
    node.children.forEach(child => {
      results = results.concat(searchFiles(query, child, [...path, node.name]));
    });
  }

  return results;
}

// Handle search
searchInput.addEventListener("input", e => {
  const query = e.target.value.trim();
  searchResults.innerHTML = "";

  if (query === "") return;

  const results = searchFiles(query, data);

  if (results.length > 0) {
    results.forEach(r => {
      const div = document.createElement("div");
      div.textContent = "🔍 " + r;
      searchResults.appendChild(div);
    });
  } else {
    searchResults.textContent = "No matches found.";
  }
});
