// src/pages/UnauthorizedPage.jsx
import { useNavigate } from "react-router-dom";

export default function UnauthorizedPage() {
  const navigate = useNavigate();

  return (
    <div style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <div>
        <h1>403 — Unauthorized</h1>
        <p>You don't have permission to access this page.</p>
        <button onClick={() => navigate(-1)}>Go Back</button>
      </div>
    </div>
  );
}
