import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("/pass.json")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error loading users:", error));
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
      navigate("/home"); 
    } else {
      setError("Invalid email or password!");
    }
  };

  return (
    <div className="login-container">
      <h2 style={{color:'blue'}}>Login</h2>
      {error && <p className="error-text">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-2"
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
