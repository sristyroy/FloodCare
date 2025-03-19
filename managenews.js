document.addEventListener("DOMContentLoaded", function () {
    fetch("fetchnews.php")
        .then(response => response.json())
        .then(data => {
            let newsList = document.getElementById("newsList");
            newsList.innerHTML = "";
            data.forEach(news => {
                newsList.innerHTML += `
                    <tr>
                        <td>${news.id}</td>
                        <td>${news.title}</td>
                        <td>${news.description}</td>
                        <td><img src="${news.image}" width="100"></td>
                        <td><button class="btn btn-danger" onclick="removeNews(${news.id})">Delete</button></td>
                    </tr>
                `;
            });
        });
});

function removeNews(id) {
    if (confirm("Are you sure you want to delete this news?")) {
        fetch("updatenews.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `id=${id}`
        })
        .then(response => response.text())
        .then(() => location.reload());
    }
}
