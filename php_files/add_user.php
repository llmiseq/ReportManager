<?php
header("Access-Control-Allow-Origin: *"); // Zezwól na połączenia z dowolnego źródła
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Obsługa zapytań preflight (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "reportmanager";

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

if (isset($data->name) && isset($data->surname) && isset($data->department) && isset($data->administrator) && isset($data->login) && isset($data->password)) {
    $name = trim($data->name);
    $surname = trim($data->surname);
    $department = trim($data->department);
    $administrator = (int)$data->administrator; // Konwersja na integer (0/1)
    $login = trim($data->login);
    $password = trim($data->password);

    $log .= "Próba dodania użytkownika: $name $surname, Oddział: $department, Login: $login\n";

    // Sprawdzenie, czy login już istnieje
    $checkSql = "SELECT id FROM users WHERE login = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("s", $login);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();

    if ($checkResult->num_rows > 0) {
        $log .= "Login $login już istnieje w bazie danych.\n";
        $status = 'error';
        $message = 'Login już istnieje. Wybierz inny.';
    } else {
        // Dodanie użytkownika do bazy danych
        $insertSql = "INSERT INTO users (name, surname, department, administrator, login, password) VALUES (?, ?, ?, ?, ?, ?)";
        $insertStmt = $conn->prepare($insertSql);
        $insertStmt->bind_param("ssssss", $name, $surname, $department, $administrator, $login, $password);

        if ($insertStmt->execute()) {
            $log .= "Użytkownik został pomyślnie dodany.\n";
            $status = 'success';
            $message = 'Użytkownik został pomyślnie dodany!';
        } else {
            $log .= "Błąd podczas dodawania użytkownika: " . $conn->error . "\n";
            $status = 'error';
            $message = 'Błąd podczas dodawania użytkownika. Spróbuj ponownie później.';
        }

        $insertStmt->close();
    }

    $checkStmt->close();
} else {
    $log .= "Nie wypełniono wymaganych pól.\n";
    $status = 'error';
    $message = 'Wypełnij wszystkie pola.';
}

$conn->close();
$log .= "Zamknięto połączenie z bazą danych.\n";

$response = ['status' => $status, 'message' => $message, 'log' => $log];
echo json_encode($response);
?>
