document.addEventListener('DOMContentLoaded', function() {
    const messagesArea = document.getElementById('messages-area');
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-message-btn');
    const chatItems = document.querySelectorAll('.chat-item');
    const recipientNameDisplay = document.getElementById('chat-recipient-name');
    
    let currentReceiverId = null; 
    const POLLING_INTERVAL = 2000; 
    function renderMessage(message, currentUserId) {
        const isSender = message.sender_id == currentUserId;
        const messageClass = isSender ? 'sent' : 'received';
        const timestamp = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        const messageHtml = `
            <div class="message ${messageClass}">
                <p>${message.message_text}</p>
                <span class="timestamp">${timestamp}</span>
            </div>
        `;
        messagesArea.innerHTML += messageHtml;
    }
    
    function loadMessages(receiverId) {
        if (!receiverId) return;

        fetch(`get_messages.php?receiver_id=${receiverId}`)
            .then(response => response.json())
            .then(data => {
                messagesArea.innerHTML = ''; 
                if (data.status === 'success') {
                    data.messages.forEach(message => {
                        renderMessage(message, data.current_user_id);
                    });
                    messagesArea.scrollTop = messagesArea.scrollHeight; 
                } else {
                    messagesArea.innerHTML = `<p class="chat-error">${data.message}</p>`;
                }
            })
            .catch(error => {
                console.error('Error al cargar mensajes:', error);
                messagesArea.innerHTML = `<p class="chat-error">Error de red.</p>`;
            });
    }


    chatItems.forEach(item => {
        item.addEventListener('click', function() {

            document.querySelector('.chat-item.active')?.classList.remove('active');
            this.classList.add('active');
       
            currentReceiverId = this.getAttribute('data-receiver-id');
            const recipientName = this.getAttribute('data-name');

            recipientNameDisplay.textContent = recipientName;

            loadMessages(currentReceiverId);
        });
    });

    function sendMessage() {
        const messageText = messageInput.value.trim();
        if (!messageText || !currentReceiverId) return;

        const formData = new FormData();
        formData.append('receiver_id', currentReceiverId);
        formData.append('message_text', messageText);

        fetch('send_messages.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === 'success') {
                messageInput.value = '';
                loadMessages(currentReceiverId);
            } else {
                alert('Error al enviar mensaje: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error de envío:', error);
            alert('Error de conexión al enviar mensaje.');
        });
    }

    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });


    const activeChat = document.querySelector('.chat-item.active');
    if (activeChat) {
        recipientNameDisplay.textContent = activeChat.getAttribute('data-name'); 
        
        currentReceiverId = activeChat.getAttribute('data-receiver-id');
        loadMessages(currentReceiverId);
    }
    
    setInterval(() => {
        if (currentReceiverId) {
            loadMessages(currentReceiverId);
        }
    }, POLLING_INTERVAL);
});