import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addEmployee, editEmployee, selectEditEmployeeId, selectEmployeeById, setEditEmployeeId } from "../redux/employeeSlice";
import { useNavigate } from "react-router-dom";
import "../App.css";

const EmployeeForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editEmployeeId = useSelector(selectEditEmployeeId);
  const employeeToEdit = useSelector((state) => selectEmployeeById(state, editEmployeeId)) || { name: "", position: "" };

  const [employeeName, setEmployeeName] = useState(employeeToEdit.name || "");
  const [employeePosition, setEmployeePosition] = useState(employeeToEdit.position || "");

  useEffect(() => {
    if (editEmployeeId) {
      setEmployeeName(employeeToEdit.name);
      setEmployeePosition(employeeToEdit.position);
    }
  }, [editEmployeeId, employeeToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editEmployeeId) {
      dispatch(editEmployee({ id: editEmployeeId, name: employeeName, position: employeePosition }));
      dispatch(setEditEmployeeId(null));
    } else {
      dispatch(addEmployee({ id: Date.now(), name: employeeName, position: employeePosition }));
    }

    setEmployeeName("");
    setEmployeePosition("");
    navigate("/table");
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <button type="submit">
        {editEmployeeId ? "Сохранить" : "Добавить работника"}
      </button>
    </form>
  );
};

export default EmployeeForm;
