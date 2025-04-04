<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

// Ustawienia dla wyświetlania błędów PHP
ini_set('log_errors', 1);
ini_set('display_errors', 0); // Wyłącz wyświetlanie błędów (są logowane)
ini_set('error_log', __DIR__ . '/error_log.txt'); // Logowanie błędów do pliku
error_reporting(E_ALL);

// Obsługa metody OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// Odczytanie danych wejściowych
$input = json_decode(file_get_contents("php://input"), true);
$id = $input['id'] ?? null;

// Sprawdzenie, czy ID jest poprawnie przesłane
if (!$id) {
    echo json_encode(['status' => 'error', 'message' => 'ID roboty jest wymagane.']);
    exit;
}

// Dane połączenia z bazą danych
$servername = "mysql.mikr.us"; // Zmienione na zdalny serwer
$username = "marek136";        // Twój login do bazy
$password = "EFDC_168983";     // Twoje hasło do bazy
$dbname = "db_marek136";       // Nazwa bazy danych

// Połączenie z bazą danych
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Nie udało się połączyć z bazą danych: ' . $conn->connect_error]);
    exit;
}

// Przygotowanie zapytania SQL
$sql = "DELETE FROM roboty WHERE id_roboty = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode(['status' => 'error', 'message' => 'Nie udało się przygotować zapytania: ' . $conn->error]);
    exit;
}

// Powiązanie parametrów zapytania
$stmt->bind_param("i", $id);

// Wykonanie zapytania
if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(['status' => 'success', 'message' => 'Robota została usunięta pomyślnie.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Nie znaleziono roboty o podanym ID.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Nie udało się usunąć roboty: ' . $stmt->error]);
}

// Zakończenie połączenia
$stmt->close();
$conn->close();
?>
