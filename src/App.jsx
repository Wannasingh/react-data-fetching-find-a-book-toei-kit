import "./App.css";
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [books, setBooks] = useState([]);

  const handleChange = (event) => {
    setInputValue(event.target.value);
    handleSearch();
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `https://www.googleapis.com/books/v1/volumes?q=${inputValue}`
      );
      setBooks(response.data.items || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <h1>Find a Book</h1>
      <input
        type="text"
        placeholder="Enter book name"
        value={inputValue}
        onChange={handleChange}
      />
      {/* <button onClick={handleSearch}>Search</button> */}
      <ul>
        {books.map((book, index) => (
          <li key={index}>{book.volumeInfo?.title || "Unknown Title"}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
