<?php
// Dodanie nagłówków CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header('Content-Type: application/json');

// Obsługa zapytań OPTIONS (preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204); // No Content
    exit;
}

// Połączenie z bazą danych
$servername = "mysql.mikr.us"; // Zmienione na zdalny serwer
$username = "marek136";        // Twój login do bazy
$password = "EFDC_168983";     // Twoje hasło do bazy
$dbname = "db_marek136";       // Nazwa bazy danych

$conn = new mysqli($host, $username, $password, $dbname);

// Sprawdzenie połączenia
if ($conn->connect_error) {
    echo json_encode(['status' => 'error', 'message' => 'Błąd połączenia z bazą danych: ' . $conn->connect_error]);
    exit;
}

// Pobranie danych z żądania
$input = json_decode(file_get_contents('php://input'), true);
$tableName = $input['tableName'] ?? '';

if (empty($tableName)) {
    echo json_encode(['status' => 'error', 'message' => 'Brak nazwy tabeli.']);
    exit;
}

// Pobranie danych z wybranej tabeli
$sql = "SELECT * FROM `$tableName`"; // Wykorzystanie dynamicznej nazwy tabeli
$result = $conn->query($sql);

if ($result && $result->num_rows > 0) {
    $data = [];
    while ($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
    echo json_encode(['status' => 'success', 'data' => $data]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Brak danych w tabeli lub tabela nie istnieje.']);
}

$conn->close();
?>
