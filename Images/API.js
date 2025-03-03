async function hello() {
    try {
        let response = await fetch("https://newsapi.org/v2/everything?q=agriculture AND farming &from=2024-03-22&sortBy=publishedAt&apiKey=3c175ff0a06942b7a2d996d6acfc8d3e");
        let data = await response.json();
        if (response.ok) {
            for (let i = 0; i < data.articles.length; i++) {
                let ans2 = data.articles[i].urlToImage;
                let ans3 = data.articles[i].description;
                console.log(ans2);
                console.log(ans3);

                // Create container div for each item
                let itemContainer = document.createElement("div");
                itemContainer.classList.add("item-container");

                // Create image element and set its source, width, and height
                let image = document.createElement("img");
                image.src = ans2;
                image.classList.add("item-image");

                // Create paragraph element for description
                let description = document.createElement("p");
                description.classList.add("item-description");
                description.textContent = ans3;

                // Append image and description to the container
                itemContainer.appendChild(image);
                itemContainer.appendChild(description);

                // Append the container to the header
                let header = document.getElementById("header");
                header.appendChild(itemContainer);
            }
        }
    } catch (e) {
        console.log(e);
    }
}

hello();