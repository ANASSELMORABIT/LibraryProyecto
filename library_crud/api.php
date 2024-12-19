<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

$host = "localhost";
$user = "root";
$password = "";
$database = "library_db";

$conn = new mysqli($host, $user, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed."]));
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $result = $conn->query("SELECT * FROM books");
        $books = [];
        while ($row = $result->fetch_assoc()) {
            $books[] = $row;
        }
        echo json_encode($books);
        break;
    case 'POST':
        $data = json_decode(file_get_contents("php://input"), true);
        $title = $data["title"];
        $author = $data["author"];
        $year = $data["year"];
        $conn->query("INSERT INTO books (title, author, year) VALUES ('$title', '$author', $year)");
        echo json_encode(["message" => "Book added successfully"]);
        break;
    case 'PUT':
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data["id"];
        $title = $data["title"];
        $author = $data["author"];
        $year = $data["year"];
        $conn->query("UPDATE books SET title='$title', author='$author', year=$year WHERE id=$id");
        echo json_encode(["message" => "Book updated successfully"]);
        break;
    case 'DELETE':
        $data = json_decode(file_get_contents("php://input"), true);
        $id = $data["id"];
        $conn->query("DELETE FROM books WHERE id=$id");
        echo json_encode(["message" => "Book deleted successfully"]);
        break;
}
$conn->close();
?>
