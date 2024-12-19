// ANASS EL MORABIT M06 UF2 AC4
window.onload = () => {
    // Pedimos a la API los libros actuales en base de datos
    fetchBooks();
  
    // Capturamos el evento 'submit' del formulario
    const bookForm = document.getElementById("book-form");
    bookForm.addEventListener("submit", EventCreatBook);
  
    function EventCreatBook (event) {
      event.preventDefault();
      createBook(event);
    }
  };
  async function fetchBooks() {
    try {
        let apiUrl = "http://localhost/library_crud/api2.php";
        let res = await fetch(apiUrl);
        let books = await res.json();
        console.log(books);
        
        
        //Borramos el contenido de la tabla
        eraseTable();
        // Poblamos la tabla con el contenido del JSON
        updateTable(books);
    } catch (error) {
        console.error(error);
    }
  }


function eraseTable() {
    // Accedemos a la lista de filas de la tabla <tr> y las borramos todas
    let table = document.getElementById("book-table");
    table.innerHTML = "";
    console.log("Borrado");
}

function updateTable(books) {
    let table = document.getElementById("book-table");
    eraseTable(); // Asegurarnos de borrar la tabla antes de repoblarla
  
    for (let i = 0; i < books.length; i++) {
        let book = books[i];
        let row = document.createElement("tr");
        let idCell = document.createElement("td");
        let titleCell = document.createElement("td");
        let authorCell = document.createElement("td");
        let yearCell = document.createElement("td");
        let actionsCell = document.createElement("td");
  
        idCell.innerHTML = book.id;
  
        // Hacemos las celdas de título, autor y año editables
        titleCell.innerHTML = book.title;
        titleCell.contentEditable = "true";
  
        authorCell.innerHTML = book.author;
        authorCell.contentEditable = "true";
  
        yearCell.innerHTML = book.year;
        yearCell.contentEditable = "true";
  
        // Botón de editar
        let editButton = document.createElement("button");
        editButton.innerHTML = "Editar";
        editButton.addEventListener("click", editBook);
        actionsCell.appendChild(editButton);
  
        // Botón de eliminar
        let deleteButton = document.createElement("button");
        deleteButton.innerHTML = "Eliminar";
        deleteButton.addEventListener("click", deleteBook);
        actionsCell.appendChild(deleteButton);
  
        // Añadimos celdas a la fila
        row.appendChild(idCell);
        row.appendChild(titleCell);
        row.appendChild(authorCell);
        row.appendChild(yearCell);
        row.appendChild(actionsCell);
  
        // Añadimos la fila a la tabla
        table.appendChild(row);

    }
    console.log("Actualizado");
}


async function deleteBook(event) {
    try {
        // Obtenemos el id del libro a eliminar
        let id = event.target.parentNode.parentNode.cells[0].innerHTML;

        // Definimos la URL de la API con el id como parámetro
        let apiUrl = `http://localhost/library_crud/api2.php?id=${id}`;

        // Creamos un objeto URLSearchParams con el id
        let params = new URLSearchParams();
        params.append("id", id);

        
        let res = await fetch(apiUrl, {
            method: "DELETE",
            body: params 
        });

        // Verificamos la respuesta del servidor
        if (res.ok) {
            console.log("Libro eliminado correctamente");
            fetchBooks(); // Recargamos los libros después de eliminar
        } else {
            console.error("Error al eliminar el libro:", await res.text());
        }

    } catch (error) {
        console.error("Error en deleteBook:", error);
    }
}


async function editBook(event) {
    // Leemos el contenido actualizado de las columnas
  
    try {
        let params = new URLSearchParams();
        let row = event.target.parentNode.parentNode; // Obtenemos la fila completa
        let id = row.cells[0].innerHTML;
        let title = row.cells[1].innerHTML;
        let author = row.cells[2].innerHTML;
        let year = row.cells[3].innerHTML;
        params.append("id", id);
        params.append("title", title);
        params.append("author", author);
        params.append("year", year);
        // Enviamos los datos actualizados al servidor
        let apiUrl = "http://localhost/library_crud/api2.php";
        let res = await fetch(apiUrl, {
            method: "PUT",
            body: params
        });
  
        // Mostramos la respuesta del servidor en la consola
        let response = await res.text();
        console.log(response);
  
        // Recargamos los datos de la tabla
        fetchBooks();
    } catch (error) {
        console.error("Error al editar el libro:", error);
    }
  }

  async function createBook(event) {
    event.preventDefault();  

   

    try {
        let apiUrl = "http://localhost/library_crud/api2.php";
        let title = document.getElementById("book-title").value;
        let author = document.getElementById("book-author").value;
        let year = document.getElementById("book-year").value;


        let params = new URLSearchParams();
        params.append("title", title);
        params.append("author", author);
        params.append("year", year);
        
        console.log("Enviando datos:", params.toString());
        
        let res = await fetch(apiUrl, {
            method: "POST",
            body: params
        });

        // Verificamos si la respuesta es exitosa
        if (res.ok) {
            console.log("Libro creado correctamente.");
            // Mostramos la respuesta del servidor, que probablemente sea un mensaje en formato JSON
            let data = await res.json();
            console.log(data);
        } else {
            console.error("Error al crear el libro:", await res.text());
        }

    } catch (error) {
        console.error("Error en createBook:", error);
    }

    // Volver a pedir los libros actualizados después de crear uno nuevo
    fetchBooks();
}
  
