document.addEventListener("DOMContentLoaded", function () {
    fetch("fetchcommunity.php")
        .then(response => response.json())
        .then(data => {
            let communityList = document.getElementById("communityList");
            communityList.innerHTML = "";
            data.forEach(post => {
                communityList.innerHTML += `
                    <tr>
                        <td>${post.id}</td>
                        <td>${post.name}</td>
                        <td>${post.message}</td>
                        <td><button class="btn btn-danger" onclick="removePost(${post.id})">Delete</button></td>
                    </tr>
                `;
            });
        });
});

function removePost(id) {
    if (confirm("Are you sure you want to delete this post?")) {
        fetch("updatecommunity.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `id=${id}`
        })
        .then(response => response.text())
        .then(() => location.reload());
    }
}