<?php
include 'config.php';

$query = "SELECT DISTINCT Station_Names FROM flooddata";
$result = $conn->query($query);

$stations = [];
while ($row = $result->fetch_assoc()) {
    $stations[] = $row['Station_Names'];
}

header('Content-Type: application/json');
echo json_encode($stations);
?>