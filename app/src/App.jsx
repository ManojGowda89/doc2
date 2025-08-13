import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "../src/Pages/Home";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";

// Create a simple default theme without dark/light mode switching
const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 500,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          transition: 'transform 0.3s, box-shadow 0.3s',
          '&:hover': {
            transform: 'translateY(-5px)',
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
          },
        },
      },
    },
  },
});

// Login component from src/Pages/Login.jsx
const Login = ({ onLogin }) => {
  const hardcodedEmail = "mail@manojgowda.in";
  const hardcodedPassword = "Manoj@2002";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email === hardcodedEmail && password === hardcodedPassword) {
      sessionStorage.setItem("isLoggedIn", "true");
      onLogin(true);
    } else {
      setError("Invalid email or password");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "background.default",
        p: 3,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ 
          maxWidth: 400, 
          width: "100%",
          margin: "auto", 
          padding: 20, 
          backgroundColor: "#fff",
          borderRadius: 8,
          boxShadow: "0 3px 10px rgba(0,0,0,0.1)"
        }}
      >
        <h2>Login</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <div style={{ marginBottom: 10 }}>
          <label>Email:</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <div style={{ marginBottom: 10 }}>
          <label>Password:</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </div>
        <button 
          type="submit" 
          style={{ 
            padding: "8px 16px",
            backgroundColor: "#3f51b5",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Login
        </button>
      </form>
      
      <Footer />
    </Box>
  );
};

// Simple Footer component for login page
const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 2,
        mt: 4,
        textAlign: "center",
        color: "text.secondary",
      }}
    >
      © {new Date().getFullYear()} Media Manager. All rights reserved.
    </Box>
  );
};

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
  }, []);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route 
            path="/" 
            element={
              isLoggedIn ? 
                <Home isLoggedIn={isLoggedIn} onLogout={handleLogout} /> : 
                <Navigate to="/login" />
            } 
          />
          <Route 
            path="/login" 
            element={
              !isLoggedIn ? 
                <Login onLogin={handleLogin} /> : 
                <Navigate to="/" />
            } 
          />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;