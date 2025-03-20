<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "reportmanager";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Połączenie z bazą danych nie powiodło się: ' . $conn->connect_error]));
}

$data = json_decode(file_get_contents("php://input"));

if (isset($data->nazwa) && !empty($data->nazwa) && isset($data->inwestor) && !empty($data->inwestor) && isset($data->data_kol) && !empty($data->data_kol)) {
    $nazwa = trim($data->nazwa);
    $inwestor = trim($data->inwestor);
    $dataKol = trim($data->data_kol);
    $dataZak = isset($data->data_zak) ? trim($data->data_zak) : null;

    $stmt = $conn->prepare("INSERT INTO roboty (nazwa, inwestor, data_kol, data_zak) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $nazwa, $inwestor, $dataKol, $dataZak);

    if ($stmt->execute()) {
        echo json_encode(['status' => 'success', 'message' => 'Robot został pomyślnie dodany.']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Błąd podczas dodawania robota.']);
    }

    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Nazwa, inwestor i data rozpoczęcia są wymagane.']);
}

$conn->close();
?>
