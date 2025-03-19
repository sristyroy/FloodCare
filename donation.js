document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("donationForm").addEventListener("submit", function (e) {
        e.preventDefault();

        let name = document.getElementById("name").value.trim();
        let email = document.getElementById("email").value.trim();
        let amount = document.getElementById("amount").value.trim();

        if (name === "" || email === "" || amount === "" || amount < 10) {
            alert("Please fill in all fields correctly.");
            return;
        }

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "submitdonation.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function () {
            if (this.status === 200) {
                document.getElementById("donationForm").reset();
                document.getElementById("successMessage").classList.remove("d-none");
                setTimeout(() => {
                    document.getElementById("successMessage").classList.add("d-none");
                }, 5000);
            }
        };
        xhr.send(`name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}&amount=${encodeURIComponent(amount)}`);
    });
});