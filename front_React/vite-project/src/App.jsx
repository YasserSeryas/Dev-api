import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import api from "./boot/axios";
import Login from "./components/Login";
import { Link, Route, Routes } from "react-router-dom";
import Register from "./components/Inscription";
import Dashboard from "./components/Dashboard";
import Tasks from "./components/Tasks";
import Create from "./components/Create";
import Modify from "./components/Modify";
import Home from "./components/Home";
import NavBar from "./components/NavBar";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route
                    path="/login"
                    element={
                        <>
                            <NavBar />
                            <Login />
                        </>
                    }
                />
                <Route
                    path="/register"
                    element={
                        <>
                            <NavBar />
                            <Register />
                        </>
                    }
                />
                <Route
                    path="/dashboard"
                    element={
                        <>
                            <NavBar />
                            <Dashboard />
                        </>
                    }
                />
                <Route
                    path="/list/:id"
                    element={
                        <>
                            <NavBar />
                            <Tasks />
                        </>
                    }
                />
                <Route
                    path="/create/:name/:id"
                    element={
                        <>
                            <NavBar />
                            <Create />
                        </>
                    }
                />
                <Route
                    path="/create/:name"
                    element={
                        <>
                            <NavBar />
                            <Create />
                        </>
                    }
                />
                <Route
                    path="/modify/:name/:id"
                    element={
                        <>
                            <NavBar />
                            <Modify />
                        </>
                    }
                />
                <Route
                    path="/modify/:name"
                    element={
                        <>
                            <NavBar />
                            <Modify />
                        </>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
