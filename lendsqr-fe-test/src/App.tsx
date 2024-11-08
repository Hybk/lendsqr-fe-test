import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./styles/Base.scss";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Users from "./components/user";
import UserDetails from "./pages/userDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<Navigate to="/dashboard/users" replace />} />
          <Route path="users" element={<Users />} />
          <Route path="user/:id" element={<UserDetails />} />
        </Route>
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
