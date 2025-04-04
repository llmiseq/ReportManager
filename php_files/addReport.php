<?php
header("Access-Control-Allow-Origin: *"); // Zezwól na połączenia z dowolnego źródła
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$servername = "mysql.mikr.us"; // Zmienione na zdalny serwer
$username = "marek136";        // Twój login do bazy
$password = "EFDC_168983";     // Twoje hasło do bazy
$dbname = "db_marek136";       // Nazwa bazy danych

$log = "=== START LOG ===\n";
$status = "";
$message = "";

try {
    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        throw new Exception("Błąd połączenia: " . $conn->connect_error);
    }

    $log .= "Połączono z bazą danych.\n";

    // Pobierz dane z żądania
    $input = file_get_contents("php://input");
    $data = json_decode($input, true);

    $log .= "Odebrane dane (RAW): " . $input . "\n"; // Zapisanie surowego JSON do logów
    $log .= "Odebrane dane (po dekodowaniu): " . print_r($data, true) . "\n"; // Zapisanie zdekodowanego JSON

    // Sprawdzenie, czy konkretne pole 'urzadzenie' zostało przesłane
    if (isset($data['urzadzenie'])) {
        $log .= "Wartość pola 'urzadzenie': " . $data['urzadzenie'] . "\n";
    } else {
        $log .= "Pole 'urzadzenie' NIE ZOSTAŁO PRZESŁANE w żądaniu.\n";
    }

    // Walidacja wymaganych pól
    $requiredFields = ['roboty', 'urzadzenie', 'data', 'zmiana', 'wiertacz', 'pomocnicy', 'tresc', 'glebokosc'];
    $missingFields = [];

    foreach ($requiredFields as $field) {
        if (!isset($data[$field]) || empty($data[$field])) {
            $missingFields[] = $field; // Dodaj pole do listy brakujących
        }
    }

    if (!empty($missingFields)) {
        $log .= "Brakujące pola: " . implode(", ", $missingFields) . "\n";
        throw new Exception("Nie wypełniono wymaganych pól: " . implode(", ", $missingFields));
    }

    // Pobranie danych wejściowych
    $nazwa_roboty = $conn->real_escape_string($data['roboty']);
    $nazwa_urzadzenia = $conn->real_escape_string($data['urzadzenie']); // Poprawiono nazwę na 'urzadzenie'
    $dataZgloszenia = $conn->real_escape_string($data['data']);
    $zmiana = (int)$data['zmiana'];
    $wiertacz = $conn->real_escape_string($data['wiertacz']);
    $pomocnicy = $conn->real_escape_string($data['pomocnicy']);
    $trescRaportu = $conn->real_escape_string($data['tresc']);
    $glebokosc = (float)$data['glebokosc'];

    // Przygotowanie zapytania SQL
    $insertSql = "INSERT INTO raporty (roboty, urzadzenia, data, zmiana, wiertacz, pomocnicy, tresc_raportu, glebokosc) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $insertStmt = $conn->prepare($insertSql);

    if (!$insertStmt) {
        throw new Exception("Błąd przygotowania zapytania SQL: " . $conn->error);
    }

    $insertStmt->bind_param("sssisssd", $nazwa_roboty, $nazwa_urzadzenia, $dataZgloszenia, $zmiana, $wiertacz, $pomocnicy, $trescRaportu, $glebokosc);

    if (!$insertStmt->execute()) {
        throw new Exception("Błąd wykonania zapytania SQL: " . $insertStmt->error);
    }

    $log .= "Dodano raport pomyślnie.\n";
    $status = 'success';
    $message = 'Raport został pomyślnie dodany.';

    $insertStmt->close();
} catch (Exception $e) {
    $status = 'error';
    $message = $e->getMessage();
    $log .= "Wystąpił błąd: " . $e->getMessage() . "\n";
}

if (isset($conn)) {
    $conn->close();
    $log .= "Zamknięto połączenie z bazą danych.\n";
}

// Zapisanie logów do pliku
file_put_contents("log.txt", $log, FILE_APPEND);

// Zwrot odpowiedzi w formacie JSON
$response = ['status' => $status, 'message' => $message, 'log' => $log];
echo json_encode($response);
?>
