<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

session_start();
$requestSessionId = $_GET['sessionId'] ?? null;

$log = "=== getUserInfo.php ===\n";
$log .= "ID sesji (serwer): " . session_id() . "\n";
$log .= "ID sesji (klient): $requestSessionId\n";

$jsonFilePath = __DIR__ . "/sessions/$requestSessionId.json";
$log .= "Ścieżka pliku JSON: $jsonFilePath\n";

if (!file_exists($jsonFilePath)) {
    $log .= "Plik JSON dla sesji nie istnieje: $jsonFilePath\n";
    error_log($log);
    echo json_encode(['status' => 'error', 'message' => 'Session data not found']);
    exit;
}

$userData = json_decode(file_get_contents($jsonFilePath), true);
if (!$userData) {
    $log .= "Nie udało się odczytać danych z pliku JSON.\n";
    error_log($log);
    echo json_encode(['status' => 'error', 'message' => 'Failed to read session data.']);
    exit;
}

$log .= "Dane użytkownika z pliku JSON: " . print_r($userData, true) . "\n";
error_log($log);

echo json_encode(['status' => 'success', 'message' => 'Session validated successfully.', 'sessionData' => $userData]);
?>
