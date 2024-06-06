// Importing React and Material-UI components
import React, { useState, useEffect } from "react";
import {
  Container,
  CssBaseline,
  Toolbar,
  Typography,
  AppBar,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

/**
 * DogTable component that displays a list of dog images fetched from The Dog API.
 * It includes a search functionality to filter dogs by breed.
 */
const DogTable = () => {
  // State to store the list of dog images
  const [dogs, setDogs] = useState([]);
  // State to handle the search query for filtering dogs
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch dog images from The Dog API when the component mounts
  useEffect(() => {
    // Asynchronous function to fetch dog data
    const fetchDogs = async () => {
      // API request to The Dog API to get a list of dog images
      const response = await fetch(
        "https://api.thedogapi.com/v1/images/search?size=med&mime_types=jpg&format=json&has_breeds=true&order=RANDOM&page=0&limit=50",
        {
          headers: {
            "Content-Type": "application/json",
            // API key for The Dog API (replace with your actual API key)
            "x-api-key":
              "YOUR_API_KEY",
          },
        }
      );
      // Convert the response to JSON
      const data = await response.json();
      // Update the state with the fetched dog images
      setDogs(data);
    };

    // Execute the fetch operation
    fetchDogs();
  }, []);

  // Update the search query state based on user input
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter the list of dogs based on the search query
  const getFilteredDogs = () => {
    // Return all dogs if the search query is empty
    if (!searchQuery) return dogs;
    // Filter dogs that match the search query by breed name
    return dogs.filter((dog) =>
      dog.breeds[0]?.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  // Render the DogTable component
  return (
    <div className="container-class">
      <Container>
        {/* Normalize default browser styling */}
        <CssBaseline />
        {/* AppBar component for the title */}
        <AppBar position="static" sx={{ marginBottom: "2rem" }}>
          <Toolbar>
            {/* Centered title for the AppBar */}
            <Typography variant="h6" align="center" style={{ width: "100%" }}>
              Dogs Images
            </Typography>
          </Toolbar>
        </AppBar>
        {/* Search bar to filter dogs by breed */}
        <TextField
          className="search-bar"
          fullWidth
          label="Search by Breed"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
          style={{ marginBottom: "20px" }}
        />
        {/* Table to display the list of dogs */}
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                {/* Table headers */}
                <TableCell>Breed</TableCell>
                <TableCell align="right">Image</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {/* Iterate over the filtered list of dogs to create table rows */}
              {getFilteredDogs().map((dog, index) => (
                <TableRow key={index}>
                  {/* Display the breed name or a placeholder if not available */}
                  <TableCell component="th" scope="row">
                    {dog.breeds[0]?.name || "Unknown Breed"}
                  </TableCell>
                  {/* Display the dog image */}
                  <TableCell align="right">
                    <img
                      src={dog.url}
                      alt={dog.breeds[0]?.name || "Dog"}
                      loading="eager"
                      style={{ height: "100px" }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </div>
  );
};

// Export the DogTable component for use in other parts of the application
export default DogTable;
