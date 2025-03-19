<?php
session_start();

$response = ["loggedIn" => false];

if (isset($_SESSION['user_id'])) {
    $userId = $_SESSION['user_id'];
    include 'config.php';

    $stmt = $conn->prepare("SELECT photo FROM users WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    $stmt->close();
    $conn->close();

    $profilePhoto = !empty($user['photo']) ? $user['photo'] : "default-profile.png";

    $response = [
        "loggedIn" => true,
        "photo" => $profilePhoto
    ];
}

header('Content-Type: application/json');
echo json_encode($response);
?>