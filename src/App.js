import React from "react";
import { toast, Toaster } from "react-hot-toast";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from "react-router-dom";
// import { history } from "./helpers/history";
import { AuthProvider } from "./context/AuthContext";
import AppRouting from "./components/AppRouting";

export default function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Toaster />
          <AppRouting />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}
