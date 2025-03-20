<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "reportmanager";

// Połączenie z bazą danych
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Błąd połączenia z bazą danych: ' . $conn->connect_error]));
}

$sql = "SELECT nazwa FROM urzadzenia"; // Pobieramy tylko nazwę urządzenia
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $urzadzenia = [];
    while ($row = $result->fetch_assoc()) {
        $urzadzenia[] = $row['nazwa']; // Zapisujemy same nazwy w tablicy
    }
    echo json_encode(['status' => 'success', 'urzadzenia' => $urzadzenia]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Brak danych w tabeli urzadzenia.']);
}

$conn->close();
?>
