// script.js
const categorySelect = document.getElementById("categorySelect");
const generateButton = document.getElementById("generateButton");
const quoteText = document.getElementById("quoteText");
const authorText = document.getElementById("authorText");
const favoriteButton = document.getElementById("favoriteButton");
const favoritesList = document.getElementById("favoritesList");
const copyButton = document.getElementById("copyButton");
////////////////////////////////////////////////////
const colorPicker = document.getElementById('colorPicker');
const container1 = document.getElementById('favoritesContainer');
const container2 = document.getElementById('quoteContainer');

colorPicker.addEventListener('input', function() {
    const selectedColor = colorPicker.value;
    container1.style.backgroundColor = selectedColor;
    container2.style.backgroundColor = selectedColor;
   

});
//////////////////////////////////////////////////
let favoriteQuotes = [];

generateButton.addEventListener("click", generateQuote);
favoriteButton.addEventListener("click", addToFavorites);
copyButton.addEventListener("click", copyFavorites);
categorySelect.addEventListener("change", generateQuote);

function generateQuote() {
    const selectedCategory = categorySelect.value;
    let apiUrl = "https://api.quotable.io/random";

    if (selectedCategory) {
        apiUrl += `?tags=${selectedCategory}`;
    }

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            quoteText.textContent = data.content;
            authorText.textContent = `- ${data.author}`;
        })
        .catch(error => console.error(error));
}

function addToFavorites() {
    const currentQuote = `${quoteText.textContent} - ${authorText.textContent}`;
    if (currentQuote && !favoriteQuotes.includes(currentQuote)) {
        favoriteQuotes.push(currentQuote);
        const listItem = document.createElement("li");
        listItem.textContent = currentQuote;
        favoritesList.appendChild(listItem);
    }
}

function copyFavorites() {
    const textToCopy = favoriteQuotes.join("\n");
    if (textToCopy) {
        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                alert("Favorites copied to clipboard!");
            })
            .catch(error => console.error(error));
    }
}
