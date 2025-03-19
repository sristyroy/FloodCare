document.addEventListener("DOMContentLoaded", function () {
    fetchDonations();
});

function fetchDonations() {
    fetch("fetchdonations.php")
        .then(response => response.json())
        .then(data => {
            let donationsTable = document.getElementById("donationsTable");
            donationsTable.innerHTML = "";
            data.forEach(donation => {
                donationsTable.innerHTML += `
                    <tr>
                        <td>${donation.id}</td>
                        <td>${donation.name}</td>
                        <td>${donation.email}</td>
                        <td>BDT ${donation.amount}</td>
                        <td>
                            <span class="badge bg-${donation.status === 'Approved' ? 'success' : donation.status === 'Rejected' ? 'danger' : 'warning'}">
                                ${donation.status}
                            </span>
                        </td>
                        <td>
                            <button class="btn btn-success btn-sm" onclick="updateDonation(${donation.id}, 'Approved')">Approve</button>
                            <button class="btn btn-danger btn-sm" onclick="updateDonation(${donation.id}, 'Rejected')">Reject</button>
                        </td>
                    </tr>
                `;
            });
        });
}

function updateDonation(id, status) {
    if (confirm(`Are you sure you want to ${status.toLowerCase()} this donation?`)) {
        fetch("updatedonation.php", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `id=${id}&status=${status}`
        })
        .then(response => response.text())
        .then(() => fetchDonations()); // Refresh list after update
    }
}