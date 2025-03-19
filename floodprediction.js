document.addEventListener("DOMContentLoaded", function () {
    const stationSelect = document.getElementById("stationSelect");
    const floodTable = document.getElementById("floodTable");
    const prevPage = document.getElementById("prevPage");
    const nextPage = document.getElementById("nextPage");
    const pageNumber = document.getElementById("pageNumber");

    let currentPage = 1;
    let currentStation = "";

    // Fetch available stations and populate the dropdown
    function fetchStations() {
        fetch("fetchstations.php")
            .then(response => response.json())
            .then(stations => {
                stationSelect.innerHTML = ""; // Clear existing options
                stations.forEach((station, index) => {
                    const option = document.createElement("option");
                    option.value = station;
                    option.textContent = station;
                    if (index === 0) {
                        option.selected = true; // Default to first station
                        currentStation = station;
                    }
                    stationSelect.appendChild(option);
                });
                fetchFloodData(); // Fetch data after populating stations
            })
            .catch(error => console.error("Error fetching stations:", error));
    }

    // Fetch flood data for selected station
    function fetchFloodData() {
        if (!currentStation) return;

        fetch(`fetchflooddata.php?station=${currentStation}&page=${currentPage}`)
            .then(response => response.json())
            .then(data => {
                floodTable.innerHTML = "";
                data.forEach(row => {
                    floodTable.innerHTML += `
                        <tr>
                            <td>${row.Year}</td>
                            <td>${row.Month}</td>
                            <td>${row.Max_Temp}°C</td>
                            <td>${row.Min_Temp}°C</td>
                            <td>${row.Rainfall} mm</td>
                            <td>${row.Relative_Humidity}%</td>
                            <td>${row.Wind_Speed} km/h</td>
                            <td>${row.Cloud_Coverage}</td>
                            <td>${row.Bright_Sunshine} hrs</td>
                            <td>${row.Flood}</td>
                        </tr>
                    `;
                });
            })
            .catch(error => console.error("Error fetching flood data:", error));
    }

    // Handle station selection change
    stationSelect.addEventListener("change", function () {
        currentStation = this.value;
        currentPage = 1;
        fetchFloodData();
    });

    // Handle pagination
    prevPage.addEventListener("click", function () {
        if (currentPage > 1) {
            currentPage--;
            pageNumber.textContent = `Page ${currentPage}`;
            fetchFloodData();
        }
    });

    nextPage.addEventListener("click", function () {
        currentPage++;
        pageNumber.textContent = `Page ${currentPage}`;
        fetchFloodData();
    });

    // Initialize by fetching stations first
    fetchStations();
});