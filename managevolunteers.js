document.addEventListener("DOMContentLoaded", function () {
    fetch("fetchvolunteers.php")
        .then(response => response.json())
        .then(data => {
            let volunteerList = document.getElementById("volunteerList");
            volunteerList.innerHTML = "";
            data.forEach(volunteer => {
                volunteerList.innerHTML += `
                    <tr>
                        <td>${volunteer.id}</td>
                        <td>${volunteer.name}</td>
                        <td>${volunteer.phone}</td>
                        <td>${volunteer.skills}</td>
                        <td><button class="btn btn-danger" onclick="removeVolunteer(${volunteer.id})">Delete</button></td>
                    </tr>
                `;
            });
        });
});

function removeVolunteer(id) {
    if (confirm("Are you sure you want to delete this volunteer?")) {
        fetch("updatevolunteer.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `id=${id}`
        })
        .then(response => response.text())
        .then(() => location.reload());
    }
}