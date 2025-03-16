<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "reportmanager";

// Zmienna przechowująca logi
$log = "";
$status = "";
$message = "";
$administrator = 0;

$log .= "Łączenie się z bazą danych: $dbname z użytkownikiem: $username\n";

$conn = new mysqli($servername, $username, $password, $dbname);

// Sprawdzenie połączenia
if ($conn->connect_error) {
    $log .= "Błąd połączenia: " . $conn->connect_error . "\n";
    die(json_encode(['status' => 'error', 'message' => 'Connection failed: ' . $conn->connect_error, 'log' => $log, 'administrator' => $administrator]));
}

$data = json_decode(file_get_contents("php://input"));
$log .= "Otrzymano dane z front-endu\n";

if (isset($data->username) && isset($data->password)) {
    $username = trim($data->username);
    $password = trim($data->password);

    $log .= "Próba logowania dla użytkownika: $username\n";

    $sql = "SELECT id, password, administrator FROM users WHERE login = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $log .= "Wykonano zapytanie do bazy danych\n";
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        $log .= "Znaleziono użytkownika w bazie danych\n";
        if ($password === $user['password']) {
            $log .= "Hasło poprawne\n";
            $redirectUrl = $user['administrator'] == 1 ? '/admin' : '/user';
            $log .= "Przekierowanie na stronę: $redirectUrl\n";
            $status = 'success';
            $message = 'Logowanie zakończone sukcesem!';
            $administrator = $user['administrator'];
        } else {
            $log .= "Nieprawidłowe hasło\n";
            http_response_code(401);
            $status = 'error';
            $message = 'Invalid password';
        }
    } else {
        $log .= "Nie znaleziono użytkownika\n";
        http_response_code(401);
        $status = 'error';
        $message = 'Invalid login';
    }

    $stmt->close();
} else {
    $log .= "Formularz nie został wypełniony poprawnie\n";
    $status = 'error';
    $message = 'Please fill out the form';
}

$conn->close();
$log .= "Zamknięto połączenie z bazą danych\n";

// Wysyłanie odpowiedzi do Reacta
$response = ['status' => $status, 'message' => $message, 'administrator' => $administrator, 'log' => $log];
echo json_encode($response);
?>
