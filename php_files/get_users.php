<?php
header("Access-Control-Allow-Origin: http://localhost:3000");
header("Access-Control-Allow-Methods: GET, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "reportmanager";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Błąd połączenia z bazą danych: ' . $conn->connect_error]));
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Pobierz listę wszystkich użytkowników
    $sql = "SELECT id, name, surname, login, administrator, superAdministrator, auditor FROM users";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $users = [];
        while ($row = $result->fetch_assoc()) {
            $users[] = [
                'id' => $row['id'],
                'name' => $row['name'],
                'surname' => $row['surname'],
                'login' => $row['login'],
                'role' => ($row['superAdministrator'] == 1) ? 'superAdministrator' :
                         (($row['administrator'] == 1) ? 'administrator' :
                         (($row['auditor'] == 1) ? 'auditor' : 'user'))
            ];
        }
        echo json_encode(['status' => 'success', 'users' => $users]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Nie znaleziono użytkowników.']);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Usuń użytkownika
    $data = json_decode(file_get_contents("php://input"), true);
    if (isset($data['id'])) {
        $id = intval($data['id']);
        $deleteSql = "DELETE FROM users WHERE id = ?";
        $stmt = $conn->prepare($deleteSql);
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Użytkownik został usunięty.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Błąd podczas usuwania użytkownika.']);
        }

        $stmt->close();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Brak ID użytkownika do usunięcia.']);
    }
}

$conn->close();
?>
