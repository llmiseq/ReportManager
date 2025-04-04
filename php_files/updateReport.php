<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$servername = "mysql.mikr.us"; // Zmienione na zdalny serwer
$username = "marek136";        // Twój login do bazy
$password = "EFDC_168983";     // Twoje hasło do bazy
$dbname = "db_marek136";       

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(['status' => 'error', 'message' => 'Połączenie z bazą danych nie powiodło się: ' . $conn->connect_error]));
}

// Debugowanie danych wejściowych
$data = json_decode(file_get_contents("php://input"), true);
file_put_contents('debug.log', json_encode($data, JSON_PRETTY_PRINT), FILE_APPEND);

if (isset($data['id_raportu'])) {
    $id = intval($data['id_raportu']);
    $roboty = isset($data['roboty']) ? $conn->real_escape_string($data['roboty']) : null;
    $urzadzenia = isset($data['urzadzenia']) ? $conn->real_escape_string($data['urzadzenia']) : null;
    $data_zgloszenia = isset($data['data']) ? $conn->real_escape_string($data['data']) : null;
    $zmiana = isset($data['zmiana']) ? intval($data['zmiana']) : null;
    $wiertacz = isset($data['wiertacz']) && $data['wiertacz'] !== "" ? $conn->real_escape_string($data['wiertacz']) : null;
    $pomocnicy = isset($data['pomocnicy']) && $data['pomocnicy'] !== "" ? $conn->real_escape_string($data['pomocnicy']) : null;
    $tresc_raportu = isset($data['tresc_raportu']) && $data['tresc_raportu'] !== "" ? $conn->real_escape_string($data['tresc_raportu']) : null;
    $glebokosc = isset($data['glebokosc']) && $data['glebokosc'] !== "" ? floatval($data['glebokosc']) : null;

    $sql = "UPDATE raporty 
            SET roboty = ?, urzadzenia = ?, data = ?, zmiana = ?, wiertacz = ?, pomocnicy = ?, tresc_raportu = ?, glebokosc = ? 
            WHERE id_raportu = ?";

    $stmt = $conn->prepare($sql);
    if ($stmt) {
        $stmt->bind_param("sssisssdi", $roboty, $urzadzenia, $data_zgloszenia, $zmiana, $wiertacz, $pomocnicy, $tresc_raportu, $glebokosc, $id);

        if ($stmt->execute()) {
            echo json_encode(['status' => 'success', 'message' => 'Raport został pomyślnie zaktualizowany.']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Błąd podczas aktualizacji raportu.']);
        }

        $stmt->close();
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Przygotowanie zapytania nie powiodło się.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Nie podano ID raportu.']);
}

$conn->close();
?>
