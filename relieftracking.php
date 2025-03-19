<?php
include 'config.php';

$sql = "SELECT * FROM relief_distribution WHERE status = 'Approved' ORDER BY id DESC";
$result = $conn->query($sql);

$data = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
}

echo json_encode($data);
$conn->close();
?>