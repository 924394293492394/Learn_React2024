import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, selectEmployees, setEditEmployeeId } from "../redux/employeeSlice";
import { useNavigate } from "react-router-dom";
import "../App.css";

const EmployeeTable = () => {
  const employees = useSelector(selectEmployees);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleDeleteEmployee = (id) => {
    dispatch(deleteEmployee(id));
  };

  const handleEditEmployee = (id) => {
    dispatch(setEditEmployeeId(id));
    navigate("/edit");
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Имя и Фамилия</th>
            <th>Должность</th>
            <th id="act2">Действия</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.position}</td>
              <td className="action-buttons">
                <button onClick={() => handleEditEmployee(employee.id)}>Редактировать</button>
                <button onClick={() => handleDeleteEmployee(employee.id)}>Удалить</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
