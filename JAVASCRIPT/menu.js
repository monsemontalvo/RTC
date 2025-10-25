
  // Botones
  const notifBtn = document.getElementById("notif-btn");
  const profileBtn = document.getElementById("profile-btn");

  // Menús
  const notifMenu = document.getElementById("notif-menu");
  const profileMenu = document.getElementById("profile-menu");

  // Toggle de notificaciones
  notifBtn.addEventListener("click", (e) => {
    notifMenu.style.display = notifMenu.style.display === "block" ? "none" : "block";
    profileMenu.style.display = "none"; // cerrar el otro
  });

  // Toggle de perfil
  profileBtn.addEventListener("click", (e) => {
    profileMenu.style.display = profileMenu.style.display === "block" ? "none" : "block";
    notifMenu.style.display = "none"; // cerrar el otro
  });

  // Cerrar si hago clic fuera
  window.addEventListener("click", (e) => {
    if (!e.target.closest(".dropdown")) {
      notifMenu.style.display = "none";
      profileMenu.style.display = "none";
    }
  });

