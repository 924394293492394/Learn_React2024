const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authController = require('./controllers/authController');
const employeeController = require('./controllers/employeeController');

const app = express();

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/your-database-name")
  .then(() => console.log("MongoDB подключен"))
  .catch((err) => console.error("Ошибка подключения к MongoDB:", err.message));;

app.post('/api/login', authController.login);
app.get('/api/employees', employeeController.getEmployees);
app.post('/api/employees', employeeController.addEmployee);
app.put('/api/employees/:id', employeeController.updateEmployee);
app.delete('/api/employees/:id', employeeController.deleteEmployee);

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
