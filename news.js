// Function to fetch news and update the news container
function fetchNews() {
    fetch('fetch_news.php')
        .then(response => response.json())
        .then(newsData => {
            const newsContainer = document.getElementById('news-container');
            newsContainer.innerHTML = ''; // Clear existing news

            // Loop through the fetched news and append them to the news container
            newsData.forEach(news => {
                const newsCard = document.createElement('div');
                newsCard.classList.add('col');
                newsCard.innerHTML = `
                    <div class="card h-100">
                        <img src="${news.image}" class="card-img-top" alt="${news.title}">
                        <div class="card-body">
                            <h5 class="card-title">${news.title}</h5>
                            <p class="card-text">${news.description}</p>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">${new Date(news.created_at).toLocaleString()}</small>
                        </div>
                    </div>
                `;
                newsContainer.appendChild(newsCard);
            });
        })
        .catch(error => console.error('Error fetching news:', error));
}

// Fetch news when the page loads
window.onload = fetchNews;

// Poll the server every 60 seconds (60000ms) to get the latest news
setInterval(fetchNews, 60000);