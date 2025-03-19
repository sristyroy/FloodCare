document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("volunteerForm").addEventListener("submit", function(e) {
        e.preventDefault();

        let name = document.getElementById("name").value.trim();
        let phone = document.getElementById("phone").value.trim();
        let skills = document.getElementById("skills").value;

        if (name === "" || phone === "") {
            alert("Please fill in all fields.");
            return;
        }

        let xhr = new XMLHttpRequest();
        xhr.open("POST", "submitvolunteer.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onload = function() {
            if (this.status === 200) {
                document.getElementById("volunteerForm").reset();
                document.getElementById("successMessage").classList.remove("d-none");
                setTimeout(() => {
                    document.getElementById("successMessage").classList.add("d-none");
                }, 5000);
            }
        };
        xhr.send(`name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phone)}&skills=${encodeURIComponent(skills)}`);
    });
});