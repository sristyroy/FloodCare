document.addEventListener("DOMContentLoaded", function () {
    // Load Navbar
    fetch("navbar.html")
        .then(response => response.text())
        .then(data => document.getElementById("navbar-placeholder").innerHTML = data)
        .then(() => addLanguageToggleFunctionality());

    // Load Footer
    fetch("footer.html")
        .then(response => response.text())
        .then(data => document.getElementById("footer-placeholder").innerHTML = data);
});

function addLanguageToggleFunctionality() {
    const switchButton = document.getElementById("languageSwitch");

    switchButton.addEventListener("change", function () {
        if (this.checked) {
            translateToEnglish();
        } else {
            translateToBangla();
        }
    });
}

function translateToBangla() {
    document.body.classList.add("bangla-text");

    // Example: Replacing text manually (can be replaced with an API)
    document.querySelectorAll(".nav-link").forEach(el => {
        if (el.textContent.trim() === "Home") el.textContent = "হোম";
        if (el.textContent.trim() === "About") el.textContent = "সম্পর্কে";
        if (el.textContent.trim() === "Relief & Support") el.textContent = "ত্রাণ ও সহায়তা";
        if (el.textContent.trim() === "Flood Information") el.textContent = "বন্যা তথ্য";
        if (el.textContent.trim() === "News") el.textContent = "সংবাদ";
        if (el.textContent.trim() === "Contact") el.textContent = "যোগাযোগ";
    });
}

