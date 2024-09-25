import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [employeeName, setEmployeeName] = useState("");
  const [employeePosition, setEmployeePosition] = useState("");
  const [employees, setEmployees] = useState([]);

  const handleAddEmployee = (e) => {
    e.preventDefault();

    if (employeeName && employeePosition) {
      setEmployees([
        ...employees,
        { id: Date.now(), name: employeeName, position: employeePosition },
      ]);
      setEmployeeName("");
      setEmployeePosition("");
    }
  };

  const handleDeleteEmployee = (id) => {
    setEmployees(employees.filter((employee) => employee.id !== id));
  };

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
        <button type="submit">Добавить работника</button>
      </form>

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
              <td>
                <button onClick={() => handleDeleteEmployee(employee.id)}>
                  Удалить
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;