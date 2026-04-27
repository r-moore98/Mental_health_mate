import React, { useState } from "react";
import axios from "axios";
import { Navbar } from "../component/navbar";
import "../../styles/ResourcePage.css";

export const ResourcePage = () => {
  const [condition, setCondition] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [apiURL, setApiURL] = useState("");

  const searchCondition = async () => {
    if (!condition) return;

    try {
      const formattedCondition = condition.trim().replace(/\s+/g, "_");

      const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/summary/${formattedCondition}`;

      const response = await axios.get(apiUrl);

      setResult(response.data);
      setError("");
      setApiURL(response.data.content_urls.desktop.page);
    } catch (err) {
      console.error(err);
      setResult(null);
      setError("No results found. Try a different condition.");
    }
  };

  const fetchAdditionalInfo = async () => {
    if (!condition) return;

    try {
      const formattedCondition = condition.trim().replace(/\s+/g, "_");

      const apiUrl = `https://en.wikipedia.org/api/rest_v1/page/mobile-sections/${formattedCondition}`;

      const response = await axios.get(apiUrl);

      setResult((prev) => ({
        ...prev,
        additionalInfo: response.data.lead.sections,
      }));
      setError("");
    } catch (err) {
      console.error(err);
      setError("Could not fetch additional info.");
    }
  };

  return (
    <div className="resource-page">
      <Navbar />
      <div className="resource-content">
        <h1 className="resource_welcome">Welcome to the Resource Page!</h1>
        <h2 className="resource-page-title">Condition Search</h2>

        <div className="container">
          <form>
            <input
              type="text"
              className="form-control"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              placeholder="Enter a condition (e.g. anxiety, depression)"
            />

            <div className="search-button">
              <button
                className="button"
                type="button"
                onClick={searchCondition}
              >
                Search
              </button>
            </div>
          </form>

          {error && <p className="error-message">{error}</p>}

          <div id="result">
            {apiURL && (
              <p>
                Website URL:{" "}
                <a
                  href={apiURL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="website-link"
                >
                  {apiURL}
                </a>
              </p>
            )}

            {result && (
              <div>
                <h2>{result.title}</h2>
                <p>{result.extract}</p>

                <div className="search-button">
                  <button
                    className="button"
                    onClick={fetchAdditionalInfo}
                  >
                    Fetch More Details
                  </button>
                </div>

                {result.additionalInfo && (
                  <div>
                    <h3>More Info</h3>
                    {result.additionalInfo.slice(0, 3).map((section, index) => (
                      <div key={index}>
                        <h4>{section.line}</h4>
                        <p
                          dangerouslySetInnerHTML={{
                            __html: section.text,
                          }}
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};