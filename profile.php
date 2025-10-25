<?php
session_start();

if (!isset($_SESSION['loggedin']) || $_SESSION['loggedin'] !== true) {
    header("Location: login.html");
    exit();
}

$user_id = $_SESSION['user_id'] ?? 'N/A';
$username = $_SESSION['username'] ?? 'Usuario';
$email = $_SESSION['email'] ?? 'correo@ejemplo.com';
?>
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?php echo htmlspecialchars($username); ?></title>
<link rel="stylesheet" href="CSS/indexstyle.css">
<link rel="stylesheet" href="CSS/profilestyle.css">
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>

<body>
 <header class="navbar">
  <div class="logo">
   <a href="index.html">FIFA 2026</a>
  </div>
  <nav>
   <ul>
    <li><a href="profile.php">Perfil</a></li> 
    <li><a href="tasks.html">Tareas</a></li>
    <li><a href="chats.php">Chats</a></li>
    <li><a href="simulation.html">Simulación</a></li>
   </ul>
  </nav>

  <div class="nav-actions-logged-in">
   <div class="user-actions">
    
        <div class="dropdown">
     <button class="icon-btn" id="notif-btn"><i class="fas fa-bell"></i></button>
     <div class="dropdown-menu notif-menu" id="notif-menu">
      <p>Nueva tarea asignada</p>
      <p>Mensaje en el chat</p>
     </div>
    </div>

    
    <div class="dropdown">
     <button class="icon-btn" id="profile-btn"><i class="fas fa-user"></i></button>
     <div class="dropdown-menu profile-menu" id="profile-menu">
      <div class="profile-mini">
       <img src="IMG/user_avatar.jpg" alt="Foto de perfil">
       <div>
        <strong><?php echo htmlspecialchars($username); ?></strong> 
        <p><?php echo htmlspecialchars($email); ?></p> 
       </div>
      </div>
      <hr>
      <a href="profile.php"><i class="fas fa-user"></i> Mi perfil</a> 
      <a href="settings.html"><i class="fas fa-cog"></i> Configuración</a>
      <a href="logout.php"><i class="fas fa-sign-out-alt"></i> Cerrar sesión</a>      </div>
    </div>
   </div>
  </div>


 </header>

 <main class="profile-container">
  <div class="profile-card">
   <div class="profile-header">
    <h2>Mi Perfil</h2>
   </div>

   <div class="profile-content">
    <div class="profile-info-left">
     <div class="profile-picture">
      <img src="IMG/user_avatar.jpg" alt="Foto de Perfil">
      <div class="edit-overlay"><i class="fas fa-camera"></i></div>
     </div>
     <h3><?php echo htmlspecialchars($username); ?></h3>      <p class="user-bio">Bio.</p>
     <button class="edit-profile-btn"><i class="fas fa-pencil-alt"></i> Editar Perfil</button>
    </div>

    <div class="profile-info-right">
     <div class="profile-details">
      <h4>Información de la Cuenta</h4>
      <div class="info-group">
       <label>Nombre de Usuario</label>
       <p>@<?php echo htmlspecialchars($username); ?></p>       </div>
      <div class="info-group">
       <label>Correo Electrónico</label>
       <p><?php echo htmlspecialchars($email); ?></p>       </div>
      <div class="info-group">
       <label>Ubicación</label>
       <p> Lugar</p>
      </div>
     </div>
                 <div class="profile-achievements">
      <h4>Logros</h4>
      <div class="achievement-grid">
       <div class="achievement-item">
        <i class="fas fa-medal achievement-icon"></i>
        <p>Logro 1</p>
       </div>
       <div class="achievement-item">
        <i class="fas fa-star achievement-icon"></i>
        <p>Logro 2</p>
       </div>
       <div class="achievement-item">
        <i class="fas fa-award achievement-icon"></i>
        <p>Logro 3</p>
       </div>
      </div>
     </div>
    </div>
   </div>
  </div>
 </main>
 <script src="JAVASCRIPT/menu.js"></script>
</body>

</html>