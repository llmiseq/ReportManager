<?php
header("Access-Control-Allow-Origin: *"); // Zezwól na połączenia z dowolnego źródła
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Obsługa zapytań preflight (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$servername = "mysql.mikr.us"; // Zmienione na zdalny serwer
$username = "marek136";        // Twój login do bazy
$password = "EFDC_168983";     // Twoje hasło do bazy
$dbname = "db_marek136";       // Nazwa bazy danych

$log = "";
$status = "";
$message = "";

$log .= "Łączenie się z bazą danych: $dbname z użytkownikiem: $username\n";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    $log .= "Błąd połączenia: " . $conn->connect_error . "\n";
    die(json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error, 'log' => $log]));
}

$data = json_decode(file_get_contents("php://input"));
$log .= "Otrzymano dane z front-endu\n";

if (isset($data->username) && isset($data->oldPassword) && isset($data->newPassword)) {
    $username = trim($data->username);
    $oldPassword = trim($data->oldPassword);
    $newPassword = trim($data->newPassword);

    $log .= "Próba zmiany hasła dla użytkownika: $username\n";

    $sql = "SELECT password FROM users WHERE login = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $log .= "Wykonano zapytanie do bazy danych\n";
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        if ($oldPassword === $user['password']) {
            $updateSql = "UPDATE users SET password = ? WHERE login = ?";
            $updateStmt = $conn->prepare($updateSql);
            $updateStmt->bind_param("ss", $newPassword, $username);
            $updateStmt->execute();

            $log .= "Hasło zmienione pomyślnie dla użytkownika: $username\n";
            $status = 'success';
            $message = 'Hasło zostało zmienione!';
        } else {
            $log .= "Nieprawidłowe stare hasło\n";
            $status = 'error';
            $message = 'Stare hasło jest nieprawidłowe.';
        }
    } else {
        $log .= "Nie znaleziono użytkownika\n";
        $status = 'error';
        $message = 'Nie znaleziono użytkownika.';
    }

    $stmt->close();
} else {
    $log .= "Nie wypełniono wymaganych pól\n";
    $status = 'error';
    $message = 'Wypełnij wszystkie pola.';
}

$conn->close();
$log .= "Zamknięto połączenie z bazą danych\n";

$response = ['status' => $status, 'message' => $message, 'log' => $log];
echo json_encode($response);
?>
