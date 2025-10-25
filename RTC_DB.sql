CREATE DATABASE IF NOT EXISTS RTC_DB;
USE RTC_DB;

CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE mensajes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    message_text TEXT NOT NULL,
    sender_id INT,
    receiver_id INT,
    `timestamp` DATETIME DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_sender (sender_id),
    INDEX idx_receiver (receiver_id),

    CONSTRAINT fk_sender
        FOREIGN KEY (sender_id)
        REFERENCES usuarios(id)
        ON DELETE CASCADE, 

    CONSTRAINT fk_receiver
        FOREIGN KEY (receiver_id)
        REFERENCES usuarios(id)
        ON DELETE SET NULL 
);


