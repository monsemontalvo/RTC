<?php
session_start();

require_once './GUARDADO-DB/conexion.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $email = htmlspecialchars(trim($_POST['email'] ?? ''));
    $password = $_POST['password'] ?? ''; 
    
    if (empty($email) || empty($password)) {
        header("Location: login.html?error=campos_vacios");
        exit();
    }

    $database = new conexion();
    $conn = $database->connect();

    if ($conn === null) {
        header("Location: login.html?error=db_error");
        exit();
    }

    $sql = "SELECT id, username, email, password FROM usuarios WHERE email = :email";
    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        error_log("Error al preparar la consulta de login: " . $conn->errorInfo()[2]);
        header("Location: login.html?error=db_error");
        exit();
    }

    try {
        $stmt->bindParam(':email', $email);
        $stmt->execute();

        $user = $stmt->fetch(PDO::FETCH_ASSOC); 

        if ($user) {
            
            if ($password === $user['password']) {
                
                $_SESSION['loggedin'] = true;
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $user['username'];
               
                header("Location: profile.php"); 
                exit();

            } else {
                header("Location: login.html?error=password_incorrecta");
                exit();
            }
        } else {
            header("Location: login.html?error=usuario_no_encontrado");
            exit();
        }
    } catch (PDOException $e) {
        error_log("Error de ejecución de consulta: " . $e->getMessage());
        header("Location: login.html?error=db_error_ejecucion");
        exit();
    }

} else {
    header("Location: login.html");
    exit();
}
?>