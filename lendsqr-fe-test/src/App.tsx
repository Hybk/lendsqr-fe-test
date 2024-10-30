import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/Base.scss";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard"; // You'll need to create this component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
