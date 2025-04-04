<?php
// Włączenie raportowania błędów
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Ustawienia nagłówków CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

// Obsługa preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

$log = "=== getReports.php ===\n";
$log .= "Czas: " . date("Y-m-d H:i:s") . "\n";

try {
    // Połączenie z bazą danych
    $conn = new mysqli("mysql.mikr.us", "marek136", "EFDC_168983", "db_marek136");

    if ($conn->connect_error) {
        throw new Exception("Błąd połączenia z bazą danych: " . $conn->connect_error);
    }

    $log .= "Połączono z bazą danych.\n";

    // Wykonanie zapytania SQL
    $query = "SELECT * FROM raporty";
    $result = $conn->query($query);

    if (!$result) {
        throw new Exception("Błąd wykonania zapytania SQL: " . $conn->error);
    }

    $reports = [];
    while ($row = $result->fetch_assoc()) {
        $reports[] = $row;
    }

    $log .= "Pobrano " . count($reports) . " raportów z bazy danych.\n";

    // Zwrócenie wyników w formacie JSON
    echo json_encode(['status' => 'success', 'reports' => $reports]);
} catch (Exception $e) {
    $log .= "Wystąpił błąd: " . $e->getMessage() . "\n";
    echo json_encode(['status' => 'error', 'message' => $e->getMessage()]);
} finally {
    if (isset($conn)) {
        $conn->close();
        $log .= "Zamknięto połączenie z bazą danych.\n";
    }

    // Zapisanie logów do pliku
    file_put_contents("log.txt", $log, FILE_APPEND);
}
?>
