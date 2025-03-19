document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;

    // Admin auto-login (no password required)
    if (email === "admin@floodcare.com") {
        password = ""; // Send empty password
    }

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "loginprocess.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onload = function() {
        if (this.responseText.includes("admin")) {
            window.location.href = "admindashboard.html";
        } else if (this.responseText.includes("user")) {
            window.location.href = "index.html";
        } else {
            alert(this.responseText);
        }
    };
    xhr.send(`email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}`);
});