<?php
function obtenerConexion() {
    // === Configuración ===
    $servername = "localhost";
    $username = "root";       
    $password = "5N9kdnds_Rid2";           
    $dbname = "RTC_DB";

    // === Conexión ===
    $conn = new mysqli($servername, $username, $password, $dbname);

    // === Manejo de Errores ===
    if ($conn->connect_error) {
        http_response_code(500); // Error del Servidor
        die(json_encode(['status' => 'error', 'message' => 'Error de conexión a la base de datos.']));
    }
    
    // Opcional: Establecer el conjunto de caracteres a UTF8
    $conn->set_charset("utf8");

    return $conn;
}

?>