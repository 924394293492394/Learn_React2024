import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteEmployee, selectEmployees, setEditEmployeeId } from "../redux/employeeSlice";
import { useNavigate } from "react-router-dom";
import "../App.css";

const EmployeeCards = () => {
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
};

export default EmployeeCards;
