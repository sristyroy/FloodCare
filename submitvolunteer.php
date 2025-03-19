<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $skills = $_POST['skills'];

    $sql = "INSERT INTO volunteers (name, phone, skills) VALUES ('$name', '$phone', '$skills')";
    
    if ($conn->query($sql) === TRUE) {
        echo "Volunteer registered!";
    } else {
        echo "Error: " . $conn->error;
    }
}

$conn->close();
?>