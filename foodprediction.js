document.addEventListener("DOMContentLoaded", function () {
    const zillaSelect = document.getElementById("zillaSelect");
    const predictionResult = document.getElementById("predictionResult");

    function fetchFloodPrediction() {
        const selectedZilla = zillaSelect.value;
        fetch(`http://127.0.0.1:5000/predictflood?station=${selectedZilla}`)
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    predictionResult.innerHTML = `<p class="text-danger">${data.error}</p>`;
                    return;
                }

                let resultHTML = `<table class="table table-bordered">
                                    <thead class="table-danger">
                                        <tr>
                                            <th>Year</th>
                                            <th>Flood Probability (%)</th>
                                        </tr>
                                    </thead>
                                    <tbody>`;

                data.forEach(row => {
                    resultHTML += `<tr>
                                    <td>${row.year}</td>
                                    <td>${row.flood_probability}%</td>
                                </tr>`;
                });

                resultHTML += `</tbody></table>`;
                predictionResult.innerHTML = resultHTML;
            })
            .catch(error => {
                predictionResult.innerHTML = `<p class="text-danger">Error fetching data</p>`;
                console.error("Error fetching flood prediction:", error);
            });
    }

    zillaSelect.addEventListener("change", fetchFloodPrediction);
    fetchFloodPrediction(); // Fetch on page load
});