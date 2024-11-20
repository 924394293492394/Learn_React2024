import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentUser } from "../redux/userSlice";
import { userData } from "../data/userData";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = userData.find((u) => u.email === email && u.password === password);
    if (user) {
      dispatch(setCurrentUser(user));
      setLoginMessage("Успешный вход!");
      navigate("/table");
    } else {
      setLoginMessage("Неправильный логин или пароль.");
    }
  };

  return (
    <div>
      <h2>Вход</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Электронная почта"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Пароль"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Войти</button>
      </form>

      {loginMessage && (
        <div style={{ marginTop: "20px", color: loginMessage === "Успешный вход!" ? "green" : "red" }}>
          {loginMessage}
        </div>
      )}
    </div>
  );
};

export default Login;
