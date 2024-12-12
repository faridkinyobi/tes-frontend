import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UserList from "./components/UserList";
import UserDetail from "./components/UserDetail";

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-center">
        <Routes>
          <Route path="/" element={<UserList />} />
          <Route path="/user/:id" element={<UserDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
