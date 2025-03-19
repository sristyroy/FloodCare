document.addEventListener("DOMContentLoaded", function () {
    fetch("fetchresources.php")
        .then(response => response.json())
        .then(data => {
            let resourceList = document.getElementById("resourceList");
            resourceList.innerHTML = "";
            data.forEach(resource => {
                resourceList.innerHTML += `
                    <tr>
                        <td>${resource.id}</td>
                        <td>${resource.title}</td>
                        <td>${resource.description}</td>
                        <td><button class="btn btn-danger" onclick="removeResource(${resource.id})">Delete</button></td>
                    </tr>
                `;
            });
        });
});

function removeResource(id) {
    if (confirm("Are you sure you want to delete this resource?")) {
        fetch("updateresource.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `id=${id}`
        })
        .then(response => response.text())
        .then(() => location.reload());
    }
}