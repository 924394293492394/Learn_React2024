import React, { useState } from "react";
import "./App.css";
import {
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

const App = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [employeePosition, setEmployeePosition] = useState("");
  const [employees, setEmployees] = useState([]);
  const [editEmployeeId, setEditEmployeeId] = useState(null);
  const [view, setView] = useState('table');

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
    <div className="App">
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
        <Button type="submit" variant="contained">{editEmployeeId ? "Сохранить" : "Добавить работника"}</Button>
      </form>

      <div className="view-buttons">
        <Button variant="outlined" onClick={() => setView('table')}>Таблица</Button>
        <Button variant="outlined" onClick={() => setView('cards')}>Карточки</Button>
      </div>

      {view === 'table' ? renderTableView() : renderCardView()}
    </div>
  );
};

export default App;