<?php
session_start();
header('Content-Type: application/json');

require_once './GUARDADO-DB/conexion.php'; 

if (!isset($_SESSION['user_id']) || !isset($_GET['receiver_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'Parámetros inválidos.']);
    exit();
}

$sender_id = $_SESSION['user_id'];
$receiver_id = intval($_GET['receiver_id']);

$database = new conexion();
$conn = $database->connect();

if ($conn === null) {
    echo json_encode(['status' => 'error', 'message' => 'Error de conexión a la base de datos.']);
    exit();
}

try {
    $sql = "SELECT message_text, sender_id, `timestamp` 
            FROM mensajes 
            WHERE (sender_id = :user1 AND receiver_id = :user2) 
               OR (sender_id = :user2 AND receiver_id = :user1)
            ORDER BY `timestamp` ASC";
    
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':user1', $sender_id);
    $stmt->bindParam(':user2', $receiver_id);
    
    $stmt->execute();
    
    $messages = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(['status' => 'success', 'messages' => $messages, 'current_user_id' => $sender_id]);

} catch (PDOException $e) {
    error_log("Error al obtener mensajes: " . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'Error al ejecutar la consulta.']);
}
?>