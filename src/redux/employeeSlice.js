import { createSlice } from "@reduxjs/toolkit";

const staticEmployees = [
  { id: 1, name: "Иван Иванов", position: "Разработчик" },
  { id: 2, name: "Петр Петров", position: "Дизайнер" },
  { id: 3, name: "Сергей Сергеев", position: "Менеджер" },
  { id: 4, name: "Мария Мариева", position: "Тестировщик" },
  { id: 5, name: "Ольга Ольгина", position: "Аналитик" },
  { id: 6, name: "Николай Николаев", position: "Архитектор" },
];

const loadFromLocalStorage = () => {
  const savedEmployees = localStorage.getItem('employees');
  if (savedEmployees) {
    return [...staticEmployees, ...JSON.parse(savedEmployees)];
  }
  return staticEmployees;
};

const saveToLocalStorage = (employees) => {
  localStorage.setItem('employees', JSON.stringify(employees.filter(emp => !staticEmployees.some(staticEmp => staticEmp.id === emp.id))));
};

const initialState = {
  employees: loadFromLocalStorage(),
  editEmployeeId: null,
};

const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    addEmployee: (state, action) => {
      state.employees.push(action.payload);
      saveToLocalStorage(state.employees);
    },
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(employee => employee.id !== action.payload);
      saveToLocalStorage(state.employees);
    },
    editEmployee: (state, action) => {
      const index = state.employees.findIndex(employee => employee.id === action.payload.id);
      if (index !== -1) {
        state.employees[index] = action.payload;
        saveToLocalStorage(state.employees);
      }
    },
    setEditEmployeeId: (state, action) => {
      state.editEmployeeId = action.payload;
    },
  },
});

export const { addEmployee, deleteEmployee, editEmployee, setEditEmployeeId } = employeeSlice.actions;

export const selectEmployees = (state) => state.employees.employees;
export const selectEditEmployeeId = (state) => state.employees.editEmployeeId;
export const selectEmployeeById = (state, id) => state.employees.employees.find(employee => employee.id === id);

export default employeeSlice.reducer;
