<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $amount = $_POST['amount'];

    $stmt = $conn->prepare("INSERT INTO donations (name, email, amount) VALUES (?, ?, ?)");
    $stmt->bind_param("ssd", $name, $email, $amount);

    if ($stmt->execute()) {
        echo "Donation recorded successfully!";
    } else {
        echo "Error: " . $conn->error;
    }

    $stmt->close();
    $conn->close();
}
?>