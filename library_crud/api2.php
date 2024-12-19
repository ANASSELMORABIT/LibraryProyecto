
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
        // Recibir datos a través de form-data ($_POST)
        $title = isset($_POST["title"]) ? $_POST["title"] : "";
        $author = isset($_POST["author"]) ? $_POST["author"] : "";
        $year = isset($_POST["year"]) ? intval($_POST["year"]) : 0;

        if (!empty($title) && !empty($author) && $year > 0) {
            $conn->query("INSERT INTO books (title, author, year) VALUES ('$title', '$author', $year)");
            echo json_encode(["message" => "Book added successfully"]);
        } else {
            echo json_encode(["error" => "Invalid form-data input"]);
        }
        break;

    case 'PUT':
        // PUT usando form-data
        parse_str(file_get_contents("php://input"), $_PUT);
        $id = isset($_PUT["id"]) ? intval($_PUT["id"]) : 0;
        $title = isset($_PUT["title"]) ? $_PUT["title"] : "";
        $author = isset($_PUT["author"]) ? $_PUT["author"] : "";
        $year = isset($_PUT["year"]) ? intval($_PUT["year"]) : 0;

        if ($id > 0 && !empty($title) && !empty($author) && $year > 0) {
            $conn->query("UPDATE books SET title='$title', author='$author', year=$year WHERE id=$id");
            echo json_encode(["message" => "Book updated successfully"]);
        } else {
            echo json_encode(["error" => "Invalid form-data input"]);
        }
        break;

    case 'DELETE':
        // DELETE usando form-data
        parse_str(file_get_contents("php://input"), $_DELETE);
        $id = isset($_DELETE["id"]) ? intval($_DELETE["id"]) : 0;

        if ($id > 0) {
            $conn->query("DELETE FROM books WHERE id=$id");
            echo json_encode(["message" => "Book deleted successfully"]);
        } else {
            echo json_encode(["error" => "Invalid form-data input"]);
        }
        break;
}

$conn->close();
?>

