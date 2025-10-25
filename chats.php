<?php
session_start();

if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header("Location: login.html");
    exit();
}

require_once './GUARDADO-DB/conexion.php'; 

$current_user_id = $_SESSION['user_id'];
$current_username = $_SESSION['username'] ?? 'Usuario';

$database = new conexion();
$conn = $database->connect();
$chat_users = [];

if ($conn !== null) {
    try {
  
        $sql = "SELECT id, username FROM usuarios WHERE id != :current_id ORDER BY username ASC";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam(':current_id', $current_user_id);
        $stmt->execute();
        $chat_users = $stmt->fetchAll(PDO::FETCH_ASSOC);
    } catch (PDOException $e) {
        error_log("Error al cargar usuarios de chat: " . $e->getMessage());
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
 <meta charset="UTF-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0">
 <title>FIFA 2026</title>

<link rel="stylesheet" href="CSS/indexstyle.css">
 <link rel="stylesheet" href="CSS/chatsstyle.css">
 <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

</head>
<body>
 <header class="navbar">
  </header>

 <main class="chat-container">
  <div class="sidebar left-sidebar">
   <div class="chat-list">
    
    <?php foreach ($chat_users as $user): ?>
    <div class="chat-item <?php echo ($user['id'] == 3) ? 'active' : ''; ?>" 
      data-receiver-id="<?php echo htmlspecialchars($user['id']); ?>" 
      data-name="<?php echo htmlspecialchars($user['username']); ?>">
     <img src="IMG/avatar_default.jpg" alt="User Avatar"> <div class="chat-info">
      <h4><?php echo htmlspecialchars($user['username']); ?></h4> 
      <p>...</p>
     </div>
    </div>
    <?php endforeach; ?>
    
   </div>
  </div>

  <div class="main-chat">
        <div class="messages-area" id="messages-area">
            </div>
        
   <div class="chat-header">
    <div class="chat-header-left">
     <img src="IMG/avatar_default.jpg" alt="Current Chat Avatar">
     <h3 id="chat-recipient-name">Selecciona un Chat</h3> 
    </div>
    </div>
        
        <div class="chat-input-area">
            <input type="text" id="message-input" placeholder="Escribe un mensaje...">
            <button id="send-message-btn"><i class="fas fa-paper-plane"></i></button>
        </div>
           
   </div>
 </main>

 <script src="JAVASCRIPT/menu.js"></script>
 <script src="JAVASCRIPT/videoPrueba.js"></script>
 <script src="JAVASCRIPT/chat_logic.js"></script> 
</body>
</html>