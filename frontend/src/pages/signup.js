import React, { useContext, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "react-bootstrap";
import "../../styles/signup.css";
import { Context } from "@/store/appContext";

export const Signup = () => {
    const { actions } = useContext(Context);
    const navigate = useNavigate();
    const isMounted = useRef(true);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const handleClick = async (e) => {
        e.preventDefault();
        if (!isMounted.current) return;

        setError("");
        setLoading(true);

        if (!email.includes("@") || password.length < 8) {
            if (isMounted.current) {
                setError("Please use a valid email and an 8+ character password.");
                setLoading(false);
            }
            return;
        }

        try {
            await actions.createUser(email, password);
            if (isMounted.current) navigate("/");
        } catch (err) {
            if (isMounted.current) setError("Signup failed. Try again.");
        } finally {
            if (isMounted.current) setLoading(false);
        }
    };

    return (
        <Container className="container">
            <div className="signupCont">
                <form className="signupForm" onSubmit={handleClick}>
                    <div className="loginFormContent">
                        <h1 className="sign">Sign Up for Account</h1>
                        <div className="input-field">
                            <input
                                className="myInput"
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="input-field">
                            <input
                                className="myInput"
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        {error && <p className="errorMsg">{error}</p>}
                    </div>

                    <div className="loginFormAction">
                        <button className="formBtn regBtn" type="submit" disabled={loading}>
                            {loading ? "Registering..." : "Register"}
                        </button>
                    </div>
                </form>
            </div>
        </Container>
    );
};
