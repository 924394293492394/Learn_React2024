const User = require('../models/User');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    if (password !== user.password) {
      return res.status(401).json({ message: "Неверный пароль" });
    }

    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
    res.json({ token, name: user.name });
  } catch (error) {
    console.error("Ошибка при авторизации:", error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
};
