<?php
include 'config.php';

$result = $conn->query("SELECT * FROM volunteers ORDER BY id DESC");
$data = [];
while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
$conn->close();
?>
