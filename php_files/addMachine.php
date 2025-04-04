<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = "mysql.mikr.us";
$username = "marek136";
$password = "EFDC_168983";
$dbname = "db_marek136";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Połączenie z bazą danych nie powiodło się: ' . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"));

if (isset($data->name) && !empty($data->name)) {
    $machineName = trim($data->name);

    $stmt = $conn->prepare("INSERT INTO urzadzenia (nazwa) VALUES (?)");
    $stmt->bind_param("s", $machineName);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Urządzenie zostało pomyślnie dodane.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Błąd podczas dodawania urządzenia.']);
    }

    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Nazwa urządzenia jest wymagana.']);
}

$conn->close();
?>
