import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import "./App.css";
import { Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";

const userData = [
  { id: 1, email: "admin@example.com", password: "admin123", name: "Admin" },
  { id: 2, email: "user@example.com", password: "user123", name: "User" }
];

const App = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [employeePosition, setEmployeePosition] = useState("");
  const [employees, setEmployees] = useState([]);
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const handleAddEmployee = (e) => {
    e.preventDefault();

    if (employeeName && employeePosition) {
      if (editEmployeeId) {
        setEmployees(
          employees.map((employee) =>
            employee.id === editEmployeeId
              ? { ...employee, name: employeeName, position: employeePosition }
              : employee
          )
        );
        setEditEmployeeId(null);
      } else {
        setEmployees([
          ...employees,
          { id: Date.now(), name: employeeName, position: employeePosition },
        ]);
      }

      setEmployeeName("");
      setEmployeePosition("");
    }
  };

  const handleEditEmployee = (id) => {
    const employeeToEdit = employees.find((employee) => employee.id === id);
    setEmployeeName(employeeToEdit.name);
    setEmployeePosition(employeeToEdit.position);
    setEditEmployeeId(id);
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

  const renderTableView = () => (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Имя и Фамилия</TableCell>
            <TableCell>Должность</TableCell>
            <TableCell>Действия</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>{employee.name}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>
                <Button onClick={() => handleEditEmployee(employee.id)}>Редактировать</Button>
                <Button onClick={() => handleDeleteEmployee(employee.id)}>Удалить</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const renderCardView = () => (
    <div className="card-container">
      {employees.map((employee) => (
        <div className="card" key={employee.id}>
          <h2>{employee.name}</h2>
          <p>Должность: {employee.position}</p>
          <div className="card-buttons">
            <Button onClick={() => handleEditEmployee(employee.id)}>Редактировать</Button>
            <Button onClick={() => handleDeleteEmployee(employee.id)}>Удалить</Button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Router>
      <div className="App">
        {!currentUser ? (
          <Routes>
            <Route path="/" element={<Login setCurrentUser={setCurrentUser} />} />
          </Routes>
        ) : (
          <div>
            { }
            <h1>Управление работниками</h1>

            <form onSubmit={handleAddEmployee}>
              <TextField
                label="Имя и Фамилия"
                variant="outlined"
                value={employeeName}
                onChange={(e) => setEmployeeName(e.target.value)}
                required
              />
              <TextField
                label="Должность"
                variant="outlined"
                value={employeePosition}
                onChange={(e) => setEmployeePosition(e.target.value)}
                required
              />
              <Button type="submit" variant="contained">
                {editEmployeeId ? "Сохранить" : "Добавить работника"}
              </Button>
            </form>

            <div className="view-buttons">
              <Link to="/table">
                <Button variant="outlined">Таблица</Button>
              </Link>
              <Link to="/cards">
                <Button variant="outlined">Карточки</Button>
              </Link>
            </div>

            <Routes>
              <Route path="/table" element={renderTableView()} />
              <Route path="/cards" element={renderCardView()} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
};

// Страница для входа
const Login = ({ setCurrentUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = userData.find((u) => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      setLoginMessage("Успешный вход!");
      navigate("/table");
    } else {
      setLoginMessage("Неправильный логин или пароль. Попробуйте еще раз.");
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <TextField
          label="Пароль"
          variant="outlined"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" variant="contained">
          Войти
        </Button>
      </form>

      { }
      {loginMessage && (
        <div style={{ marginTop: "20px", color: loginMessage === "Успешный вход!" ? "green" : "red" }}>
          {loginMessage}
        </div>
      )}
    </div>
  );
};

export default App;
