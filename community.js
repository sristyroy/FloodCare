document.addEventListener("DOMContentLoaded", function() {
    loadPosts();

    document.getElementById("postBtn").addEventListener("click", function() {
        let category = document.getElementById("category").value;
        let message = document.getElementById("message").value.trim();

        if (message === "") {
            alert("Please enter a message before posting.");
            return;
        }

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "submitpost.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function() {
            if (this.status === 200) {
                document.getElementById("message").value = ""; 
                loadPosts(); 
            }
        };
        xhr.send(`category=${category}&message=${encodeURIComponent(message)}`);
    });

    document.getElementById("filterCategory").addEventListener("change", function() {
        loadPosts();
    });
});

function loadPosts() {
    let category = document.getElementById("filterCategory").value;
    let xhr = new XMLHttpRequest();
    xhr.open("GET", "fetch_posts.php?category=" + category, true);
    xhr.onload = function() {
        if (this.status === 200) {
            document.getElementById("communityPosts").innerHTML = this.responseText;
        }
    };
    xhr.send();
}