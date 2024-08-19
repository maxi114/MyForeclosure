"use client";

import { useState } from "react";
import { FlashCardData } from "../../lib/FlashCardData/FlashCardData";

import {
    Container,
    TextField,
    Button,
    Typography,
  } from "@mui/material";

export function UploadDocumentsForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [document, setDocument] = useState(FlashCardData);

  

  // Function to handle form submission
  const ingest = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    setIsLoading(true); // Set loading state to true

    try {
      // Send a POST request to the server with the document text
      const response = await fetch("/api/flashcards/Ingest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Set content type to JSON
        },
        body: JSON.stringify({
          text: document, // Send document text in the request body
        }),
      });

      // Check if the response status is 200 (OK)
      if (response.status === 200) {
        setDocument("Uploaded!"); // Update document state to indicate success
      } else {
        const json = await response.json(); // Parse the response JSON
        if (json.error) {
          setDocument(json.error); // Update document state with error message
        }
      }
    } catch (error) {
      // Handle errors and update document state with error message
      setDocument("An error occurred. Please try again.");
    } finally {
      setIsLoading(false); // Set loading state to false
    }
  };

  // Render the form with a textarea and submit button
  return (
    <div>
      <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom>
         Document Upload
        </Typography>
        <TextField
          value={document}
          onChange={(e) => setDocument(e.target.value)}
          label="Enter text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={ingest}
          fullWidth
        >
          upload
        </Button>
        </Container>
    </div>
  );
}
