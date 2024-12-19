
CREATE DATABASE IF NOT EXISTS library_db;
USE library_db;

CREATE TABLE IF NOT EXISTS books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    year INT NOT NULL
);

INSERT INTO books (title, author, year) VALUES 
('Don Quijote de la Mancha', 'Miguel de Cervantes', 1605),
('Moby Dick', 'Herman Melville', 1851),
('Orgullo y Prejuicio', 'Jane Austen', 1813),
('Crimen y Castigo', 'Fyodor Dostoevsky', 1866),
('La Odisea', 'Homero', -800);