function translateToEnglish() {
    document.body.classList.remove("bangla-text");

    // Revert back to English
    document.querySelectorAll(".nav-link").forEach(el => {
        if (el.textContent.trim() === "হোম") el.textContent = "Home";
        if (el.textContent.trim() === "সম্পর্কে") el.textContent = "About";
        if (el.textContent.trim() === "ত্রাণ ও সহায়তা") el.textContent = "Relief & Support";
        if (el.textContent.trim() === "বন্যা তথ্য") el.textContent = "Flood Information";
        if (el.textContent.trim() === "সংবাদ") el.textContent = "News";
        if (el.textContent.trim() === "যোগাযোগ") el.textContent = "Contact";
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const reliefData = document.getElementById("reliefData");
    const searchBtn = document.getElementById("searchBtn");
    const searchLocation = document.getElementById("searchLocation");
    const searchType = document.getElementById("searchType");
    const addReliefBtn = document.getElementById("addReliefBtn");
    const addLocation = document.getElementById("addLocation");
    const addType = document.getElementById("addType");
    const addQuantity = document.getElementById("addQuantity");

    let reliefList = [
        { location: "Dhaka", type: "Food", quantity: 500, status: "Ongoing" },
        { location: "Chattogram", type: "Water", quantity: 1000, status: "Completed" },
        { location: "Sylhet", type: "Medical", quantity: 300, status: "Ongoing" },
        { location: "Barisal", type: "Shelter", quantity: 200, status: "Planned" }
    ];

    // Function to display relief distribution data
    function displayReliefData(filterLocation = "", filterType = "All") {
        reliefData.innerHTML = ""; // Clear table

        reliefList
            .filter(relief => 
                (filterLocation === "" || relief.location.toLowerCase().includes(filterLocation.toLowerCase())) &&
                (filterType === "All" || relief.type === filterType)
            )
            .forEach((relief, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${relief.location}</td>
                    <td>${relief.type}</td>
                    <td>${relief.quantity}</td>
                    <td>${relief.status}</td>
                `;
                reliefData.appendChild(row);
            });
    }

    // Search relief data
    searchBtn.addEventListener("click", function () {
        displayReliefData(searchLocation.value, searchType.value);
    });

    // Add new relief distribution
    addReliefBtn.addEventListener("click", function () {
        let location = addLocation.value.trim();
        let type = addType.value;
        let quantity = addQuantity.value.trim();

        if (location !== "" && quantity !== "") {
            let newRelief = {
                location: location,
                type: type,
                quantity: Number(quantity),
                status: "Ongoing"
            };
            reliefList.unshift(newRelief);
            addLocation.value = "";
            addQuantity.value = "";
            displayReliefData(searchLocation.value, searchType.value);
        }
    });

    // Initial display of relief data
    displayReliefData();
});

// Sample flood-affected areas & relief points in Bangladesh
const reliefLocations = [
    { lat: 23.8103, lng: 90.4125, name: "Dhaka - Relief Center 1" },
    { lat: 24.3636, lng: 88.6241, name: "Rajshahi - Medical Camp" },
    { lat: 22.3569, lng: 91.7832, name: "Chattogram - Shelter & Food Supply" },
    { lat: 24.8949, lng: 91.8687, name: "Sylhet - Emergency Relief Point" }
];

let map;

// Initialize Google Map
function initMap() {
    map = new google.maps.Map(document.getElementById("map"), {
        center: { lat: 23.685, lng: 90.3563 }, // Centered in Bangladesh
        zoom: 7,
    });

    // Add relief distribution points
    reliefLocations.forEach(location => {
        const marker = new google.maps.Marker({
            position: { lat: location.lat, lng: location.lng },
            map: map,
            title: location.name
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `<strong>${location.name}</strong><br>Relief services available here.`
        });

        marker.addListener("click", () => {
            infoWindow.open(map, marker);
        });
    });

    // Fetch live flood alerts
    fetchFloodAlerts();
}

// Fetch real-time flood updates (Simulated API call)
function fetchFloodAlerts() {
    const floodUpdates = document.getElementById("floodUpdates");

    // Simulated API Response (Replace with real API call)
    let liveFloodData = [
        { location: "Kurigram", severity: "High", update: "Severe flooding reported, evacuation needed." },
        { location: "Sunamganj", severity: "Moderate", update: "Roads blocked due to water levels rising." },
        { location: "Jamalpur", severity: "Low", update: "Minor flooding, relief distribution ongoing." }
    ];

    floodUpdates.innerHTML = ""; // Clear previous updates

    liveFloodData.forEach(flood => {
        let listItem = document.createElement("li");
        listItem.className = `list-group-item list-group-item-${flood.severity === "High" ? "danger" : flood.severity === "Moderate" ? "warning" : "info"}`;
        listItem.innerHTML = `<strong>${flood.location}</strong>: ${flood.update}`;
        floodUpdates.appendChild(listItem);
    });
}

// Load Google Maps
window.initMap = initMap;

// Function to fetch live flood alerts (Simulated API call)
function fetchFloodAlerts() {
    const alertSection = document.getElementById("alertSection");

    // Simulated API Response (Replace with real API call)
    let liveAlerts = [
        { location: "Sirajganj", severity: "High", message: "Evacuate immediately, severe flooding expected!" },
        { location: "Sylhet", severity: "Moderate", message: "Heavy rainfall predicted, be prepared." },
        { location: "Sunamganj", severity: "Low", message: "Water levels rising, stay cautious." }
    ];

    alertSection.innerHTML = ""; // Clear previous alerts

    liveAlerts.forEach(alert => {
        let alertDiv = document.createElement("div");
        alertDiv.className = `alert alert-${alert.severity === "High" ? "danger" : alert.severity === "Moderate" ? "warning" : "info"}`;
        alertDiv.innerHTML = `<strong>${alert.location}:</strong> ${alert.message}`;
        alertSection.appendChild(alertDiv);
    });
}

// Auto-refresh alerts every 10 seconds
setInterval(fetchFloodAlerts, 10000);

// Load alerts on page load
fetchFloodAlerts();

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("donationForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        let formData = new FormData(this);

        fetch("submitdonation.php", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                let donationPopup = new bootstrap.Modal(document.getElementById("donationPopup"));
                donationPopup.show();
                document.getElementById("donationForm").reset(); // Reset form after success
            } else {
                alert("Error: " + data.error);
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
    });
});