import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreateTicket from "./pages/client/CreateTicket";
import Monitor from "./pages/Admin/Monitor";
import ManageAgents from "./pages/Admin/ManageAgents";
import Assign from "./pages/Admin/Assign";
import Tickets from "./pages/Agent/Tickets";
import Chat from "./pages/Chat";
import MyTickets from "./pages/client/MyTickets";
import Settings from "./pages/Settings";
import Profile from "./pages/Profile";
import ProtectedRoute from "./layout/ProtectedRoute";
import VerifyEmail from "./pages/VerifyEmail";
import ForgotPassword from "./pages/ForgotPassword";
import Categories from "./pages/Admin/Categories";
import ResetPassword from "./pages/ResetPasswrod";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <ProtectedRoute Role="ANY">
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-email" element={<VerifyEmail />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route
        path="/create-ticket"
        element={
          <ProtectedRoute Role="USER">
            <CreateTicket />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-tickets"
        element={
          <ProtectedRoute Role="USER">
            <MyTickets />
          </ProtectedRoute>
        }
      />
      <Route
        path="/chat"
        element={
          <ProtectedRoute Role="ANY">
            <Chat />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agent/tickets"
        element={
          <ProtectedRoute Role="AGENT">
            <Tickets />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/assign"
        element={
          <ProtectedRoute Role="ADMIN">
            <Assign />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/manage-agents"
        element={
          <ProtectedRoute Role="ADMIN">
            <ManageAgents />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/monitor"
        element={
          <ProtectedRoute Role="ADMIN">
            <Monitor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/categories"
        element={
          <ProtectedRoute Role="ADMIN">
            <Categories />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute Role="ANY">
            <Profile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute Role="ANY">
            <Settings />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
