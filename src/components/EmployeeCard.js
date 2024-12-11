import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EmployeeCard = () => {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/employees")
      .then((res) => res.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Ошибка при получении данных:", error));
  }, []);

  const handleDeleteEmployee = async (id) => {
    const confirmDelete = window.confirm("Вы уверены, что хотите удалить этого сотрудника?");
    if (!confirmDelete) return;

    try {
      const response = await fetch(`http://localhost:5000/api/employees/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Ошибка при удалении сотрудника");
      }

      setEmployees((prevEmployees) =>
        prevEmployees.filter((employee) => employee._id !== id)
      );
    } catch (error) {
      console.error("Ошибка при удалении сотрудника:", error);
    }
  };

  const handleEditEmployee = (id) => {
    navigate(`/edit?id=${id}`);
  };

  return (
    <div className="card-container">
      {employees.map((employee) => (
        <div className="card" key={employee._id}>
          <h2>{employee.name}</h2>
          <p>Должность: {employee.position}</p>
          <div className="card-buttons">
            <button onClick={() => handleEditEmployee(employee._id)}>Редактировать</button>
            <button onClick={() => handleDeleteEmployee(employee._id)}>Удалить</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EmployeeCard;
