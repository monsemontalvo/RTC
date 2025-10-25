<?php
session_start();
header('Content-Type: application/json');

require_once './GUARDADO-DB/conexion.php'; 

if (!isset($_SESSION['user_id']) || !isset($_POST['receiver_id']) || !isset($_POST['message_text'])) {
    echo json_encode(['status' => 'error', 'message' => 'Datos de sesión o envío incompletos.']);
    exit();
}

$sender_id = $_SESSION['user_id'];
$receiver_id = intval($_POST['receiver_id']);
$message_text = trim($_POST['message_text']);

if (empty($message_text)) {
    echo json_encode(['status' => 'error', 'message' => 'El mensaje no puede estar vacío.']);
    exit();
}

$database = new conexion();
$conn = $database->connect();

if ($conn === null) {
    echo json_encode(['status' => 'error', 'message' => 'Error de conexión a la base de datos.']);
    exit();
}

try {
    $sql = "INSERT INTO mensajes (message_text, sender_id, receiver_id) VALUES (:text, :sender, :receiver)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bindParam(':text', $message_text);
    $stmt->bindParam(':sender', $sender_id);
    $stmt->bindParam(':receiver', $receiver_id);
    
    $stmt->execute();

    echo json_encode(['status' => 'success', 'timestamp' => date('Y-m-d H:i:s')]);

} catch (PDOException $e) {
    error_log("Error al enviar mensaje: " . $e->getMessage());
    echo json_encode(['status' => 'error', 'message' => 'Error al insertar el mensaje.']);
}
?>