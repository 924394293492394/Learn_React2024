import React, { useState } from "react";
import "./App.css";

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
    <table>
      <thead>
        <tr>
          <th>Имя и Фамилия</th>
          <th>Должность</th>
          <th>Действия</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.name}</td>
            <td>{employee.position}</td>
            <td className="table-buttons">
              <button onClick={() => handleEditEmployee(employee.id)}>Редактировать</button>
              <button onClick={() => handleDeleteEmployee(employee.id)}>Удалить</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const renderCardView = () => (
    <div className="card-container">
      {employees.map((employee) => (
        <div className="card" key={employee.id}>
          <h2>{employee.name}</h2>
          <p>Должность: {employee.position}</p>
          <div className="card-buttons">
            <button onClick={() => handleEditEmployee(employee.id)}>Редактировать</button>
            <button onClick={() => handleDeleteEmployee(employee.id)}>Удалить</button>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="App">
      <h1>Управление работниками</h1>

      <form onSubmit={handleAddEmployee}>
        <input
          type="text"
          placeholder="Имя и Фамилия"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Должность"
          value={employeePosition}
          onChange={(e) => setEmployeePosition(e.target.value)}
          required
        />
        <button type="submit">{editEmployeeId ? "Сохранить" : "Добавить работника"}</button>
      </form>

      <div className="view-buttons">
        <button onClick={() => setView('table')}>Таблица</button>
        <button onClick={() => setView('cards')}>Карточки</button>
      </div>

      {view === 'table' ? renderTableView() : renderCardView()}
    </div>
  );
};

export default App;