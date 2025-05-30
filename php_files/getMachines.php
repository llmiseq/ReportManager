<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = "mysql.mikr.us"; // Zmienione na zdalny serwer
$username = "marek136";        // Twój login do bazy
$password = "EFDC_168983";     // Twoje hasło do bazy
$dbname = "db_marek136";       // Nazwa bazy danych

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Połączenie z bazą danych nie powiodło się: ' . $conn->connect_error]));
}

$sql = "SELECT id_urzadzenia AS id, nazwa FROM urzadzenia";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $machines = [];
    while ($row = $result->fetch_assoc()) {
        $machines[] = $row;
    }
    echo json_encode(['status' => 'success', 'machines' => $machines]);
} else {
    echo json_encode(['status' => 'success', 'machines' => []]);
}

$conn->close();
?>
