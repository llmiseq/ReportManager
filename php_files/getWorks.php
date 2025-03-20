<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "reportmanager";

// Połączenie z bazą danych
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Nie udało się połączyć z bazą danych: ' . $conn->connect_error]);
    exit;
}

// Pobranie danych wraz z 'id_roboty'
$sql = "SELECT id_roboty, nazwa, inwestor, data_kol, data_zak FROM roboty";
$result = $conn->query($sql);

if (!$result) {
    echo json_encode(['status' => 'error', 'message' => 'Błąd w zapytaniu SQL: ' . $conn->error]);
    exit;
}

$works = [];
while ($row = $result->fetch_assoc()) {
    $works[] = $row;
}

echo json_encode(['status' => 'success', 'works' => $works]);

$conn->close();
?>
