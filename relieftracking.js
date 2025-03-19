document.addEventListener("DOMContentLoaded", function () {
    loadReliefData();

    document.getElementById("searchBtn").addEventListener("click", function () {
        loadReliefData();
    });
});

function loadReliefData() {
    let searchLocation = document.getElementById("searchLocation").value.toLowerCase();
    let searchType = document.getElementById("searchType").value;

    fetch("relieftracking.php")
        .then(response => response.json())
        .then(data => {
            let tableBody = document.getElementById("reliefData");
            tableBody.innerHTML = "";

            data.forEach(item => {
                if ((searchType === "All" || item.relief_type === searchType) &&
                    (searchLocation === "" || item.location.toLowerCase().includes(searchLocation))) {
                    
                    let row = `<tr>
                        <td>${item.location}</td>
                        <td>${item.relief_type}</td>
                        <td>${item.distributed}</td>
                        <td><span class="badge bg-success">${item.status}</span></td>
                    </tr>`;
                    tableBody.innerHTML += row;
                }
            });
        })
        .catch(error => console.error("Error loading data:", error));
}