<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_FILES["csv_file"])) {
    $file = $_FILES["csv_file"]["tmp_name"];
    $handle = fopen($file, "r");

    if ($handle !== FALSE) {
        fgetcsv($handle); // Skip header row
        while (($data = fgetcsv($handle, 1000, ",")) !== FALSE) {
            $stmt = $conn->prepare("INSERT INTO flood_data 
                (district, year, month, max_temp, min_temp, rainfall, humidity, wind_speed, cloud_coverage, sunshine_hours, flood_risk) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");

            $stmt->bind_param("sissdddddds", 
                $data[0], $data[1], $data[2], $data[3], $data[4], $data[5], $data[6], $data[7], $data[8], $data[9], $data[10]);

            $stmt->execute();
        }
        fclose($handle);
        echo "CSV Data Uploaded Successfully!";
    } else {
        echo "Error opening file.";
    }
} else {
    echo "Invalid request.";
}
?>