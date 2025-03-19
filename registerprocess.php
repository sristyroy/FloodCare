<?php
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullname = $_POST['fullname'];
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Define admin emails
    $adminEmails = ["admin@gmail.com", "admin@floodcare.com"];

    // Check if email is in admin list and set default password
    if (in_array($email, $adminEmails)) {
        $password = "Admin@123"; // Default password for admin
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $role = in_array($email, $adminEmails) ? 'admin' : 'user';

    $stmt = $conn->prepare("INSERT INTO users (fullname, email, password, role) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $fullname, $email, $hashedPassword, $role);

    if ($stmt->execute()) {
        echo "Registration successful!";
    } else {
        echo "Error: " . $conn->error;
    }

    $stmt->close();
    $conn->close();
}
?>