<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $message = $_POST['message'];

    $sql = "INSERT INTO community_posts (name, message) VALUES ('$name', '$message')";
    
    if ($conn->query($sql) === TRUE) {
        echo "Post added!";
    } else {
        echo "Error: " . $conn->error;
    }
}

$conn->close();
?>