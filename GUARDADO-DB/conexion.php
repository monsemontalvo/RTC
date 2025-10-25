<?php
class conexion {
private $host = 'localhost'; 
    private $db_name = 'RTC_DB'; 
    private $username = 'root'; 
    private $password = 'young.KDAY6rati'; 
    private $conn;

    /**
     * Obtiene la conexión a la base de datos usando PDO.
     * 
     * @return PDO|null Objeto de conexión PDO o null en caso de error.
     */
    public function connect() {
        $this->conn = null;

        $dsn = 'mysql:host=' . $this->host . ';dbname=' . $this->db_name;
        
        try {
            $this->conn = new PDO($dsn, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION); 
            $this->conn->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
            $this->conn->exec("SET NAMES utf8mb4");

        } catch(PDOException $exception) {
          
            error_log("Error de Conexión a la Base de Datos: " . $exception->getMessage());
           
            return null;
        }

        return $this->conn;
    }
}
?>