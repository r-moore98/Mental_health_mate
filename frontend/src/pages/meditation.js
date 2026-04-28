import axios from "axios";
import React, { useState } from "react";
import { Navbar } from "../component/navbar";
import "../../styles/meditation.css";
import { YOUTUBE_KEY } from "../config";

export const Meditation = () => {
    const [condition, setCondition] = useState("");
    const [result, setResult] = useState("");
    const [error, setError] = useState("");
    const apiYoutube = YOUTUBE_KEY;

    const getVideo = async () => {
        try {
            const response = await axios.get("https://www.googleapis.com/youtube/v3/search", {
                params: {
                    key: apiYoutube,
                    part: "snippet",
                    q: condition,
                    type: "video",
                    maxResults: 1,
                },
            });

            const videoId = response.data.items?.[0]?.id?.videoId;
            if (videoId) {
                setResult(videoId);
                setError("");
            } else {
                setResult("");
                setError("No video found.");
            }
        } catch (error) {
            console.error(error);
            setResult("");
            setError("An error occurred. Please try again.");
        }
    };
    return (
        <div>
            <div className="navbar">
                <Navbar />
            </div>

            <div className="centered-container">
                <h1>Welcome to the meditation page!</h1>
                <h2>You can watch relaxation videos by searching on YouTube.</h2>

                <div className="input-container">
                    <input
                        type="text"
                        value={condition}
                        onChange={(e) => setCondition(e.target.value)}
                        placeholder="Search for a video"
                    />
                    <button onClick={getVideo}>Click to search</button>
                </div>

                <div className="video-container">
                    <div className="video-wrapper">
                        {result ? (
                            <iframe
                                className="video-iframe"
                                allowFullScreen
                                src={`https://www.youtube.com/embed/${result}`}
                                title="Meditation video"
                            />
                        ) : (
                            <iframe
                                className="video-iframe"
                                allowFullScreen
                                src={`https://www.youtube.com/embed/TZGXH1fbT8Y`}
                                title="Default meditation video"
                            />
                        )}
                    </div>
                </div>

                {error && <p className="error">{error}</p>}
            </div>
        </div>
    );
};