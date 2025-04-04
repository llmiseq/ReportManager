<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

session_start(); // Rozpoczęcie sesji
$sessionId = session_id();
$log = "=== api.php ===\n";
$log .= "Rozpoczęta sesja z ID: $sessionId\n";

// Pobieranie danych logowania
$data = json_decode(file_get_contents("php://input"), true);
if (!$data || !isset($data['username']) || !isset($data['password'])) {
    $log .= "Brak danych logowania w żądaniu.\n";
    error_log($log);
    die(json_encode(['status' => 'error', 'message' => 'Brak danych logowania']));
}

// Połączenie z bazą danych
$servername = "mysql.mikr.us";  // Zmienione na zdalny serwer
$dbUsername = "marek136";       // Twój login do bazy
$dbPassword = "EFDC_168983";    // Twoje hasło do bazy
$dbName = "db_marek136";        // Nazwa bazy danych

$conn = new mysqli($servername, $dbUsername, $dbPassword, $dbName);
if ($conn->connect_error) {
    $log .= "Błąd połączenia z bazą danych: " . $conn->connect_error . "\n";
    error_log($log);
    die(json_encode(['status' => 'error', 'message' => 'Nie można połączyć z bazą danych']));
}

// Walidacja użytkownika
$username = trim($data['username']);
$password = trim($data['password']);

$sql = "SELECT id, name, surname, password, administrator, superAdministrator, auditor FROM users WHERE login = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();

    if ($password === $user['password']) { // Sprawdzenie hasła
        // Ustawienie roli użytkownika
        $role = ($user['superAdministrator'] == 1) ? 'superAdministrator' :
                (($user['administrator'] == 1) ? 'administrator' :
                (($user['auditor'] == 1) ? 'auditor' : 'user'));

        // Dodanie roli do zmiennej sesji
        $_SESSION['role'] = $role;

        $userData = [
            'login' => $username,
            'role' => $role, // Rola użytkownika
            'name' => $user['name'],
            'surname' => $user['surname'],
            'last_activity' => time()
        ];

        $filePath = __DIR__ . "/sessions/$sessionId.json";
        $log .= "Ścieżka pliku JSON: $filePath\n";

        if (!is_dir(__DIR__ . "/sessions")) {
            mkdir(__DIR__ . "/sessions", 0777, true);
            $log .= "Katalog 'sessions' został utworzony.\n";
        }

        $fileWriteResult = file_put_contents($filePath, json_encode($userData));
        if ($fileWriteResult === false) {
            $log .= "Błąd podczas zapisywania danych sesji do pliku JSON.\n";
        } else {
            $log .= "Dane użytkownika zapisane w pliku JSON: $filePath\n";
            $log .= "Dane użytkownika: " . print_r($userData, true) . "\n";
        }

        error_log($log);
        echo json_encode([
            'status' => 'success',
            'message' => 'Logowanie zakończone sukcesem!',
            'sessionId' => $sessionId,
            'role' => $role // Dodanie roli do odpowiedzi
        ]);
        exit;
    } else {
        $log .= "Nieprawidłowe hasło dla użytkownika: $username\n";
        error_log($log);
        die(json_encode(['status' => 'error', 'message' => 'Nieprawidłowe hasło']));
    }
} else {
    $log .= "Użytkownik nie znaleziony: $username\n";
    error_log($log);
    die(json_encode(['status' => 'error', 'message' => 'Nie znaleziono użytkownika']));
}

$stmt->close();
$conn->close();
?>
