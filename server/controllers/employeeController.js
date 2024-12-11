const Employee = require('../models/Employee');

exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    console.log("Отправляем сотрудников:", employees);
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Ошибка сервера" });
  }
};

exports.addEmployee = async (req, res) => {
  const { name, position } = req.body;
  try {
    const employee = new Employee({ name, position });
    await employee.save();
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при добавлении сотрудника" });
  }
};

exports.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { name, position } = req.body;
  try {
    const employee = await Employee.findByIdAndUpdate(id, { name, position }, { new: true });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при обновлении сотрудника" });
  }
};

exports.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: "Сотрудник не найден" });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Ошибка при удалении сотрудника" });
  }
};
