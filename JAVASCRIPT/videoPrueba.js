const videoBtn = document.getElementById("videoCallBtn"); // botón principal
const videoContainer = document.getElementById("video-call-container");
const endCallBtn = document.getElementById("endCallBtn");
const localVideo = document.getElementById("localVideo");

videoBtn.addEventListener("click", async () => {
  videoContainer.classList.remove("hidden");

  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
    localVideo.srcObject = stream;
  } catch (err) {
    console.error("Error al acceder a la cámara/micrófono:", err);
  }
});

endCallBtn.addEventListener("click", () => {
  videoContainer.classList.add("hidden");

  const stream = localVideo.srcObject;
  if (stream) {
    stream.getTracks().forEach(track => track.stop());
    localVideo.srcObject = null;
  }
});
