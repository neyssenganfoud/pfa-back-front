import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Alert } from "react-bootstrap";
import { api, getApiErrorMessage } from "../utils/ApiFunctions";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const { data } = await api.post("/api/auth/login", { email, password });
      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", data.email ?? "");
        localStorage.setItem("userRole", data.role ?? "");
      }
      navigate("/admin");
    } catch (err) {
      setError(getApiErrorMessage(err));
    }
  };

  return (
    <div className="container mt-5 mb-5" style={{ maxWidth: "420px" }}>
      <h2 className="mb-4">Connexion (admin)</h2>
      <p className="text-muted small">
        Utilisez le compte admin (ex. admin@hotel.local) pour gérer les chambres
        (JWT requis pour POST/PUT/DELETE sur /rooms).
      </p>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="username"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Mot de passe</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="w-100">
          Se connecter
        </Button>
      </Form>
      <p className="mt-3 text-center">
        <Link to="/">Retour à l&apos;accueil</Link>
      </p>
    </div>
  );
};

export default Login;
