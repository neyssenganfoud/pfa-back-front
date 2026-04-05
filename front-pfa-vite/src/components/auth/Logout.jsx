import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userEmail");
    localStorage.removeItem("userRole");
    navigate("/", { replace: true });
  }, [navigate]);

  return (
    <div className="container mt-5">
      <p>Déconnexion…</p>
    </div>
  );
};

export default Logout;
