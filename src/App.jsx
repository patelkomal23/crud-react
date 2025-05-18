import React, { useState } from "react";
import "./App.css";

function App() {
  const [hovered, setHovered] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const books = [
    {
      id: 1,
      title: "The Great Gatsby",
      image:
           "y648.jpg"  
    },
    {
      id: 2,
      title: "1984 by George Orwell",
      image:
           "109_700x700.webp"  
    },
    {
      id: 3,
      title: "To Kill a Mockingbird",
      image:
           "download.png"  
    },
  ];

  return (
    <div className="container my-4">
      <header className="bg-primary text-white p-3 mb-4 text-center rounded">
        <h1
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ cursor: "pointer" }}
        >
          {hovered ? "Dive Into Amazing Stories!" : "Welcome to BookStore"}
        </h1>
      </header>

      <section className="row">
        {books.map((book) => (
          <div className="col-md-4 mb-4" key={book.id}>
            <div className="card h-100 shadow-sm">
              <img
                src={book.image}
                className="card-img-top"
                alt={book.title}
                style={{ height: "250px", objectFit: "cover" }}
              />
              <div className="card-body text-center">
                <h5
                  className="card-title"
                  onClick={() =>
                    setSelectedBook(selectedBook === book.id ? null : book.id)
                  }
                  style={{
                    color: selectedBook === book.id ? "darkred" : "black",
                    cursor: "pointer",
                    transition: "color 0.3s",
                  }}
                >
                  {book.title}
                </h5>
              </div>
            </div>
          </div>
        ))}
      </section>

      <div className="text-center mt-4">
        <input
          type="text"
          className="form-control w-50 mx-auto"
          placeholder="Give your feedback and press Enter"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              alert("Thank you for your feedback!");
              e.target.value = ""; 
            }
          }}
        />
      </div>
    </div>
  );
}

export default App;
