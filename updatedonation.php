<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $id = $_POST['id'];
    $status = $_POST['status'];

    $sql = "UPDATE donations SET status = '$status' WHERE id = $id";

    if ($conn->query($sql) === TRUE) {
        echo "Donation status updated to $status.";
    } else {
        echo "Error: " . $conn->error;
    }
    $conn->close();
}
?>