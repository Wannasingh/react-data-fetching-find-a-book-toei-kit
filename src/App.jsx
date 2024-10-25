import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Input } from "./components/ui/input";

function App() {
  const [searchBooks, setSearchBooks] = useState("");
  const [results, setResults] = useState([]);

  // Debounce function
  const debounce = (func, delay) => {
    let timeoutId;
    return (...args) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const searchSeverBooks = async (query) => {
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${query}`
      );
      setResults(response.data.docs);
    } catch (error) {
      console.error(error);
    }
  };

  // Create a debounced version of the search function
  const debouncedSearch = useCallback(debounce(searchSeverBooks, 500), []);

  useEffect(() => {
    if (searchBooks) {
      debouncedSearch(searchBooks);
    }
  }, [searchBooks, debouncedSearch]);
  return (
    <div className="App">
      <h1 className="text-3xl font-bold m-10">Find a Book</h1>
      <Input 
        type="text" 
        placeholder="Search for books"
        onChange={(e) => setSearchBooks(e.target.value)} 
      />
      <>
        {results.map((result, index) => (
          <div key={index} className="border p-4 m-10 rounded-md">
            <li className="text-xl font-bold">{result.title}</li>
          </div>
        ))}
      </>
    </div>
  );
}

export default App;
