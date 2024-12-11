import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EmployeeForm = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [employeeId, setEmployeeId] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get("id");

    if (id) {
      setEmployeeId(id);
      fetch(`http://localhost:5000/api/employees/${id}`)
        .then((response) => response.json())
        .then((data) => {
          setName(data.name);
          setPosition(data.position);
        })
        .catch((error) => console.error("Ошибка при получении сотрудника", error));
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const employeeData = { name, position };

    if (employeeId) {
      fetch(`http://localhost:5000/api/employees/${employeeId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      })
        .then((response) => response.json())
        .then(() => {
          navigate("/table");
        })
        .catch((error) => console.error("Ошибка при редактировании", error));
    } else {
      fetch("http://localhost:5000/api/employees", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      })
        .then((response) => response.json())
        .then(() => {
          navigate("/table");
        })
        .catch((error) => console.error("Ошибка при добавлении", error));
    }
  };

  return (
    <div>
      <h2>{employeeId ? "Редактировать сотрудника" : "Добавить сотрудника"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Имя:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Должность:</label>
          <input
            type="text"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          {employeeId ? "Сохранить изменения" : "Добавить"}
        </button>
      </form>
    </div>
  );
};

export default EmployeeForm;
