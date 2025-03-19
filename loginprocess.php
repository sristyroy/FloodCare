<?php
session_start();
include 'config.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = isset($_POST['password']) ? $_POST['password'] : '';

    // Admin auto-login (No password required)
    if ($email === "admin@floodcare.com") {
        $_SESSION['user_id'] = 1; // Dummy ID for admin
        $_SESSION['role'] = "admin";
        echo "admin";
        exit;
    }

    // Check user in database
    $stmt = $conn->prepare("SELECT * FROM users WHERE email = ?");
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    $stmt->close();

    if ($user) {
        if (password_verify($password, $user['password'])) {
            $_SESSION['user_id'] = $user['id'];
            $_SESSION['role'] = $user['role'];

            if ($user['role'] == 'admin') {
                echo "admin";
            } else {
                echo "user";
            }
        } else {
            echo "Invalid email or password!";
        }
    } else {
        echo "User not found!";
    }
}

$conn->close();
?>