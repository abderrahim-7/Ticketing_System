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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/create-ticket" element={<CreateTicket />} />
      <Route path="/my-tickets" element={<MyTickets />} />
      <Route path="/chat" element={<Chat />} />
      <Route path="/agent/tickets" element={<Tickets />} />
      <Route path="/admin/assign" element={<Assign />} />
      <Route path="/admin/manage-agents" element={<ManageAgents />} />
      <Route path="/admin/monitor" element={<Monitor />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}

export default App;
