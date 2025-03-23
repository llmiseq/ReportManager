<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "reportmanager";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Błąd połączenia z bazą danych: " . $conn->connect_error]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);
if (!$data) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Niepoprawne dane wejściowe."]);
    exit;
}

if (isset($data['name'], $data['surname'], $data['department'], $data['role'], $data['login'], $data['password'])) {
    $name = $conn->real_escape_string($data['name']);
    $surname = $conn->real_escape_string($data['surname']);
    $department = $conn->real_escape_string($data['department']);
    $role = $conn->real_escape_string($data['role']);
    $login = $conn->real_escape_string($data['login']);
    $password = $conn->real_escape_string($data['password']);

    // Przypisanie wartości roli
    $isAdmin = ($role === "admin") ? 1 : 0;
    $isAuditor = ($role === "auditor") ? 1 : 0;
    $isSuperAdmin = 0; // Zawsze ustawiamy na 0

    // Sprawdzenie, czy login już istnieje
    $checkSql = "SELECT id FROM users WHERE login = ?";
    $checkStmt = $conn->prepare($checkSql);
    $checkStmt->bind_param("s", $login);
    $checkStmt->execute();
    $checkResult = $checkStmt->get_result();

    if ($checkResult->num_rows > 0) {
        http_response_code(409);
        echo json_encode(["status" => "error", "message" => "Login już istnieje."]);
        exit;
    }

    // Dodawanie użytkownika (bez kolumny user)
    $insertSql = "INSERT INTO users (name, surname, department, administrator, superAdministrator, auditor, login, password) 
                  VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    $insertStmt = $conn->prepare($insertSql);
    $insertStmt->bind_param("ssssssss", $name, $surname, $department, $isAdmin, $isSuperAdmin, $isAuditor, $login, $password);

    if ($insertStmt->execute()) {
        echo json_encode(["status" => "success", "message" => "Użytkownik został pomyślnie dodany."]);
    } else {
        http_response_code(500);
        echo json_encode(["status" => "error", "message" => "Błąd podczas dodawania użytkownika: " . $conn->error]);
    }

    $insertStmt->close();
    $checkStmt->close();
} else {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Brak wymaganych danych."]);
}

$conn->close();
?>
