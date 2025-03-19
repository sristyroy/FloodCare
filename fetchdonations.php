<?php
include 'config.php';

$sql = "SELECT * FROM donations";
$result = $conn->query($sql);

$donations = [];
while ($row = $result->fetch_assoc()) {
    $donations[] = $row;
}

$conn->close();
echo json_encode($donations);
?>