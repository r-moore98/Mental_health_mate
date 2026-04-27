import React, { useState, useEffect } from "react";
import { Card, CardBody, Row, Col } from "reactstrap";
import { Navbar } from "../component/navbar";
import "../../styles/journalapp.css";

export const JournalApp = () => {
  const [date, setDate] = useState("");
  const [mood, setMood] = useState("");
  const [content, setContent] = useState("");
  const [journalEntries, setJournalEntries] = useState([]);
  const [searchDate, setSearchDate] = useState("");
  const [searchedEntries, setSearchedEntries] = useState([]);
  const [isEntrySubmitted, setIsEntrySubmitted] = useState(false);

  // Updated to use "sessionStorage" and "token" to match your flux.js
  const fetchJournalEntries = async () => {
    const token = sessionStorage.getItem("token");
    try {
      const response = await fetch("http://127.0.0.1:3001/api/get_journal", {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!response.ok) throw new Error("Error retrieving journal entries");
      const data = await response.json();
      setJournalEntries(data);
    } catch (error) {
      console.error("Error retrieving journal entries:", error);
    }
  };

  useEffect(() => {
    fetchJournalEntries();
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();
    const token = sessionStorage.getItem("token"); // Match storage name
    const data = { date, mood, content };

    try {
      const response = await fetch(
        "http://127.0.0.1:3001/api/post_journal", // Corrected URL path
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) throw new Error("Error creating entry");

      console.log("Entry created successfully!");
      setDate("");
      setMood("");
      setContent("");
      setIsEntrySubmitted(true);
      fetchJournalEntries(); // Refresh the list after adding
    } catch (error) {
      console.error("Error creating entry:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();

    const foundEntries = journalEntries.filter(
      (entry) => entry.date === searchDate
    );

    setSearchedEntries(foundEntries);
  };

  return (
    <div className="journal_container">
      <Navbar className="navbar-journal" />
      <h1>Welcome to the Journal Page!</h1>

      <Row>
        <Col xs="6">
          <form id="journalForm" className="mb-4">
            <div className="mb-3">
              <label htmlFor="date" className="form-label">
                Date:
              </label>
              <input
                type="text"
                id="date"
                name="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mood" className="form-label">
                Mood:
              </label>
              <input
                type="text"
                id="mood"
                name="mood"
                value={mood}
                onChange={(e) => setMood(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">
                Content:
              </label>
              <textarea
                id="content"
                name="content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="form-control"
              ></textarea>
            </div>
            <button
              type="submit"
              onClick={(e) => handleClick(e)}
              className="btn btn-primary"
            >
              Submit
            </button>
          </form>

          {isEntrySubmitted && (
            <div className="alert alert-success">
              <p>Journal entry submitted successfully!</p>
            </div>
          )}
        </Col>
        <Col xs="6">
          <form id="searchForm" className="mb-4">
            <div className="mb-3">
              <label htmlFor="searchDate" className="form-label">
                Search Date:
              </label>
              <input
                type="text"
                id="searchDate"
                name="searchDate"
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="form-control"
              />
            </div>
            <button
              type="submit"
              onClick={(e) => handleSearch(e)}
              className="btn btn-primary"
            >
              Search
            </button>
          </form>

          {searchedEntries.length > 0 && (
            <Card>
              <CardBody>
                <h3>Search Result:</h3>
                {searchedEntries.map((entry, index) => (
                  // Use index as a key if entry.id isn't available
                  <div className="search-result-entry" key={index}>
                    <p><strong>Date:</strong> {entry.date}</p>
                    <p><strong>Mood:</strong> {entry.mood}</p>
                    <p><strong>Content:</strong> {entry.content}</p>
                    <hr />
                  </div>
                ))}
              </CardBody>
            </Card>
          )}
        </Col>
      </Row>
    </div>
  );
};
