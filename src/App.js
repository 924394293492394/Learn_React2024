import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import EmployeeTable from "./components/EmployeeTable";
import EmployeeCards from "./components/EmployeeCard";
import EmployeeForm from "./components/EmployeeForm";
import Login from "./components/Login";
import "./App.css";

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      <div className="App">
        {!currentUser ? (
          <Routes>
            <Route path="/" element={<Login onLogin={setCurrentUser} />} />
          </Routes>
        ) : (
          <div>
            <h1>Управление работниками</h1>
            <Routes>
              <Route path="/edit" element={<EmployeeForm />} />
              <Route path="/add" element={<EmployeeForm />} />
              <Route path="/table" element={<EmployeeTable />} />
              <Route path="/cards" element={<EmployeeCards />} />
            </Routes>

            <div className="view-buttons">
              <Link to="/add">
                <button className="view-button">Добавить Работника</button>
              </Link>
              <Link to="/table">
                <button className="view-button">Таблица</button>
              </Link>
              <Link to="/cards">
                <button className="view-button">Карточки</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </Router>
  );
};

export default App;
