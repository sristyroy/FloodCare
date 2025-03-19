<?php
require 'config.php';

header('Content-Type: application/json');

if (isset($_GET['station']) && isset($_GET['page'])) {
    $station = $_GET['station'];
    $page = intval($_GET['page']);
    $limit = 10;
    $offset = ($page - 1) * $limit;

    // Fetch flood data for the selected station with pagination
    $stmt = $conn->prepare("SELECT Year, Month, Max_Temp, Min_Temp, Rainfall, Relative_Humidity, Wind_Speed, Cloud_Coverage, Bright_Sunshine, Flood 
                            FROM flooddata 
                            WHERE Station_Names = ? 
                            ORDER BY Year DESC 
                            LIMIT ? OFFSET ?");
    $stmt->bind_param("sii", $station, $limit, $offset);
    $stmt->execute();
    $result = $stmt->get_result();

    $floodData = [];
    while ($row = $result->fetch_assoc()) {
        $floodData[] = $row;
    }

    echo json_encode($floodData);
} else {
    echo json_encode(["error" => "Invalid request"]);
}
?>