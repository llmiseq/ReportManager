<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = "mysql.mikr.us"; // Zmienione na zdalny serwer
$username = "marek136";        // Twój login do bazy
$password = "EFDC_168983";     // Twoje hasło do bazy
$dbname = "db_marek136";       

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Połączenie z bazą danych nie powiodło się: ' . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"));

// Obsługa dodawania urządzeń
if (isset($data->action) && $data->action === "add" && isset($data->name) && !empty($data->name)) {
    $machineName = trim($data->name);

    $stmt = $conn->prepare("INSERT INTO urzadzenia (nazwa) VALUES (?)");
    $stmt->bind_param("s", $machineName);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Urządzenie zostało pomyślnie dodane.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Błąd podczas dodawania urządzenia.']);
    }

    $stmt->close();
}
// Obsługa usuwania urządzeń
elseif (isset($data->action) && $data->action === "delete" && isset($data->id)) {
    $machineId = intval($data->id);

    $stmt = $conn->prepare("DELETE FROM urzadzenia WHERE id_urzadzenia = ?");
    $stmt->bind_param("i", $machineId);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Urządzenie zostało pomyślnie usunięte.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Błąd podczas usuwania urządzenia.']);
    }

    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Nieprawidłowe dane wejściowe.']);
}

$conn->close();
?>
